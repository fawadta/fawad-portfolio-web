import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';

const CONTRIBUTION_QUERY = `
  query {
    viewer {
      login
      url
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

// This endpoint is intentionally public (the portfolio has no login), so its
// cost is bounded instead of gated: one GitHub call per cached window, shared
// by every visitor, and a per-visitor throttle for cold misses.
const CACHE_TTL_MS = 10 * 60 * 1000;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX_CALLS = 20;

let cache = null; // { at, data } — served to everyone while fresh
let pending = null; // in-flight fetch, so a burst of cold requests causes one call
const hits = new Map(); // ip -> { count, resetAt }

function clientIp(req) {
  // Only the edge-set header: a client-supplied proxy header can be forged.
  return req.headers.get('cf-connecting-ip') || 'unknown';
}

function isRateLimited(ip) {
  const now = Date.now();
  // Expired entries are pruned individually, so flooding with new addresses can
  // never reset the counters of addresses already being limited. If the map
  // still grows past a hard ceiling, the limiter fails closed for a while.
  if (hits.size > 1000) {
    for (const [key, entry] of hits) {
      if (now > entry.resetAt) hits.delete(key);
    }
    if (hits.size > 20000) return true;
  }
  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_MAX_CALLS;
}

function streaks(days) {
  let longest = 0;
  let run = 0;
  for (const day of days) {
    if (day.count > 0) {
      run += 1;
      if (run > longest) longest = run;
    } else {
      run = 0;
    }
  }

  let current = 0;
  for (let i = days.length - 1; i >= 0; i -= 1) {
    if (days[i].count > 0) current += 1;
    else if (i === days.length - 1) continue;
    else break;
  }

  return { current, longest };
}

async function loadActivity(req) {
  const base44 = createClientFromRequest(req);
  const { accessToken } = await base44.asServiceRole.connectors.getConnection('github');
  if (!accessToken) {
    throw Object.assign(new Error('GitHub is not connected'), { status: 503 });
  }

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'User-Agent': 'portfolio-activity',
    },
    body: JSON.stringify({ query: CONTRIBUTION_QUERY }),
    signal: AbortSignal.timeout(15000),
  });

  const payload = await response.json();
  const viewer = payload?.data?.viewer;
  if (!viewer) {
    throw Object.assign(
      new Error(payload?.errors?.[0]?.message || 'GitHub did not return activity data'),
      { status: 502 }
    );
  }

  const calendar = viewer.contributionsCollection.contributionCalendar;
  const days = calendar.weeks.flatMap((week) =>
    week.contributionDays.map((day) => ({ date: day.date, count: day.contributionCount }))
  );
  const { current, longest } = streaks(days);

  return {
    login: viewer.login,
    url: viewer.url,
    total: calendar.totalContributions,
    currentStreak: current,
    longestStreak: longest,
    weeks: calendar.weeks.map((week) =>
      week.contributionDays.map((day) => ({ date: day.date, count: day.contributionCount }))
    ),
  };
}

export default async function (req) {
  try {
    if (cache && Date.now() - cache.at < CACHE_TTL_MS) {
      return Response.json(cache.data);
    }

    if (isRateLimited(clientIp(req))) {
      return Response.json({ error: 'Too many requests. Please try again shortly.' }, { status: 429 });
    }

    if (!pending) {
      pending = loadActivity(req).finally(() => {
        pending = null;
      });
    }

    try {
      const data = await pending;
      cache = { at: Date.now(), data };
      return Response.json(data);
    } catch (error) {
      // A stale copy beats an empty section.
      if (cache) return Response.json(cache.data);
      return Response.json({ error: error.message }, { status: error.status || 500 });
    }
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}