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

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const { accessToken } = await base44.asServiceRole.connectors.getConnection('github');
    if (!accessToken) {
      return Response.json({ error: 'GitHub is not connected' }, { status: 503 });
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
      return Response.json(
        { error: payload?.errors?.[0]?.message || 'GitHub did not return activity data' },
        { status: 502 }
      );
    }

    const calendar = viewer.contributionsCollection.contributionCalendar;
    const days = calendar.weeks.flatMap((week) =>
      week.contributionDays.map((day) => ({ date: day.date, count: day.contributionCount }))
    );
    const { current, longest } = streaks(days);

    return Response.json({
      login: viewer.login,
      url: viewer.url,
      total: calendar.totalContributions,
      currentStreak: current,
      longestStreak: longest,
      weeks: calendar.weeks.map((week) =>
        week.contributionDays.map((day) => ({ date: day.date, count: day.contributionCount }))
      ),
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}