export type Project = {
  slug: string;
  title: string;
  tagline: string;
  type: "Android" | "Website" | "Web App" | "Tool" | "Experiment" | "Open Source";
  summary: string;
  stack: string[];
  featured?: boolean;
  features?: string[];
  idea?: string;
  challenge?: string;
  solution?: string;
  metrics?: { label: string; value: string }[];
  liveUrl?: string;
  githubUrl?: string;
  year?: string;
  logoUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "daily-finance",
    title: "Daily Finance & Budget",
    tagline: "Intelligent personal finance and expense tracking on Android",
    type: "Android",
    featured: true,
    year: "2025",
    summary:
      "A modern, offline-first Android application for managing daily finances, tracking cashflows, organizing categorical budgets, and visualizing spending habits with real-time interactive charts.",
    stack: ["Kotlin", "Jetpack Compose", "Room DB", "Coroutines", "Flow", "Material 3"],
    features: [
      "Real-time expense & income transaction logging",
      "Dynamic category budgets with visual threshold warnings",
      "Interactive weekly/monthly spending analytics and breakdown charts",
      "Multi-currency support with offline exchange conversions",
      "Material 3 dynamic theming with dark & light modes",
    ],
    idea: "Most personal finance apps require intrusive cloud accounts, show ads, or charge monthly subscriptions. Daily Finance was built with the conviction that personal finance should be fast, private, offline, and beautifully intuitive.",
    challenge: "Ensuring instant UI updates across complex relational SQLite queries while maintaining silky-smooth 60fps animations in Jetpack Compose.",
    solution: "Architected using Clean Architecture & MVVM with Room DAO reactive Flows, repository caching, and immutable UI state reducers.",
    metrics: [
      { label: "Architecture", value: "Clean MVVM" },
      { label: "UI Framework", value: "Compose" },
      { label: "Performance", value: "60 FPS" },
    ],
    liveUrl: "https://tester.subhan.tech/",
    githubUrl: "https://github.com/Subhan-Haider",
  },
  {
    slug: "app-tester",
    title: "App Tester Platform",
    tagline: "Dedicated hub for testing and previewing Android builds",
    type: "Website",
    featured: true,
    year: "2025",
    summary:
      "A centralized web platform for distributing alpha/beta Android APKs, collecting user feedback, tracking test builds, and inspecting release changelogs.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    features: [
      "Direct APK installation links and QR codes",
      "Changelog inspector with version diffing",
      "Responsive device preview simulator",
      "Feedback and bug report submission pipeline",
    ],
    idea: "Streamlining the feedback loop between Android testing cycles and early testers through a frictionless, lightning-fast web portal.",
    challenge: "Providing clear download instructions and security trust indicators for sideloaded test APKs across various Android OS versions.",
    solution: "Designed a step-by-step interactive install guide and automated build verification badges.",
    metrics: [
      { label: "Platform", value: "Web / Mobile" },
      { label: "Deploy Time", value: "< 2s" },
      { label: "Compatibility", value: "Android 8+" },
    ],
    liveUrl: "https://tester.subhan.tech/",
    githubUrl: "https://github.com/Subhan-Haider",
  },
  {
    slug: "open-source",
    title: "Open Source Ecosystem",
    tagline: "Community tools, Android modules, and developer experiments",
    type: "Open Source",
    featured: true,
    year: "2024 - Present",
    summary:
      "A collection of open-source utilities, experimental Kotlin components, web UI components, and developer toolkits shared with the global developer community.",
    stack: ["Kotlin", "TypeScript", "Python", "Git", "GitHub Actions"],
    features: [
      "Modular Android UI components & custom Compose canvas graphs",
      "Automated CI/CD pipelines for linting and test execution",
      "Reusable React hooks and animation utilities",
      "Public documentation and beginner-friendly guides",
    ],
    idea: "Learning in public by sharing working code, architectural templates, and practical prototypes with fellow high school and student developers worldwide.",
    metrics: [
      { label: "License", value: "MIT / Public" },
      { label: "Platform", value: "GitHub" },
      { label: "Focus", value: "Android & Web" },
    ],
    githubUrl: "https://github.com/Subhan-Haider",
  },
];

export interface TechCategory {
  category: string;
  items: { name: string; level: string; icon?: string }[];
}

export const techCategories: TechCategory[] = [
  {
    category: "Mobile & Android",
    items: [
      { name: "Kotlin", level: "Primary" },
      { name: "Jetpack Compose", level: "Advanced" },
      { name: "Android SDK", level: "Advanced" },
      { name: "Room / SQLite", level: "Advanced" },
      { name: "Coroutines & Flow", level: "Proficient" },
      { name: "Material 3", level: "Proficient" },
    ],
  },
  {
    category: "Web & Frontend",
    items: [
      { name: "Next.js", level: "Advanced" },
      { name: "React", level: "Advanced" },
      { name: "TypeScript", level: "Proficient" },
      { name: "JavaScript", level: "Advanced" },
      { name: "Tailwind CSS", level: "Advanced" },
      { name: "Framer Motion", level: "Proficient" },
    ],
  },
  {
    category: "Backend & Cloud",
    items: [
      { name: "Node.js", level: "Proficient" },
      { name: "PostgreSQL", level: "Proficient" },
      { name: "REST APIs", level: "Advanced" },
      { name: "Firebase", level: "Proficient" },
    ],
  },
  {
    category: "Tools & Workflow",
    items: [
      { name: "Git & GitHub", level: "Advanced" },
      { name: "Android Studio", level: "Advanced" },
      { name: "VS Code", level: "Advanced" },
      { name: "Figma", level: "UI Design" },
    ],
  },
];

export const technologies = [
  "Kotlin",
  "Android SDK",
  "Jetpack Compose",
  "Room DB",
  "Java",
  "TypeScript",
  "Next.js",
  "React",
  "Tailwind CSS",
  "Framer Motion",
  "PostgreSQL",
  "SQLite",
  "Firebase",
  "REST APIs",
  "Git & GitHub",
  "Figma",
];

export const journey = [
  {
    year: "Phase 01",
    title: "Curiosity & First Lines of Code",
    description: "Started exploring programming fundamentals in high school, discovering the joy of creating interactive software.",
    badge: "Origin",
  },
  {
    year: "Phase 02",
    title: "Diving into Native Android & Kotlin",
    description: "Fell in love with mobile development. Mastered Kotlin, Android SDK lifecycles, and modern Jetpack libraries.",
    badge: "Android Focus",
  },
  {
    year: "Phase 03",
    title: "Expanding to Modern Web & Full-Stack",
    description: "Broadened skillset with React, Next.js, and TypeScript to build interconnected web experiences and backend APIs.",
    badge: "Full Stack",
  },
  {
    year: "Phase 04",
    title: "Shipping Real Applications & Open Source",
    description: "Built Daily Finance & Budget, launched tester platforms, and started sharing code openly with the community.",
    badge: "Production",
  },
  {
    year: "Today",
    title: "Continuous Learning & Engineering",
    description: "Refining UI craftsmanship, exploring advanced software architectures, and turning novel ideas into reality.",
    badge: "Active",
  },
];

export const stats = [
  { number: "3+", label: "Featured Projects" },
  { number: "100%", label: "Curiosity Driven" },
  { number: "60+", label: "Commits & Iterations" },
  { number: "24/7", label: "Passion for Building" },
];

export type Extension = {
  name: string;
  url: string;
  role: string;
  desc: string;
  color: string;
  platforms: { label: string; href: string; color: string }[];
};

export const extensions: Extension[] = [
  {
    name: "LootOps",
    url: "https://lootops.me",
    role: "Tactical Gaming HUD",
    desc: "Free game radar that tracks Epic & Steam giveaways in real time.",
    color: "#34d399",
    platforms: [
      { label: "Chrome", href: "https://chromewebstore.google.com/detail/fbapdcgkainjgpgmopmgofaiieamenmi", color: "#E34F26" },
      { label: "Edge",   href: "https://microsoftedge.microsoft.com/addons/detail/lfgnmjjplgmbkbcbinoioclbmjkbejoe", color: "#0078D7" },
      { label: "Firefox",href: "https://addons.mozilla.org/en-US/firefox/addon/lootops-epic-steam-games/", color: "#FF7139" },
    ],
  },
  {
    name: "GhostType AI",
    url: "https://subhan.tech",
    role: "AI Typing Automation",
    desc: "AI-powered typing assistant that humanizes text and automates repetitive input.",
    color: "#8A2BE2",
    platforms: [
      { label: "Chrome",    href: "https://chromewebstore.google.com/detail/oailoanlpoofglbaechjhohmbbhpeifi", color: "#E34F26" },
      { label: "MS Store",  href: "https://apps.microsoft.com/store/detail/9P7BBQK6ZN58?cid=DevShareMCLPCS", color: "#0078D7" },
    ],
  },
  {
    name: "BlizFlow",
    url: "https://blizflow.online",
    role: "Business Management",
    desc: "All-in-one AI business suite for automation, invoicing, and workflow management.",
    color: "#3B82F6",
    platforms: [
      { label: "Chrome", href: "https://chromewebstore.google.com/detail/ipjbcbidibofdlpabpdghkkcmlpamffm", color: "#E34F26" },
      { label: "Edge",   href: "https://microsoftedge.microsoft.com/addons/detail/iokecnjjfjjcopopcbaobmahmfhmkkha", color: "#0078D7" },
    ],
  },
  {
    name: "CodeLens",
    url: "https://codelens.site",
    role: "Extension Explorer",
    desc: "Instant source auditing tool — explore and analyze any browser extension.",
    color: "#F59E0B",
    platforms: [
      { label: "Chrome", href: "https://chromewebstore.google.com/detail/ehaocblggffmileeoeoiafpfjegonhjj", color: "#E34F26" },
      { label: "Edge",   href: "https://microsoftedge.microsoft.com/addons/detail/dmgopgfalpffbbkfnjmmaophkkedaclg", color: "#0078D7" },
    ],
  },
  {
    name: "Hosh Solver",
    url: "https://chromewebstore.google.com/detail/aapngpfppnolpebhdiconaknpncmbdod",
    role: "Canvas Assistant",
    desc: "Smart assistant that helps solve Canvas LMS assignments and quizzes.",
    color: "#34d399",
    platforms: [
      { label: "Chrome", href: "https://chromewebstore.google.com/detail/aapngpfppnolpebhdiconaknpncmbdod", color: "#E34F26" },
    ],
  },
  {
    name: "Image Converter Pro",
    url: "https://lootops.website",
    role: "Batch Image Processing",
    desc: "Convert, resize, and optimize images in bulk — WebP, JPEG, PNG, AVIF.",
    color: "#6366f1",
    platforms: [
      { label: "MS Store", href: "https://apps.microsoft.com/store/detail/9N258RP6WM0Z?cid=DevShareMCLPCS", color: "#0078D7" },
      { label: "Edge",     href: "https://microsoftedge.microsoft.com/addons/detail/image-converter-pro/lgfkmndaibcbheaamhllbffifjlaabmm", color: "#0078D7" },
    ],
  },
  {
    name: "Emoji Smuggle",
    url: "https://emoji.subhan.tech",
    role: "Hidden Messenger",
    desc: "Hide secret messages inside emoji — steganography for everyday chat.",
    color: "#ec4899",
    platforms: [
      { label: "Web",    href: "https://emoji.subhan.tech", color: "#ffffff" },
      { label: "Chrome", href: "https://chromewebstore.google.com/detail/ckpmnmlhinfjjlgahbcfobmbcdjlomia", color: "#E34F26" },
      { label: "Chrome", href: "https://chromewebstore.google.com/detail/jphedandnaodohpddnilfloedkmogboa", color: "#E34F26" },
    ],
  },
];

export type HeroScreenshot = {
  id: string;
  title: string;
  file: string;
  tag: string;
  image: string;
  badge: string;
  desc?: string;
};

export const heroScreenshots: HeroScreenshot[] = [
  {
    id: "weather",
    title: "Real-Time Updates",
    file: "WeatherForecast.kt",
    tag: "Weather App",
    image: "/images/hero_weather_promo.png",
    badge: "Android / Compose",
    desc: "Live local weather forecasts with pinpoint accuracy",
  },
  {
    id: "finance",
    title: "Smart Financials",
    file: "DailyFinance.kt",
    tag: "Daily Finance",
    image: "/images/hero_finance_promo.png",
    badge: "Room DB & Compose",
    desc: "Instant expense overview & budget tracking in real-time",
  },
  {
    id: "grocery",
    title: "Smart Grocery List",
    file: "GrocerySync.kt",
    tag: "Grocery App",
    image: "/images/hero_grocery_promo.png",
    badge: "Realtime Sync",
    desc: "Real-time syncing & projected budget management",
  },
  {
    id: "flappy",
    title: "Retro Arcade Action",
    file: "FlappyGame.kt",
    tag: "Arcade Game",
    image: "/images/hero_flappy_promo.png",
    badge: "2D Physics Game",
    desc: "Tap to flap through pipes in this classic physics adventure",
  },
  {
    id: "bubble",
    title: "Bubble Match Puzzle",
    file: "BubbleShooter.kt",
    tag: "Puzzle Game",
    image: "/images/hero_bubble_promo.png",
    badge: "Match-3 Engine",
    desc: "Aim, match colors & pop clusters with the friendly fox companion",
  },
];

export type GitHubActivityRepo = {
  name: string;
  description: string;
  url: string;
  language: string;
  stars: number;
  updatedAt?: string;
};

export const githubRepos: GitHubActivityRepo[] = [
  {
    name: "my-prof",
    description: "Open source experiment and code shared on GitHub.",
    url: "https://github.com/Subhan-Haider/my-prof",
    language: "TypeScript",
    stars: 0,
  },
  {
    name: "Storage-server-v4-Backend",
    description: "Open source experiment and code shared on GitHub.",
    url: "https://github.com/Subhan-Haider/Storage-server-v4-Backend",
    language: "JavaScript",
    stars: 0,
  },
  {
    name: "Media-Downloader",
    description: "A modern, high-performance web application to download media from YouTube, Instagram, and more.",
    url: "https://github.com/Subhan-Haider/Media-Downloader",
    language: "HTML",
    stars: 0,
  },
  {
    name: "Godot-Fighting-game",
    description: "Open source experiment and code shared on GitHub.",
    url: "https://github.com/Subhan-Haider/Godot-Fighting-game",
    language: "GDScript",
    stars: 1,
  },
];



