import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { githubRepos as defaultGithubRepos } from "@/lib/data";

const DATA_FILE_PATH = path.join(process.cwd(), "data.json");

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const isLiveSync = searchParams.get("sync") === "live" || searchParams.get("live") === "true";

  // If live sync is explicitly requested by admin, fetch directly from GitHub
  if (isLiveSync) {
    try {
      const response = await fetch(
        "https://api.github.com/users/Subhan-Haider/repos?sort=updated&per_page=12",
        {
          headers: {
            Accept: "application/vnd.github+json",
            "User-Agent": "subhan-portfolio",
          },
          cache: "no-store",
        }
      );

      if (response.ok) {
        const repos = await response.json();
        if (Array.isArray(repos) && repos.length > 0) {
          const formatted = repos.map(
            (r: {
              name: string;
              description: string | null;
              html_url: string;
              stargazers_count: number;
              language: string | null;
              updated_at: string;
            }) => ({
              name: r.name,
              description: r.description || "Open source experiment and code shared on GitHub.",
              url: r.html_url,
              stars: r.stargazers_count || 0,
              language: r.language || "TypeScript",
              updatedAt: r.updated_at,
            })
          );
          return NextResponse.json(formatted);
        }
      }
    } catch (e) {
      console.error("Failed to sync live GitHub repos:", e);
    }
  }

  // Normal request: Try to read persisted githubRepos from data.json
  try {
    const fileContents = await fs.readFile(DATA_FILE_PATH, "utf8");
    const data = JSON.parse(fileContents);
    if (Array.isArray(data.githubRepos) && data.githubRepos.length > 0) {
      return NextResponse.json(data.githubRepos);
    }
  } catch {
    // ignore
  }

  // Fallback to default in lib/data.ts
  return NextResponse.json(defaultGithubRepos);
}


