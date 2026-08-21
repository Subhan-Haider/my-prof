"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Github,
  Download,
  Smartphone,
  Globe,
  Code2,
  Sparkles,
  Layers,
  Terminal,
  ExternalLink,
  ShieldCheck,
  Zap,
  TrendingUp,
  CreditCard,
  PieChart,
  CheckCircle2,
  FolderGit2,
  Star,
  GitFork,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Nav, Footer, Reveal, GlowBadge } from "@/components/site";
import {
  heroScreenshots as defaultHeroScreenshots,
  HeroScreenshot,
  projects as _projects,
  technologies as _technologies,
  techCategories as _techCategories,
  journey as _journey,
  stats as _stats,
  extensions as _extensions,
} from "@/lib/data";

interface GitHubRepo {
  name: string;
  description: string | null;
  url: string;
  stars: number;
  language: string | null;
  updatedAt: string;
}

export default function Home() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loadingRepos, setLoadingRepos] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Mobile & Android");
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);

  const [data, setData] = useState<{
    projects: typeof _projects;
    technologies: typeof _technologies;
    techCategories: typeof _techCategories;
    journey: typeof _journey;
    stats: typeof _stats;
    extensions: typeof _extensions;
    heroScreenshots: HeroScreenshot[];
  }>({
    projects: [],
    technologies: [],
    techCategories: [],
    journey: [],
    stats: [],
    extensions: [],
    heroScreenshots: defaultHeroScreenshots,
  } as any);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    fetch("/api/github")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setRepos(data.slice(0, 4));
        }
      })
    fetch("/api/data")
      .then((res) => res.json())
      .then((resData) => {
        if (resData) {
          setData(resData);
        }
      })
      .catch(console.error)
      .finally(() => setLoadingData(false));
  }, []);

  const [isHeroPaused, setIsHeroPaused] = useState(false);

  const {
    projects = [],
    technologies = [],
    techCategories = [],
    journey = [],
    stats = [],
    extensions = [],
    heroScreenshots = defaultHeroScreenshots,
  } = data;

  const safeScreenshots = heroScreenshots && heroScreenshots.length > 0 ? heroScreenshots : defaultHeroScreenshots;
  const currentIdx = activeHeroIndex >= safeScreenshots.length ? 0 : activeHeroIndex;
  const currentHero = safeScreenshots[currentIdx] || defaultHeroScreenshots[0];

  // Auto-scroll hero showcase screenshots every 3.5 seconds
  useEffect(() => {
    if (isHeroPaused || safeScreenshots.length <= 1) return;
    const interval = setInterval(() => {
      setActiveHeroIndex((prev) => (prev + 1) % safeScreenshots.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isHeroPaused, safeScreenshots.length]);

  return (
    <main className="relative min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] transition-colors duration-300 overflow-hidden">
      <Nav />

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[90vh] pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 md:px-12 flex flex-col justify-center grid-pattern">
        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#6366f1]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-[#34d399]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="mx-auto max-w-7xl w-full grid gap-10 lg:gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
          {/* Left Column: Intro */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="display-title text-3xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight break-words"
            >
              I BUILD <br />
              <span className="gradient-text-mint">APPS, WEBSITES</span> <br />
              &amp; IDEAS<span className="text-[#34d399]">.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-xl text-base sm:text-xl text-[var(--text-secondary)] leading-relaxed"
            >
              Hi, I&apos;m <span className="text-[var(--text-primary)] font-bold">Subhan Haider</span>. A high school student turning curiosity into
              functional Android applications, clean web experiences, and open-source experiments.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto"
            >
              <a
                href="#work"
                className="flex items-center justify-center gap-2 rounded-full bg-slate-900 text-white dark:bg-gradient-to-r dark:from-white dark:via-[#f1f5f9] dark:to-[#e2e8f0] dark:text-[#090a12] px-6 py-3.5 text-sm font-bold shadow-md hover:scale-105 active:scale-98 transition-all text-center min-h-[44px]"
              >
                <span>Explore My Work</span>
                <ArrowUpRight size={16} />
              </a>

              <a
                href="https://github.com/Subhan-Haider"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-full border border-[var(--border-medium)] bg-[var(--bg-surface)] px-6 py-3.5 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] hover:border-[var(--border-active)] active:scale-98 transition-all text-center min-h-[44px] shadow-sm"
              >
                <Github size={16} />
                <span>GitHub Profile</span>
              </a>

              <Link
                href="/resume"
                className="flex items-center justify-center gap-2 rounded-full border border-[var(--border-medium)] bg-[var(--bg-surface)] px-5 py-3.5 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] hover:border-[var(--border-active)] active:scale-98 transition-all text-center min-h-[44px] shadow-sm"
              >
                <span>Resume</span>
                <ArrowUpRight size={14} />
              </Link>
            </motion.div>

            {/* Quick Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 sm:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-8 border-t border-[var(--border-subtle)]"
            >
              {stats.map((item) => (
                <div key={item.label} className="p-1">
                  <div className="font-display text-2xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
                    {item.number}
                  </div>
                  <div className="mt-1 text-xs text-[var(--text-secondary)] font-medium">{item.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Pure Real Screenshot Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative lg:h-[480px] flex items-center justify-center w-full my-4 lg:my-0"
          >
            {/* Floating Image Showcase - Pure Screenshot, No Frame */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              onMouseEnter={() => setIsHeroPaused(true)}
              onMouseLeave={() => setIsHeroPaused(false)}
              onTouchStart={() => setIsHeroPaused(true)}
              onTouchEnd={() => setIsHeroPaused(false)}
              className="relative flex flex-col items-center justify-center group"
            >
              {/* Pure Screenshot / Promo Card Container */}
              <div className="relative mx-auto w-full max-w-[200px] sm:max-w-[240px] md:max-w-[260px] aspect-[460/1024] rounded-2xl bg-[var(--bg-surface-elevated)] shadow-[0_20px_50px_rgba(0,0,0,0.85)] border border-white/10 overflow-hidden flex flex-col justify-between">
                {/* Left/Right Quick Navigation Arrows */}
                <button
                  onClick={() =>
                    setActiveHeroIndex((prev) =>
                      (prev - 1 + safeScreenshots.length) % safeScreenshots.length
                    )
                  }
                  aria-label="Previous screenshot"
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center backdrop-blur-md opacity-90 sm:opacity-0 sm:group-hover:opacity-100 hover:bg-[#34d399] hover:text-[#090a12] active:scale-95 transition-all"
                >
                  <ChevronLeft size={15} />
                </button>

                <button
                  onClick={() =>
                    setActiveHeroIndex((prev) => (prev + 1) % safeScreenshots.length)
                  }
                  aria-label="Next screenshot"
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center backdrop-blur-md opacity-90 sm:opacity-0 sm:group-hover:opacity-100 hover:bg-[#34d399] hover:text-[#090a12] active:scale-95 transition-all"
                >
                  <ChevronRight size={15} />
                </button>

                {/* Real High-Res Designed Promo Card */}
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    key={currentHero.image}
                    src={currentHero.image}
                    alt={currentHero.title || "App Showcase"}
                    className="w-full h-full object-cover object-top transition-opacity duration-300 select-none pointer-events-none"
                  />
                  {/* Subtle glass reflection overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Minimal Dot Indicators */}
              <div className="mt-4 flex items-center gap-1.5">
                {safeScreenshots.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveHeroIndex(i)}
                    aria-label={`Slide ${i + 1}`}
                    className={`rounded-full transition-all ${
                      currentIdx === i
                        ? "w-5 h-1.5 bg-[#34d399] shadow-[0_0_8px_rgba(52,211,153,0.6)]"
                        : "w-1.5 h-1.5 bg-white/25 hover:bg-white/45"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 items-center gap-2 text-xs font-mono text-[#64748b] tracking-wider animate-bounce">
          <ArrowDown size={14} />
          <span>SCROLL TO EXPLORE</span>
        </div>
      </section>

      {/* ================= CORE PHILOSOPHY ================= */}
      <section className="relative border-y border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] px-6 py-24 md:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal direction="left">
            <h2 className="display-title mt-4 text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[var(--text-primary)]">
              I LEARN BEST <br />
              <span className="gradient-text-mint">BY BUILDING REAL THINGS.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-[var(--text-secondary)] leading-relaxed">
              Instead of getting stuck in endless tutorial loops, I learn by building actual applications.
              Every project is an opportunity to explore software architecture, database design, animations,
              and real-world problem solving.
            </p>
          </Reveal>

          {/* 4 Bento Highlights */}
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Reveal direction="up" scale delay={0.1}>
              <div className="h-full rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 backdrop-blur-sm shadow-sm dark:shadow-none hover:border-[var(--accent-emerald)]/50 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-[#34d399] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Smartphone size={20} />
                </div>
                <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">Android Native</h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                  Crafting native Android experiences with Kotlin, Jetpack Compose, Room, and modern MVVM patterns.
                </p>
              </div>
            </Reveal>

            <Reveal direction="up" scale delay={0.2}>
              <div className="h-full rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 backdrop-blur-sm shadow-sm dark:shadow-none hover:border-[var(--accent-indigo)]/50 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-[#818cf8] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Globe size={20} />
                </div>
                <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">Modern Web</h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                  Building responsive, high-performance web applications using React, Next.js, and TypeScript.
                </p>
              </div>
            </Reveal>

            <Reveal direction="up" scale delay={0.3}>
              <div className="h-full rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 backdrop-blur-sm shadow-sm dark:shadow-none hover:border-[var(--accent-sky)]/50 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-[#38bdf8] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <ShieldCheck size={20} />
                </div>
                <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">Offline &amp; Private</h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                  Designing offline-first systems where user data stays private, encrypted, and accessible at lightspeed.
                </p>
              </div>
            </Reveal>

            <Reveal direction="up" scale delay={0.4}>
              <div className="h-full rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 backdrop-blur-sm shadow-sm dark:shadow-none hover:border-pink-500/50 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-600 dark:text-[#ec4899] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <FolderGit2 size={20} />
                </div>
                <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">Open Source</h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                  Sharing templates, modules, and code publicly on GitHub to support and collaborate with the developer community.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= SELECTED WORK ================= */}
      <section id="work" className="relative px-6 py-28 md:px-12">
        <div className="mx-auto max-w-7xl">
          <Reveal direction="right">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[var(--border-subtle)]">
              <div>
                <h2 className="display-title mt-4 text-4xl sm:text-6xl font-extrabold text-[var(--text-primary)]">
                  SELECTED WORK<span className="text-[#34d399]">.</span>
                </h2>
              </div>
              <Link
                href="/projects"
                className="flex items-center gap-1.5 text-sm font-mono text-emerald-600 dark:text-[#34d399] hover:underline font-medium"
              >
                <span>View Full Project Archive</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </Reveal>

          {/* Project Cards */}
          <div className="mt-12 space-y-8">
            {projects.map((project, idx) => (
              <Reveal key={project.slug} direction={idx % 2 === 0 ? "left" : "right"} scale delay={idx * 0.1}>
                <div className="project-card rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-10 backdrop-blur-xl hover:border-[var(--border-active)] shadow-sm dark:shadow-none hover:shadow-xl transition-all">
                  <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] items-center">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-mono text-xs text-[#64748b]">0{idx + 1}</span>
                        <GlowBadge variant={project.type === "Android" ? "emerald" : "indigo"}>
                          <span>{project.type.toUpperCase()}</span>
                        </GlowBadge>
                        {project.year && (
                          <span className="text-xs font-mono text-[#64748b]">• {project.year}</span>
                        )}
                      </div>

                      <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mt-4">
                        {project.title}
                      </h3>

                      <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-xl">
                        {project.summary}
                      </p>

                      {/* Key highlights / metrics */}
                      {project.metrics && (
                        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {project.metrics.map((m) => (
                            <div
                              key={m.label}
                              className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] p-3 text-center"
                            >
                              <div className="text-xs font-mono text-[#64748b]">{m.label}</div>
                              <div className="font-display text-sm font-bold text-[var(--text-primary)] mt-1">
                                {m.value}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Tech stack pills */}
                      <div className="mt-6 flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] px-3 py-1 text-xs font-mono text-[var(--text-secondary)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="mt-8 flex flex-wrap items-center gap-4">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="flex items-center gap-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-[#34d399] dark:text-[#090a12] dark:hover:bg-[#6ee7b7] px-5 py-2.5 text-xs font-bold transition-all shadow-sm"
                        >
                          <span>Read Case Study</span>
                          <ArrowUpRight size={14} />
                        </Link>

                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 rounded-full border border-[var(--border-medium)] bg-[var(--bg-surface)] px-4 py-2.5 text-xs font-medium text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] transition-colors shadow-sm"
                          >
                            <span>Live Demo</span>
                            <ExternalLink size={13} />
                          </a>
                        )}

                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 rounded-full border border-[var(--border-medium)] bg-[var(--bg-surface)] px-4 py-2.5 text-xs font-medium text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] transition-colors shadow-sm"
                          >
                            <Github size={13} />
                            <span>GitHub</span>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Visual Card Artwork */}
                    <div className="relative min-h-[260px] sm:min-h-[320px] rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] dark:bg-gradient-to-br dark:from-[#161a30] dark:via-[#0f111d] dark:to-[#0a1816] p-6 flex flex-col justify-between overflow-hidden shadow-sm dark:shadow-inner">
                      <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
                        <span>PROJECT PREVIEW</span>
                        <span className="text-emerald-600 dark:text-[#34d399] font-medium">{project.type}</span>
                      </div>

                      {project.slug === "daily-finance" ? (
                        <div className="space-y-3 my-auto">
                          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 shadow-sm">
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-[var(--text-secondary)] font-medium">Budget Health</span>
                              <span className="text-emerald-600 dark:text-[#34d399] font-bold">Optimal (94%)</span>
                            </div>
                            <div className="mt-2 h-2 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                              <div className="h-full w-[85%] bg-gradient-to-r from-emerald-500 to-sky-400 dark:from-[#34d399] dark:to-[#38bdf8]" />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3 text-center shadow-sm">
                              <span className="text-[var(--text-muted)] block text-[10px] font-mono">INCOME</span>
                              <span className="font-bold text-emerald-600 dark:text-[#34d399] text-sm">+$4,200</span>
                            </div>
                            <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3 text-center shadow-sm">
                              <span className="text-[var(--text-muted)] block text-[10px] font-mono">EXPENSES</span>
                              <span className="font-bold text-rose-600 dark:text-[#ef4444] text-sm">-$1,840</span>
                            </div>
                          </div>
                        </div>
                      ) : project.slug === "app-tester" ? (
                        <div className="space-y-3 my-auto">
                          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 shadow-sm">
                            <div className="flex items-center gap-3">
                              {project.logoUrl ? (
                                <img 
                                  src={project.logoUrl} 
                                  alt="Logo" 
                                  className="w-8 h-8 rounded-lg object-contain bg-black/5 dark:bg-white/5"
                                />
                              ) : (
                                <div className="w-8 h-8 rounded-lg bg-indigo-500/15 text-indigo-600 dark:text-[#818cf8] flex items-center justify-center font-mono font-bold">
                                  APK
                                </div>
                              )}
                              <div>
                                <h4 className="text-xs font-bold text-[var(--text-primary)]">DailyFinance_v1.2.apk</h4>
                                <span className="text-[10px] text-[var(--text-muted)]">Build #42 • 14.8 MB</span>
                              </div>
                            </div>
                            <div className="mt-3 flex gap-2">
                              <span className="text-[10px] bg-emerald-500/10 text-emerald-700 dark:text-[#34d399] px-2 py-0.5 rounded font-medium">
                                Ready for Testing
                              </span>
                              <span className="text-[10px] bg-slate-200/80 dark:bg-white/10 text-[var(--text-secondary)] px-2 py-0.5 rounded">
                                Release Notes Added
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : project.logoUrl ? (
                        <div className="space-y-3 my-auto flex flex-col items-center justify-center text-center">
                          <img 
                            src={project.logoUrl} 
                            alt={project.title} 
                            className="w-20 h-20 rounded-2xl object-contain bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-2 shadow-md mx-auto"
                          />
                          <h4 className="text-sm font-bold text-[var(--text-primary)] mt-2">{project.title}</h4>
                        </div>
                      ) : (
                        <div className="space-y-3 my-auto">
                          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 font-mono text-xs text-[var(--text-secondary)] shadow-sm">
                            <div className="text-emerald-600 dark:text-[#34d399] font-medium">$ git clone github.com/Subhan-Haider</div>
                            <div className="text-[var(--text-primary)] mt-1">&gt; 100% Free &amp; Open Source Modules</div>
                            <div className="text-[var(--text-muted)] mt-1">&gt; Jetpack Compose canvas charts included</div>
                          </div>
                        </div>
                      )}

                      <div className="text-[11px] font-mono text-[var(--text-muted)] text-right">
                        Click to view architecture breakdown →
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ANDROID SPOTLIGHT ================= */}
      <section id="android" className="relative border-y border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] px-6 py-28 md:px-12 overflow-hidden">
        <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#34d399]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-[1fr_1.1fr] items-center">
          <Reveal direction="left">
            <h2 className="display-title mt-4 text-4xl sm:text-6xl font-extrabold text-[var(--text-primary)]">
              BUILT FOR <br />
              <span className="gradient-text-mint">THE ANDROID OS.</span>
            </h2>
            <p className="mt-6 text-lg text-[var(--text-secondary)] leading-relaxed">
              Android development is where my passion for software engineering truly began.
              I focus on creating fluid, native applications leveraging the full power of modern Android toolchains.
            </p>

            {/* Android Architecture Highlights */}
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="mt-1 w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-[#34d399] flex items-center justify-center shrink-0">
                  <CheckCircle2 size={14} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[var(--text-primary)]">Declarative UI with Jetpack Compose</h4>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                    100% reactive state management, seamless dark/light Material 3 theming, and hardware-accelerated animations.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="mt-1 w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-[#34d399] flex items-center justify-center shrink-0">
                  <CheckCircle2 size={14} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[var(--text-primary)]">Clean Architecture &amp; MVVM</h4>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                    Separation of concerns across UI layer, domain use cases, and repository data sources with Kotlin Flows.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="mt-1 w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-[#34d399] flex items-center justify-center shrink-0">
                  <CheckCircle2 size={14} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[var(--text-primary)]">Offline-First Room SQLite Database</h4>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                    Fast, secure, on-device data persistence ensuring zero network latency and complete user privacy.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <a
                href="https://tester.subhan.tech/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-[#34d399] dark:text-[#090a12] dark:hover:bg-[#6ee7b7] px-6 py-3 text-xs font-bold shadow-lg hover:scale-105 transition-all"
              >
                <span>Visit Android Tester Hub</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </Reveal>

          {/* Right Side: Code / Architecture Card */}
          <Reveal direction="right" delay={0.2}>
            <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-8 backdrop-blur-xl shadow-lg dark:shadow-2xl font-mono">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--border-subtle)] text-xs">
                <div className="flex items-center gap-2">
                  <Terminal size={14} className="text-emerald-600 dark:text-[#34d399]" />
                  <span className="text-[var(--text-primary)] font-bold">DailyFinanceViewModel.kt</span>
                </div>
                <span className="text-[var(--text-muted)]">Kotlin 2.0</span>
              </div>

              <div className="space-y-1.5 text-xs text-[var(--text-secondary)] leading-relaxed overflow-x-auto">
                <p><span className="text-indigo-600 dark:text-[#818cf8] font-bold">class</span> <span className="text-sky-600 dark:text-[#38bdf8] font-bold">FinanceViewModel</span>(</p>
                <p className="pl-4"><span className="text-indigo-600 dark:text-[#818cf8] font-bold">private val</span> repository: FinanceRepository</p>
                <p>) : ViewModel() &#123;</p>
                <p className="pl-4 text-[var(--text-muted)]">// Reactive UI state stream</p>
                <p className="pl-4"><span className="text-indigo-600 dark:text-[#818cf8] font-bold">val</span> uiState: StateFlow&lt;FinanceUiState&gt; =</p>
                <p className="pl-8">repository.observeTransactions()</p>
                <p className="pl-8">.map &#123; list -&gt; FinanceUiState.Success(list) &#125;</p>
                <p className="pl-8">.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), Loading)</p>
                <p className="mt-2 pl-4"><span className="text-indigo-600 dark:text-[#818cf8] font-bold">fun</span> <span className="text-emerald-600 dark:text-[#34d399] font-bold">addTransaction</span>(entry: Transaction) =</p>
                <p className="pl-8">viewModelScope.launch(Dispatchers.IO) &#123;</p>
                <p className="pl-12">repository.insert(entry)</p>
                <p className="pl-8">&#125;</p>
                <p>&#125;</p>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs text-[var(--text-muted)]">
                <span>✓ Verified Type Safe</span>
                <span className="text-emerald-600 dark:text-[#34d399] font-medium">60 FPS Compose Rendering</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= TECH STACK MATRIX ================= */}
      <section id="stack" className="px-6 py-28 md:px-12">
        <div className="mx-auto max-w-7xl">
          <Reveal direction="down">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="display-title mt-4 text-4xl sm:text-6xl font-extrabold text-white">
                TOOLS I USE <br />
                <span className="gradient-text-mint">TO BRING IDEAS TO LIFE.</span>
              </h2>
              <p className="mt-4 text-base text-[#94a3b8]">
                A versatile stack covering native mobile programming, modern web frameworks, databases, and design.
              </p>
            </div>
          </Reveal>

          {/* Marquee Banner */}
          <div className="mt-14 overflow-hidden border-y border-white/[0.08] py-4 bg-white/[0.01]">
            <div className="marquee-track flex gap-3">
              {[...technologies, ...technologies, ...technologies].map((tech, i) => (
                <span
                  key={i}
                  className="rounded-full border border-white/10 bg-[var(--bg-surface)] px-4 py-2 text-xs font-mono text-[#cbd5e1]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Categorized Tech Grid */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {techCategories.map((cat, idx) => (
              <Reveal key={cat.category} direction="up" delay={idx * 0.1}>
                <div className="h-full rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 backdrop-blur-md shadow-sm dark:shadow-none hover:border-[var(--border-active)] hover:shadow-md transition-all">
                  <h3 className="font-display text-base font-bold text-[var(--text-primary)] pb-3 border-b border-[var(--border-subtle)] flex items-center justify-between">
                    <span>{cat.category}</span>
                    <span className="text-xs font-mono text-emerald-600 dark:text-[#34d399] bg-emerald-500/10 px-2.5 py-0.5 rounded-full font-medium">
                      {cat.items.length} skills
                    </span>
                  </h3>

                  <div className="mt-4 space-y-2.5">
                    {cat.items.map((item) => {
                      const levelStyle =
                        item.level === "Primary"
                          ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20"
                          : item.level === "Advanced"
                          ? "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-500/20"
                          : "bg-slate-500/10 text-slate-700 dark:text-slate-400 border-slate-500/20";

                      return (
                        <div
                          key={item.name}
                          className="flex items-center justify-between py-1 text-sm"
                        >
                          <span className="font-medium text-[var(--text-primary)]">{item.name}</span>
                          <span className={`text-[11px] font-mono border px-2 py-0.5 rounded-md ${levelStyle}`}>
                            {item.level}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURED EXTENSIONS ================= */}
      <section className="border-t border-white/[0.08] bg-[var(--bg-surface-elevated)] px-6 py-24 md:px-12">
        <div className="mx-auto max-w-7xl">
          <Reveal direction="left">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/[0.08]">
              <div>
                <h2 className="display-title mt-4 text-3xl sm:text-5xl font-extrabold text-white">
                  FEATURED EXTENSIONS<span className="text-[#34d399]">.</span>
                </h2>
                <p className="mt-4 max-w-lg text-base text-[#94a3b8] leading-relaxed">
                  Cross-browser tools and apps published on the Chrome Web Store, Edge Add-ons, Firefox AMO, and Microsoft Store.
                </p>
              </div>
              <a
                href="https://chromewebstore.google.com/u/0/search/Subhan%20Haider"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs font-mono text-[#34d399] hover:underline whitespace-nowrap"
              >
                <span>View on Chrome Store</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {extensions.map((ext, i) => (
              <Reveal key={ext.name} direction="up" delay={i * 0.07}>
                <div className="group relative flex h-full flex-col justify-between rounded-2xl border border-white/[0.08] bg-[var(--bg-surface)] p-5 backdrop-blur-md hover:border-white/20 hover:bg-[#15192c]/80 transition-all">
                  {/* Accent glow */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{ boxShadow: `inset 0 0 30px ${ext.color}10` }}
                  />

                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span
                          className="text-[10px] font-mono uppercase tracking-widest"
                          style={{ color: ext.color }}
                        >
                          {ext.role}
                        </span>
                        <h3 className="mt-1 font-display text-lg font-bold text-white group-hover:text-white transition-colors">
                          {ext.name}
                        </h3>
                      </div>
                      <a
                        href={ext.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Visit ${ext.name}`}
                        className="shrink-0 mt-1 w-7 h-7 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center text-[#64748b] hover:text-white hover:border-white/30 transition-colors"
                      >
                        <ExternalLink size={12} />
                      </a>
                    </div>

                    <p className="mt-3 text-xs text-[#94a3b8] leading-relaxed">{ext.desc}</p>
                  </div>

                  {/* Platform badges */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {ext.platforms.map((p, pi) => (
                      <a
                        key={pi}
                        href={p.href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-mono text-[#94a3b8] hover:text-white hover:border-white/25 hover:bg-white/[0.08] transition-all"
                        style={{ borderColor: `${p.color}30` }}
                      >
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ background: p.color }}
                        />
                        {p.label}
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= LIVE GITHUB REPOS ================= */}
      <section className="border-t border-white/[0.08] bg-[var(--bg-surface)] px-6 py-24 md:px-12">
        <div className="mx-auto max-w-7xl">
          <Reveal direction="right">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/[0.08]">
              <div>
                <h2 className="display-title mt-4 text-3xl sm:text-5xl font-extrabold text-white">
                  LIVE GITHUB ACTIVITY<span className="text-[#34d399]">.</span>
                </h2>
              </div>

              <a
                href="https://github.com/Subhan-Haider"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs font-mono text-[#34d399] hover:underline"
              >
                <span>github.com/Subhan-Haider</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {repos.length > 0
              ? repos.map((repo, i) => (
                <Reveal key={repo.name} direction="up" delay={i * 0.1}>
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex h-full flex-col justify-between rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 backdrop-blur-md hover:border-[var(--border-active)] hover:shadow-md shadow-sm dark:shadow-none transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[#64748b] group-hover:text-[var(--text-primary)] transition-colors">
                        <FolderGit2 size={16} />
                        <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <h4 className="mt-3 font-display font-bold text-[var(--text-primary)] text-base truncate">
                        {repo.name}
                      </h4>
                      <p className="mt-2 text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                        {repo.description || "Open source experiment and code shared on GitHub."}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between pt-4 border-t border-[var(--border-subtle)] text-[11px] font-mono text-[#64748b]">
                      <span className="text-emerald-600 dark:text-[#34d399] font-medium">{repo.language || "Code"}</span>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Star size={11} /> {repo.stars}
                        </span>
                      </div>
                    </div>
                  </a>
                </Reveal>
              ))
              : [
                { name: "Daily-Finance-Android", desc: "Native Jetpack Compose finance manager.", lang: "Kotlin" },
                { name: "app-tester-platform", desc: "Web platform for Android APK distribution.", lang: "TypeScript" },
                { name: "android-compose-canvas", desc: "Custom reactive graphing components.", lang: "Kotlin" },
                { name: "subhan-portfolio", desc: "Next.js 15 personal developer platform.", lang: "TypeScript" },
              ].map((item, i) => (
                <Reveal key={item.name} direction="up" delay={i * 0.1}>
                  <a
                    href="https://github.com/Subhan-Haider"
                    target="_blank"
                    rel="noreferrer"
                    className="group flex h-full flex-col justify-between rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 backdrop-blur-md hover:border-[var(--border-active)] hover:shadow-md shadow-sm dark:shadow-none transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[#64748b]">
                        <FolderGit2 size={16} />
                        <ArrowUpRight size={14} />
                      </div>
                      <h4 className="mt-3 font-display font-bold text-[var(--text-primary)] text-base">
                        {item.name}
                      </h4>
                      <p className="mt-2 text-xs text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
                    </div>
                    <div className="mt-6 flex items-center justify-between pt-4 border-t border-[var(--border-subtle)] text-[11px] font-mono text-[#64748b]">
                      <span className="text-emerald-600 dark:text-[#34d399] font-medium">{item.lang}</span>
                      <span>Open Source</span>
                    </div>
                  </a>
                </Reveal>
              ))}
          </div>
        </div>
      </section>

      {/* ================= JOURNEY TIMELINE ================= */}
      <section id="journey" className="border-t border-white/[0.08] bg-[var(--bg-surface-elevated)] px-6 py-28 md:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal direction="down">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="display-title mt-4 text-4xl sm:text-6xl font-extrabold text-white">
                THE JOURNEY SO FAR<span className="text-[#34d399]">.</span>
              </h2>
              <p className="mt-4 text-base text-[#94a3b8]">
                From early curiosity in high school to building full-fledged mobile and web products.
              </p>
            </div>
          </Reveal>

          {/* Timeline Nodes */}
          <div className="relative pl-6 sm:pl-8 border-l border-white/10 space-y-12">
            {journey.map((node, i) => (
              <Reveal key={node.title} direction="left" delay={i * 0.1}>
                <div className="relative group">
                  {/* Node Dot */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[var(--bg-surface)] border-2 border-[#34d399] flex items-center justify-center group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(52,211,153,0.5)]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#34d399]" />
                  </div>

                  <div className="rounded-2xl border border-white/[0.08] bg-[var(--bg-surface)] p-6 backdrop-blur-sm">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-xs text-[#34d399] font-bold">{node.year}</span>
                      <span className="text-[11px] font-mono bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full text-[#94a3b8]">
                        {node.badge}
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-white mt-2">
                      {node.title}
                    </h3>
                    <p className="mt-2 text-sm text-[#94a3b8] leading-relaxed">
                      {node.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= RESUME & CONTACT BANNER ================= */}
      <section className="px-6 py-24 md:px-12 relative overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="relative rounded-3xl border border-[var(--border-subtle)] bg-gradient-to-br from-emerald-50/60 via-[var(--bg-surface)] to-indigo-50/60 dark:from-[#171b33] dark:via-[#0f111e] dark:to-[#122320] p-8 sm:p-14 backdrop-blur-2xl shadow-xl dark:shadow-2xl overflow-hidden">
            {/* Ambient corner glows */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#34d399]/15 blur-3xl rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#6366f1]/15 blur-3xl rounded-full pointer-events-none" />

            <div className="relative z-10 grid gap-10 lg:grid-cols-[1.3fr_0.7fr] items-center">
              <div>
                <h2 className="display-title mt-4 text-4xl sm:text-6xl font-extrabold text-[var(--text-primary)]">
                  LET&apos;S BUILD <br />
                  <span className="gradient-text-mint">SOMETHING IMPACTFUL.</span>
                </h2>
                <p className="mt-5 text-base sm:text-lg text-[var(--text-secondary)] max-w-xl leading-relaxed">
                  Whether you have an idea for an Android app, want to collaborate on open-source projects,
                  or simply want to connect, my inbox is always open.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
                  <Link
                    href="/contact"
                    className="flex items-center justify-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-[#34d399] dark:text-[#090a12] dark:hover:bg-[#6ee7b7] px-6 py-3.5 text-sm font-bold shadow-lg hover:scale-105 active:scale-98 transition-all text-center min-h-[44px]"
                  >
                    <span>Get in Touch</span>
                    <ArrowUpRight size={16} />
                  </Link>

                  <Link
                    href="/resume"
                    className="flex items-center justify-center gap-2 rounded-full border border-[var(--border-medium)] bg-[var(--bg-surface)] px-6 py-3.5 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] active:scale-98 transition-all text-center min-h-[44px] shadow-sm"
                  >
                    <span>View Complete Resume</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Quick Contact Card */}
              <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] dark:bg-[var(--bg-surface-elevated)] p-6 backdrop-blur-xl shadow-md dark:shadow-none">
                <div className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">Quick Info</div>
                <div className="mt-4 space-y-3 text-sm">
                  <div>
                    <span className="text-[var(--text-muted)] block text-xs">Role</span>
                    <span className="text-[var(--text-primary)] font-medium">Student &amp; Software Developer</span>
                  </div>
                  <div>
                    <span className="text-[var(--text-muted)] block text-xs">Core Focus</span>
                    <span className="text-emerald-600 dark:text-[#34d399] font-medium">Android (Kotlin/Compose) &amp; Web</span>
                  </div>
                  <div>
                    <span className="text-[var(--text-muted)] block text-xs">Profiles</span>
                    <div className="mt-1 flex gap-3 text-xs text-[var(--text-secondary)]">
                      <a
                        href="https://github.com/Subhan-Haider"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-emerald-600 dark:hover:text-[#34d399] underline flex items-center gap-1 font-medium"
                      >
                        GitHub <ArrowUpRight size={11} />
                      </a>
                      <a
                        href="https://tester.subhan.tech/"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-emerald-600 dark:hover:text-[#34d399] underline flex items-center gap-1 font-medium"
                      >
                        App Tester <ArrowUpRight size={11} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

