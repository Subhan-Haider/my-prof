import { NextResponse } from "next/server";

const FALLBACK_REPOS = [
  {
    name: "Daily-Finance-Budget-App-Android",
    description:
      "Native Android personal finance manager built with Kotlin, Jetpack Compose, Room SQLite, and clean MVVM architecture.",
    url: "https://github.com/Subhan-Haider",
    stars: 18,
    language: "Kotlin",
    updatedAt: new Date().toISOString(),
  },
  {
    name: "App-Tester-Platform",
    description:
      "APK distribution and continuous feedback platform for Android developers and beta testers.",
    url: "https://tester.subhan.tech/",
    stars: 12,
    language: "TypeScript",
    updatedAt: new Date().toISOString(),
  },
  {
    name: "Compose-Design-System",
    description:
      "Modern dark-luxe glassmorphic components, fluid animations, and custom canvas charts for Jetpack Compose.",
    url: "https://github.com/Subhan-Haider",
    stars: 9,
    language: "Kotlin",
    updatedAt: new Date().toISOString(),
  },
  {
    name: "subhan-portfolio-web",
    description:
      "High-performance personal website, interactive case studies, and engineering journal built with Next.js 15.",
    url: "https://github.com/Subhan-Haider",
    stars: 7,
    language: "TypeScript",
    updatedAt: new Date().toISOString(),
  },
];

export async function GET() {
  try {
    const response = await fetch(
      "https://api.github.com/users/Subhan-Haider/repos?sort=updated&per_page=6",
      {
        next: { revalidate: 3600 },
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "subhan-portfolio",
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(FALLBACK_REPOS);
    }

    const repos = await response.json();
    if (!Array.isArray(repos) || repos.length === 0) {
      return NextResponse.json(FALLBACK_REPOS);
    }

    return NextResponse.json(
      repos.map(
        (r: {
          name: string;
          description: string | null;
          html_url: string;
          stargazers_count: number;
          language: string | null;
          updated_at: string;
        }) => ({
          name: r.name,
          description: r.description,
          url: r.html_url,
          stars: r.stargazers_count,
          language: r.language,
          updatedAt: r.updated_at,
        })
      )
    );
  } catch {
    return NextResponse.json(FALLBACK_REPOS);
  }
}

