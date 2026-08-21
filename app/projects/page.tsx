"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  ArrowUpRight,
  Filter,
  Layers,
  ExternalLink,
  Github,
  LayoutGrid,
  List,
  Sparkles,
  X,
} from "lucide-react";
import { Nav, Footer, Reveal, GlowBadge } from "@/components/site";
import { projects, Project } from "@/lib/data";

const categories = [
  "All",
  "Android",
  "Website",
  "Open Source",
  "Tool",
  "Experiment",
];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesFilter =
        activeFilter === "All" || project.type === activeFilter;
      const matchesSearch =
        `${project.title} ${project.summary} ${project.tagline || ""} ${project.stack.join(" ")}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  return (
    <main className="relative min-h-screen bg-[#090a12] text-[#f8fafc] overflow-hidden">
      <Nav />

      {/* Header Section */}
      <section className="relative pt-40 pb-16 px-6 md:px-12 grid-pattern">
        {/* Glow Spheres */}
        <div className="absolute top-20 left-1/3 w-[500px] h-[300px] bg-[#6366f1]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="flex items-center gap-2 text-xs font-mono text-[#34d399]">
              <Layers size={14} />
              <span>THE COMPLETE ARCHIVE</span>
            </div>

            <h1 className="display-title mt-4 text-3xl sm:text-7xl lg:text-8xl font-extrabold text-white">
              EVERYTHING <br />
              <span className="gradient-text-mint">I&apos;VE BUILT.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base sm:text-lg text-[#94a3b8] leading-relaxed">
              A comprehensive showcase of native Android apps, web experiences, developer tools,
              and open-source experiments built from scratch.
            </p>
          </Reveal>

          {/* Controls Bar: Filters, Search, View Mode */}
          <div className="mt-12 rounded-2xl border border-white/[0.08] bg-[#0f111d]/80 p-4 sm:p-5 backdrop-blur-xl shadow-xl flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Filter Category Chips - scrollable on mobile */}
            <div className="flex flex-row overflow-x-auto scrollbar-none items-center gap-2 pb-1">
              {categories.map((cat) => {
                const count =
                  cat === "All"
                    ? projects.length
                    : projects.filter((p) => p.type === cat).length;

                return (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`flex-shrink-0 flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-mono transition-all ${
                      activeFilter === cat
                        ? "bg-[#34d399] text-[#090a12] font-bold shadow-[0_0_15px_rgba(52,211,153,0.3)]"
                        : "bg-white/[0.04] text-[#94a3b8] border border-white/5 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        activeFilter === cat
                          ? "bg-black/20 text-[#090a12]"
                          : "bg-white/10 text-[#64748b]"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search & View Toggle */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 sm:w-64">
                <Search
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748b]"
                />
                <input
                  type="text"
                  placeholder="Search projects or stack..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border border-white/10 bg-[#090a12]/80 pl-9 pr-8 py-2 text-xs text-white placeholder:text-[#64748b] focus:border-[#34d399] focus:outline-none transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748b] hover:text-white"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>

              {/* View Toggle */}
              <div className="hidden sm:flex items-center rounded-full border border-white/10 bg-[#090a12]/80 p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid view"
                  className={`p-1.5 rounded-full transition-colors ${
                    viewMode === "grid"
                      ? "bg-[#34d399] text-[#090a12]"
                      : "text-[#64748b] hover:text-white"
                  }`}
                >
                  <LayoutGrid size={15} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  aria-label="List view"
                  className={`p-1.5 rounded-full transition-colors ${
                    viewMode === "list"
                      ? "bg-[#34d399] text-[#090a12]"
                      : "text-[#64748b] hover:text-white"
                  }`}
                >
                  <List size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid / List View */}
      <section className="px-6 pb-32 md:px-12">
        <div className="mx-auto max-w-7xl">
          {filteredProjects.length > 0 ? (
            viewMode === "grid" ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project, idx) => (
                  <Reveal key={project.slug} delay={idx * 0.08}>
                    <div className="project-card flex flex-col justify-between h-full rounded-3xl border border-white/[0.08] bg-[#0f111d]/75 p-6 backdrop-blur-xl hover:border-[#34d399]/40 transition-all">
                      <div>
                        <div className="flex items-center justify-between">
                          <GlowBadge
                            variant={
                              project.type === "Android"
                                ? "emerald"
                                : project.type === "Open Source"
                                ? "sky"
                                : "indigo"
                            }
                          >
                            <span>{project.type.toUpperCase()}</span>
                          </GlowBadge>
                          {project.year && (
                            <span className="font-mono text-xs text-[#64748b]">
                              {project.year}
                            </span>
                          )}
                        </div>

                        <h2 className="font-display text-2xl font-bold text-white mt-5">
                          {project.title}
                        </h2>

                        <p className="mt-3 text-sm text-[#94a3b8] leading-relaxed line-clamp-3">
                          {project.summary}
                        </p>

                        <div className="mt-6 flex flex-wrap gap-1.5">
                          {project.stack.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-full border border-white/5 bg-white/[0.03] px-2.5 py-0.5 text-[11px] font-mono text-[#cbd5e1]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-8 pt-5 border-t border-white/[0.08] flex items-center justify-between">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="flex items-center gap-1 text-xs font-bold text-[#34d399] hover:underline"
                        >
                          <span>Case Study</span>
                          <ArrowUpRight size={14} className="project-arrow" />
                        </Link>

                        <div className="flex items-center gap-2">
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="p-2 rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                              title="Live Demo"
                            >
                              <ExternalLink size={13} />
                            </a>
                          )}
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="p-2 rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                              title="GitHub Repo"
                            >
                              <Github size={13} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProjects.map((project, idx) => (
                  <Reveal key={project.slug} delay={idx * 0.05}>
                    <div className="project-card rounded-2xl border border-white/[0.08] bg-[#0f111d]/75 p-6 backdrop-blur-xl hover:border-[#34d399]/40 transition-all flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <GlowBadge
                            variant={
                              project.type === "Android"
                                ? "emerald"
                                : project.type === "Open Source"
                                ? "sky"
                                : "indigo"
                            }
                          >
                            <span>{project.type.toUpperCase()}</span>
                          </GlowBadge>
                          <h2 className="font-display text-xl font-bold text-white">
                            {project.title}
                          </h2>
                        </div>
                        <p className="mt-2 text-sm text-[#94a3b8] line-clamp-2 max-w-3xl">
                          {project.summary}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-white/5 bg-white/[0.03] px-2.5 py-0.5 text-[11px] font-mono text-[#cbd5e1]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="flex items-center gap-1 rounded-full bg-[#34d399] px-4 py-2 text-xs font-bold text-[#090a12] hover:bg-[#6ee7b7] transition-colors"
                        >
                          <span>Case Study</span>
                          <ArrowUpRight size={13} />
                        </Link>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            )
          ) : (
            <div className="rounded-3xl border border-dashed border-white/10 p-16 text-center">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto text-[#64748b]">
                <Search size={22} />
              </div>
              <h3 className="font-display text-xl font-bold text-white mt-4">
                No projects matched your criteria
              </h3>
              <p className="mt-2 text-sm text-[#94a3b8]">
                Try adjusting your search query or filter tags.
              </p>
              <button
                onClick={() => {
                  setActiveFilter("All");
                  setSearchQuery("");
                }}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-xs font-bold text-white hover:bg-white/15 transition-colors"
              >
                <span>Reset Filters</span>
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

