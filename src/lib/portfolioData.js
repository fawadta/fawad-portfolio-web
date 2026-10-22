export const profile = {
  firstName: "Fawad",
  lastName: "Ahmad",
  name: "Fawad Ahmad",
  title: "Sr. Unity Game Developer / Generalist",
  subtitle: "Unity Generalist · XR · Cross-Platform",
  tagline:
    "I build immersive cross-platform experiences — from hyper-casual mobile hits to VR rehab worlds and live multiplayer adventures.",
  location: "Lahore, PK",
  experience: "5+ Years",
  focus: "XR · Cross-Platform",
  stack: "Unity · C# · Photon",
  email: "fawadshah501@gmail.com",
  phone: "+92-309-8181679",
  linkedin: "https://linkedin.com/in/fawadta",
  github: "https://github.com/fawadta",
  itch: "https://fawadta.itch.io",
};

export const proofPoints = [
  { value: "5+", label: "Years in Unity" },
  { value: "40+", label: "Titles & Prototypes" },
  { value: "8+", label: "Platforms Shipped" },
  { value: "XR", label: "Quest · VisionOS" },
];

export const heroPulse = [
  { k: "LOCATION", v: "Lahore, PK" },
  { k: "ROLE", v: "Sr. Unity Game Developer / Generalist" },
  { k: "EXPERIENCE", v: "5+ Years" },
  { k: "FOCUS", v: "XR · Cross-Platform" },
  { k: "STACK", v: "Unity · C# · Photon" },
];

export const projects = [
  {
    id: "evermore",
    name: "Evermore",
    tagline: "AAA multiplayer battle royale with real-time player data",
    platform: "Mobile",
    genre: "Battle Royale · Multiplayer",
    role: "UI/UX Engineer",
    year: 2023,
    description:
      "Implemented the entire **responsive** UI/UX flow with **real-time** player data integration via **PlayFab** — from *lobby* and *matchmaking* to the live match HUD.",
    status: "Live",
    accent: "cyan",
    video: "https://youtu.be/5Dq8RSzV4V8",
    link: "https://drive.google.com/open?id=1bpY5bkteDn8VrrSCCInVfK52vBtgaa2r&usp=drive_fs",
    linkLabel: "View PDF",
  },
  {
    id: "byops-live",
    name: "BYOPS Live",
    tagline: "Multiplayer VR party app — live concerts, streaming & NFT showcases",
    platform: "Meta Quest · WebGL",
    genre: "Multiplayer · Social VR",
    role: "Unity Developer — Multiplayer & Integration",
    description:
      "Built multiplayer with Photon PUN2 & Fusion 2.0; integrated Agora RTC camera streaming, VLC-based Twitch playback, Deepmotion dance animations and Meta IAPs — then cut build size from 750MB to 350MB via UGS Hosting, CCD & Addressables.",
    status: "Shipped",
    accent: "cyan",
    image:
      "https://media.base44.com/images/public/user_688b52e098e3ad38d84629e9/52fd01253_ChatGPTImageAug9202508_17_30PM.png",
    link: "https://fawadta.itch.io",
  },
  {
    id: "see-no-evil",
    name: "See No Evil",
    tagline: "Story-driven indie PC mystery with world-scanning mechanics",
    platform: "PC",
    genre: "Mystery · Story-driven",
    role: "Gameplay Developer",
    description:
      "Built dynamic lighting reveal mechanics, an item-gated checkpoint system, a modular animation controller, and timeline-driven cutscenes & scripted events.",
    status: "Showcase",
    accent: "amber",
    image:
      "https://media.base44.com/images/public/user_688b52e098e3ad38d84629e9/dbb8f39dc_ChatGPTImageAug9202511_34_11PM.png",
    link: "https://fawadta.itch.io",
  },
  {
    id: "patient-vr",
    name: "Patient VR",
    tagline: "Gesture-driven VR mini-games for rehabilitation & training",
    platform: "Meta Quest 2 · Quest 3",
    genre: "VR · Rehab · Training",
    role: "VR Developer",
    description:
      "Built gesture-driven mini-games spanning sports, driving, exercises and biology-based experiences — designed for patient rehabilitation and clinical engagement.",
    status: "In Production",
    accent: "amber",
    link: null,
  },
  {
    id: "neon-nitro",
    name: "Neon Nitro",
    tagline: "Multiplayer racer with checkpoint validation & wrong-way detection",
    platform: "PC · Mobile",
    genre: "Racing · Multiplayer",
    role: "Gameplay Developer",
    description:
      "Built checkpoint & lap validation with wrong-way detection and a dynamic race-progress UI that keeps every player honest in real time.",
    status: "Shipped",
    accent: "cyan",
    link: "https://fawadta.itch.io",
  },
  {
    id: "yassu-panju",
    name: "Yassu-Panju",
    tagline: "3D mobile revival of the classic desi slap game",
    platform: "Android · iOS",
    genre: "Casual · Mobile",
    role: "Game Developer (Solo)",
    description:
      "Digitized the classic desi slap game into a 3D mobile experience — offline multiplayer with bots, dynamic slap/dodge mechanics, low-poly visuals and juiced feedback. Ranked 1st in the COMSATS CS FYP competition.",
    status: "Award-winning",
    accent: "amber",
    link: "https://fawadta.itch.io",
  },
];

export const expertise = [
  {
    title: "Unity Core",
    items: [
      "C#",
      "ScriptableObject Architecture",
      "FSM / Behavior Tree AI",
      "Custom Character Controllers",
      "Animation State Machines",
      "Blend Trees",
      "Input Systems",
      "Save / Load Systems",
      "uGUI",
      "Localization",
    ],
  },
  {
    title: "Platforms & XR",
    items: [
      "Android",
      "iOS",
      "PC",
      "WebGL",
      "Meta Quest 2",
      "Meta Quest 3",
      "VisionOS Prototyping",
      "Meta Quest Store",
      "Play Store",
      "App Store",
      "itch.io",
    ],
  },
  {
    title: "2D / 3D Pipeline",
    items: [
      "URP / HDRP",
      "Shader Graph",
      "Particle Systems",
      "Lightmapping",
      "Post Processing",
      "Blender",
      "Mixamo",
      "DeepMotion",
      "Figma",
    ],
  },
  {
    title: "Multiplayer & Backend",
    items: [
      "Photon PUN2",
      "Photon Fusion 2.0",
      "Unity Netcode",
      "Voice Chat",
      "Agora RTC",
      "PlayFab",
      "Firebase",
      "REST APIs",
      "Remote Config",
    ],
  },
];

export const domains = [
  "Education",
  "Training",
  "Rehabilitation",
  "Puzzle",
  "Hyper-casual",
  "Casual",
  "Hybrid-casual",
  "Simulation",
  "Arcade",
  "RPG",
  "Shooting",
  "Racing",
  "Flying",
  "2D & 3D",
];

export const tools = [
  "Git",
  "GitHub",
  "Plastic SCM",
  "Addressables",
  "Asset Bundles",
  "CCD / CDN",
  "UGS",
  "Cloud Builds",
  "Jira",
  "ClickUp",
  "Postman",
  "Ads / IAP",
];

export const experience = [
  {
    company: "Katana Games",
    role: "Sr. Unity Game Developer",
    duration: "July 2025 — Present",
    current: true,
    points: [
      "Patient VR — gesture-driven mini-games across sports, driving, exercises & biology for rehabilitation.",
      "Mahjong — tiered AI opponents, a complex turn-based rules engine and multiple game modes.",
      "Drone Simulator — replay system with multi-camera playback & 3D path visualization for trainer review.",
      "EPU — interactive educational mini-games for a vaccination awareness project.",
    ],
  },
  {
    company: "Skyimpel Ltd.",
    role: "Unity Game Developer",
    duration: "March 2023 — June 2025",
    points: [
      "Owned specific games & features end-to-end, collaborating with senior developers, leads and artists.",
      "Evermore (AAA battle royale) — full responsive UI/UX flow with real-time PlayFab data.",
      "BYOPS Live (VR party app) — Photon multiplayer, Agora RTC, VLC Twitch, Deepmotion, Meta IAPs; cut build 750MB → 350MB.",
      "See No Evil — dynamic lighting reveal, item-gated checkpoints, modular animation controller, timeline cutscenes.",
      "Neon Nitro — checkpoint/lap validation, wrong-way detection, dynamic race-progress UI.",
    ],
  },
  {
    company: "Mindstorm Studios",
    role: "Industrial FYP — Game Developer",
    duration: "June 2022 — May 2023",
    points: [
      "Yassu-Panju — digitized the classic desi slap game into a 3D mobile experience with offline bot multiplayer.",
      "Dynamic slap/dodge mechanics, low-poly visuals, XP system & juiced feedback animations.",
      "Ranked 1st in the CS Department's FYP Design Competition at COMSATS University.",
    ],
  },
  {
    company: "Game Jams & Freelance",
    role: "Developer · Designer · Artist",
    duration: "June 2022 — Oct 2023",
    points: [
      "Contributed to 8+ indie games across national & international game jams.",
      "Roles spanning development, game design and 2D/3D art with global remote & on-site teams.",
      "Delivered playable 2D / 3D / VR prototypes under jam time constraints.",
    ],
  },
];

export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Expertise", href: "#expertise" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];