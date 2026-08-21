import fs from "fs/promises";
import path from "path";
import {
  projects as defaultProjects,
  techCategories as defaultCategories,
  journey as defaultJourney,
  extensions as defaultExtensions,
  heroScreenshots as defaultHeroScreenshots,
  stats as defaultStats,
  Project,
  TechCategory,
  Extension,
  HeroScreenshot,
} from "./data";

export async function getPortfolioData() {
  try {
    const dataPath = path.join(process.cwd(), "data.json");
    const contents = await fs.readFile(dataPath, "utf8");
    const parsed = JSON.parse(contents);
    return {
      projects: (parsed.projects as Project[]) || defaultProjects,
      techCategories: (parsed.techCategories as TechCategory[]) || defaultCategories,
      journey: parsed.journey || defaultJourney,
      extensions: (parsed.extensions as Extension[]) || defaultExtensions,
      heroScreenshots: (parsed.heroScreenshots as HeroScreenshot[]) || defaultHeroScreenshots,
      settings: parsed.settings || {},
      messages: parsed.messages || [],
      stats: parsed.stats || defaultStats,
    };
  } catch (err) {
    return {
      projects: defaultProjects,
      techCategories: defaultCategories,
      journey: defaultJourney,
      extensions: defaultExtensions,
      heroScreenshots: defaultHeroScreenshots,
      settings: {},
      messages: [],
      stats: defaultStats,
    };
  }
}

export async function getAllProjects(): Promise<Project[]> {
  const data = await getPortfolioData();
  return data.projects && data.projects.length > 0 ? data.projects : defaultProjects;
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const all = await getAllProjects();
  return all.find((p) => p.slug === slug);
}
