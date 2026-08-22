import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { githubRepos as defaultGithubRepos } from "@/lib/data";

const DATA_FILE_PATH = path.join(process.cwd(), "data.json");

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const isBrowse = searchParams.get("action") === "browse" || searchParams.get("picker") === "true";
  const isLiveSync = searchParams.get("sync") === "live" || searchParams.get("live") === "true";

  // If live sync or repo browser is requested
  if (isBrowse || isLiveSync) {
    try {
      const headers: Record<string, string> = {
        Accept: "application/vnd.github+json",
        "User-Agent": "subhan-portfolio",
      };

      const clientId = process.env.GITHUB_CLIENT_ID;
      const clientSecret = process.env.GITHUB_CLIENT_SECRET;
      if (clientId && clientSecret) {
        const auth = Buffer.from(`${clientId.trim()}:${clientSecret.trim()}`).toString("base64");
        headers["Authorization"] = `Basic ${auth}`;
      }

      const response = await fetch(
        "https://api.github.com/users/Subhan-Haider/repos?sort=updated&per_page=100",
        {
          headers,
          cache: "no-store",
        }
      );

      if (response.ok) {
        const repos = await response.json();
        if (Array.isArray(repos)) {
          const formatted = repos.map((r: any) => ({
            name: r.name,
            fullName: r.full_name,
            description: r.description || "Open source experiment and code shared on GitHub.",
            url: r.html_url,
            stars: r.stargazers_count || 0,
            forks: r.forks_count || 0,
            language: r.language || "Code",
            updatedAt: r.updated_at,
            createdAt: r.created_at,
            isFork: r.fork,
            topics: r.topics || [],
            homepage: r.homepage || "",
          }));

          if (isBrowse) {
            return NextResponse.json({ success: true, count: formatted.length, repos: formatted });
          }

          // If sync=live, return the formatted top repos
          return NextResponse.json(formatted.slice(0, 12));
        }
      } else {
        console.error("GitHub API response not ok:", response.status, response.statusText);
      }
    } catch (e) {
      console.error("Failed to fetch live GitHub repos:", e);
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



