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
} from "lucide-react";
import { Nav, Footer, Reveal, GlowBadge } from "@/components/site";
import { projects, technologies, techCategories, journey, stats } from "@/lib/data";

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

  useEffect(() => {
    fetch("/api/github")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setRepos(data.slice(0, 4));
        }
      })
      .catch(() => {})
      .finally(() => setLoadingRepos(false));
  }, []);

  return (
    <main className="relative min-h-screen bg-[#090a12] text-[#f8fafc] overflow-hidden">
      <Nav />

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[92vh] pt-32 pb-20 px-6 md:px-12 flex flex-col justify-center grid-pattern">
        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#6366f1]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-[#34d399]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="mx-auto max-w-7xl w-full grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
          {/* Left Column: Intro */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <GlowBadge variant="emerald">
                <span>STUDENT • ANDROID DEVELOPER • BUILDER</span>
              </GlowBadge>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="display-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight"
            >
              I BUILD <br />
              <span className="gradient-text-mint">APPS, WEBSITES</span> <br />
              &amp; IDEAS<span className="text-[#34d399]">.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="mt-6 max-w-xl text-base sm:text-xl text-[#94a3b8] leading-relaxed"
            >
              Hi, I&apos;m <span className="text-white font-medium">Subhan Haider</span>. A high school student turning curiosity into
              functional Android applications, clean web experiences, and open-source experiments.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto"
            >
              <a
                href="#work"
                className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-white via-[#f1f5f9] to-[#e2e8f0] px-6 py-3.5 text-sm font-bold text-[#090a12] shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:scale-105 transition-all text-center"
              >
                <span>Explore My Work</span>
                <ArrowUpRight size={16} />
              </a>

              <a
                href="https://github.com/Subhan-Haider"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-medium text-white backdrop-blur-sm hover:bg-white/10 hover:border-white/30 transition-all text-center"
              >
                <Github size={16} />
                <span>GitHub Profile</span>
              </a>

              <Link
                href="/resume"
                className="flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3.5 text-sm font-medium text-[#cbd5e1] hover:text-white hover:border-white/30 transition-all text-center"
              >
                <span>Resume</span>
                <ArrowUpRight size={14} />
              </Link>
            </motion.div>

            {/* Quick Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-8 border-t border-white/[0.08]"
            >
              {stats.map((item) => (
                <div key={item.label}>
                  <div className="font-display text-2xl sm:text-4xl font-extrabold text-white">
                    {item.number}
                  </div>
                  <div className="mt-1 text-xs text-[#94a3b8]">{item.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Interactive App & Code Mockup Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative lg:h-[580px] flex items-center justify-center"
          >
            {/* Ambient Background Box with Glass border */}
            <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-gradient-to-b from-[#15192c]/80 to-[#0c0e17]/90 p-6 backdrop-blur-2xl shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 text-xs font-mono text-[#94a3b8]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
                  <span className="ml-2 text-white/70 font-semibold">DailyFinance.kt</span>
                </div>
                <span className="text-[#34d399] font-semibold">Native Compose</span>
              </div>

              {/* Smartphone Simulator Card */}
              <div className="relative mx-auto w-full max-w-[320px] rounded-[2rem] border-[6px] border-[#1e2238] bg-[#0d0f1a] p-4 shadow-2xl">
                {/* Speaker notch */}
                <div className="mx-auto h-4 w-28 rounded-full bg-[#1e2238] mb-3 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0d0f1a] mr-2" />
                  <div className="w-6 h-1 rounded-full bg-[#0d0f1a]" />
                </div>

                {/* Simulated App Header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-[10px] font-mono text-[#64748b]">AUGUST 2026</span>
                    <h4 className="text-sm font-bold text-white">Daily Finance</h4>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#34d399]/20 border border-[#34d399]/40 flex items-center justify-center text-[#34d399] text-xs font-bold">
                    SH
                  </div>
                </div>

                {/* Simulated Balance Card */}
                <div className="rounded-2xl bg-gradient-to-br from-[#1b2342] via-[#121629] to-[#1a2e28] p-4 border border-white/10 shadow-lg">
                  <span className="text-[10px] font-mono text-[#94a3b8] uppercase">Total Balance</span>
                  <div className="mt-1 flex items-baseline justify-between">
                    <span className="text-2xl font-black font-display text-white">$4,850.40</span>
                    <span className="text-[11px] font-bold text-[#34d399] bg-[#34d399]/15 px-2 py-0.5 rounded-full">
                      +14.2%
                    </span>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <div className="flex-1 rounded-lg bg-white/10 py-1.5 text-center text-[10px] font-medium text-white hover:bg-white/15">
                      + Expense
                    </div>
                    <div className="flex-1 rounded-lg bg-[#34d399]/25 py-1.5 text-center text-[10px] font-bold text-[#34d399]">
                      Analytics
                    </div>
                  </div>
                </div>

                {/* Simulated Spending Breakdown Chart */}
                <div className="mt-3 rounded-xl bg-white/[0.03] p-3 border border-white/5">
                  <div className="flex items-center justify-between text-[11px] mb-2">
                    <span className="text-[#94a3b8]">Monthly Budget</span>
                    <span className="font-mono text-white">$1,240 / $2,000</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden flex">
                    <div className="w-[45%] bg-[#34d399]" />
                    <div className="w-[20%] bg-[#6366f1]" />
                    <div className="w-[15%] bg-[#38bdf8]" />
                  </div>
                </div>

                {/* Simulated Recent Transactions */}
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between rounded-lg bg-white/[0.02] p-2 text-[11px]">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-[#6366f1]/20 text-[#818cf8] flex items-center justify-center">
                        <Code2 size={12} />
                      </div>
                      <span className="text-[#cbd5e1]">Dev Server Hosting</span>
                    </div>
                    <span className="font-mono font-bold text-[#ef4444]">-$14.00</span>
                  </div>

                  <div className="flex items-center justify-between rounded-lg bg-white/[0.02] p-2 text-[11px]">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-[#34d399]/20 text-[#34d399] flex items-center justify-center">
                        <TrendingUp size={12} />
                      </div>
                      <span className="text-[#cbd5e1]">Freelance Contract</span>
                    </div>
                    <span className="font-mono font-bold text-[#34d399]">+$350.00</span>
                  </div>
                </div>
              </div>

              {/* Floating Tech Pill */}
              <div className="hidden sm:flex absolute -bottom-2 right-4 rounded-xl border border-[#34d399]/30 bg-[#0f111d]/90 px-3.5 py-2 backdrop-blur-md text-xs font-mono text-[#34d399] items-center gap-2 shadow-xl">
                <ShieldCheck size={14} />
                <span>100% Offline SQLite Storage</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 items-center gap-2 text-xs font-mono text-[#64748b] tracking-wider animate-bounce">
          <ArrowDown size={14} />
          <span>SCROLL TO EXPLORE</span>
        </div>
      </section>

      {/* ================= CORE PHILOSOPHY ================= */}
      <section className="relative border-y border-white/[0.08] bg-[#0c0e18] px-6 py-24 md:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="flex items-center gap-2 text-xs font-mono text-[#34d399]">
              <Sparkles size={14} />
              <span>THE BUILDER MINDSET</span>
            </div>
            <h2 className="display-title mt-4 text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white">
              I LEARN BEST <br />
              <span className="gradient-text-mint">BY BUILDING REAL THINGS.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-[#94a3b8] leading-relaxed">
              Instead of getting stuck in endless tutorial loops, I learn by building actual applications.
              Every project is an opportunity to explore software architecture, database design, animations,
              and real-world problem solving.
            </p>
          </Reveal>

          {/* 4 Bento Highlights */}
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Reveal delay={0.1}>
              <div className="h-full rounded-2xl border border-white/[0.08] bg-[#111424]/60 p-6 backdrop-blur-sm hover:border-[#34d399]/40 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-[#34d399]/10 text-[#34d399] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Smartphone size={20} />
                </div>
                <h3 className="font-display text-lg font-bold text-white">Android Native</h3>
                <p className="mt-2 text-sm text-[#94a3b8] leading-relaxed">
                  Crafting native Android experiences with Kotlin, Jetpack Compose, Room, and modern MVVM patterns.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="h-full rounded-2xl border border-white/[0.08] bg-[#111424]/60 p-6 backdrop-blur-sm hover:border-[#818cf8]/40 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-[#6366f1]/10 text-[#818cf8] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Globe size={20} />
                </div>
                <h3 className="font-display text-lg font-bold text-white">Modern Web</h3>
                <p className="mt-2 text-sm text-[#94a3b8] leading-relaxed">
                  Building responsive, high-performance web applications using React, Next.js, and TypeScript.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="h-full rounded-2xl border border-white/[0.08] bg-[#111424]/60 p-6 backdrop-blur-sm hover:border-[#38bdf8]/40 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-[#38bdf8]/10 text-[#38bdf8] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <ShieldCheck size={20} />
                </div>
                <h3 className="font-display text-lg font-bold text-white">Offline &amp; Private</h3>
                <p className="mt-2 text-sm text-[#94a3b8] leading-relaxed">
                  Designing offline-first systems where user data stays private, encrypted, and accessible at lightspeed.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="h-full rounded-2xl border border-white/[0.08] bg-[#111424]/60 p-6 backdrop-blur-sm hover:border-[#ec4899]/40 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-[#ec4899]/10 text-[#ec4899] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <FolderGit2 size={20} />
                </div>
                <h3 className="font-display text-lg font-bold text-white">Open Source</h3>
                <p className="mt-2 text-sm text-[#94a3b8] leading-relaxed">
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
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/[0.08]">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#34d399]">
                  <Layers size={14} />
                  <span>CURATED SHOWCASE</span>
                </div>
                <h2 className="display-title mt-4 text-4xl sm:text-6xl font-extrabold text-white">
                  SELECTED WORK<span className="text-[#34d399]">.</span>
                </h2>
              </div>
              <Link
                href="/projects"
                className="flex items-center gap-1.5 text-sm font-mono text-[#34d399] hover:underline"
              >
                <span>View Full Project Archive</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </Reveal>

          {/* Project Cards */}
          <div className="mt-12 space-y-8">
            {projects.map((project, idx) => (
              <Reveal key={project.slug} delay={idx * 0.1}>
                <div className="project-card rounded-3xl border border-white/[0.08] bg-[#0f111d]/80 p-6 sm:p-10 backdrop-blur-xl hover:border-[#34d399]/40 transition-all">
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

                      <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-4">
                        {project.title}
                      </h3>

                      <p className="mt-4 text-base sm:text-lg text-[#94a3b8] leading-relaxed max-w-xl">
                        {project.summary}
                      </p>

                      {/* Key highlights / metrics */}
                      {project.metrics && (
                        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {project.metrics.map((m) => (
                            <div
                              key={m.label}
                              className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-center"
                            >
                              <div className="text-xs font-mono text-[#64748b]">{m.label}</div>
                              <div className="font-display text-sm font-bold text-white mt-1">
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
                            className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-[#cbd5e1]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="mt-8 flex flex-wrap items-center gap-4">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="flex items-center gap-1.5 rounded-full bg-[#34d399] px-5 py-2.5 text-xs font-bold text-[#090a12] hover:bg-[#6ee7b7] transition-colors"
                        >
                          <span>Read Case Study</span>
                          <ArrowUpRight size={14} />
                        </Link>

                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-medium text-white hover:bg-white/10 transition-colors"
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
                            className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-medium text-white hover:bg-white/10 transition-colors"
                          >
                            <Github size={13} />
                            <span>GitHub</span>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Visual Card Artwork */}
                    <div className="relative min-h-[260px] sm:min-h-[320px] rounded-2xl border border-white/10 bg-gradient-to-br from-[#161a30] via-[#0f111d] to-[#0a1816] p-6 flex flex-col justify-between overflow-hidden shadow-inner">
                      <div className="flex items-center justify-between text-xs font-mono text-[#64748b]">
                        <span>PROJECT PREVIEW</span>
                        <span className="text-[#34d399]">{project.type}</span>
                      </div>

                      {project.slug === "daily-finance" ? (
                        <div className="space-y-3 my-auto">
                          <div className="rounded-xl border border-white/10 bg-[#090a12]/80 p-4">
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-[#94a3b8]">Budget Health</span>
                              <span className="text-[#34d399] font-bold">Optimal (94%)</span>
                            </div>
                            <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden">
                              <div className="h-full w-[85%] bg-gradient-to-r from-[#34d399] to-[#38bdf8]" />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="rounded-lg bg-white/5 p-3 text-center">
                              <span className="text-[#64748b] block text-[10px]">INCOME</span>
                              <span className="font-bold text-[#34d399] text-sm">+$4,200</span>
                            </div>
                            <div className="rounded-lg bg-white/5 p-3 text-center">
                              <span className="text-[#64748b] block text-[10px]">EXPENSES</span>
                              <span className="font-bold text-[#ef4444] text-sm">-$1,840</span>
                            </div>
                          </div>
                        </div>
                      ) : project.slug === "app-tester" ? (
                        <div className="space-y-3 my-auto">
                          <div className="rounded-xl border border-white/10 bg-[#090a12]/80 p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-[#6366f1]/20 text-[#818cf8] flex items-center justify-center font-mono font-bold">
                                APK
                              </div>
                              <div>
                                <h4 className="text-xs font-bold text-white">DailyFinance_v1.2.apk</h4>
                                <span className="text-[10px] text-[#64748b]">Build #42 • 14.8 MB</span>
                              </div>
                            </div>
                            <div className="mt-3 flex gap-2">
                              <span className="text-[10px] bg-[#34d399]/20 text-[#34d399] px-2 py-0.5 rounded">
                                Ready for Testing
                              </span>
                              <span className="text-[10px] bg-white/10 text-white/70 px-2 py-0.5 rounded">
                                Release Notes Added
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3 my-auto">
                          <div className="rounded-xl border border-white/10 bg-[#090a12]/80 p-4 font-mono text-xs text-[#94a3b8]">
                            <div className="text-[#34d399]">$ git clone github.com/Subhan-Haider</div>
                            <div className="text-white/70 mt-1">&gt; 100% Free &amp; Open Source Modules</div>
                            <div className="text-[#64748b] mt-1">&gt; Jetpack Compose canvas charts included</div>
                          </div>
                        </div>
                      )}

                      <div className="text-[11px] font-mono text-[#64748b] text-right">
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
      <section id="android" className="relative border-y border-white/[0.08] bg-[#0c0e18] px-6 py-28 md:px-12 overflow-hidden">
        <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#34d399]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-[1fr_1.1fr] items-center">
          <Reveal>
            <div className="flex items-center gap-2 text-xs font-mono text-[#34d399]">
              <Smartphone size={14} />
              <span>MOBILE ENGINEERING</span>
            </div>
            <h2 className="display-title mt-4 text-4xl sm:text-6xl font-extrabold text-white">
              BUILT FOR <br />
              <span className="gradient-text-mint">THE ANDROID OS.</span>
            </h2>
            <p className="mt-6 text-lg text-[#94a3b8] leading-relaxed">
              Android development is where my passion for software engineering truly began.
              I focus on creating fluid, native applications leveraging the full power of modern Android toolchains.
            </p>

            {/* Android Architecture Highlights */}
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="mt-1 w-5 h-5 rounded-full bg-[#34d399]/20 text-[#34d399] flex items-center justify-center shrink-0">
                  <CheckCircle2 size={14} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Declarative UI with Jetpack Compose</h4>
                  <p className="text-xs text-[#94a3b8] mt-0.5">
                    100% reactive state management, seamless dark/light Material 3 theming, and hardware-accelerated animations.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="mt-1 w-5 h-5 rounded-full bg-[#34d399]/20 text-[#34d399] flex items-center justify-center shrink-0">
                  <CheckCircle2 size={14} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Clean Architecture &amp; MVVM</h4>
                  <p className="text-xs text-[#94a3b8] mt-0.5">
                    Separation of concerns across UI layer, domain use cases, and repository data sources with Kotlin Flows.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="mt-1 w-5 h-5 rounded-full bg-[#34d399]/20 text-[#34d399] flex items-center justify-center shrink-0">
                  <CheckCircle2 size={14} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Offline-First Room SQLite Database</h4>
                  <p className="text-xs text-[#94a3b8] mt-0.5">
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
                className="inline-flex items-center gap-2 rounded-full bg-[#34d399] px-6 py-3 text-xs font-bold text-[#090a12] shadow-lg hover:scale-105 transition-all"
              >
                <span>Visit Android Tester Hub</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </Reveal>

          {/* Right Side: Code / Architecture Card */}
          <Reveal delay={0.2}>
            <div className="rounded-3xl border border-white/10 bg-[#090a12]/90 p-6 sm:p-8 backdrop-blur-xl shadow-2xl font-mono">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 text-xs">
                <div className="flex items-center gap-2">
                  <Terminal size={14} className="text-[#34d399]" />
                  <span className="text-white font-bold">DailyFinanceViewModel.kt</span>
                </div>
                <span className="text-[#64748b]">Kotlin 2.0</span>
              </div>

              <div className="space-y-1.5 text-xs text-[#cbd5e1] leading-relaxed overflow-x-auto">
                <p><span className="text-[#6366f1]">class</span> <span className="text-[#38bdf8]">FinanceViewModel</span>(</p>
                <p className="pl-4"><span className="text-[#6366f1]">private val</span> repository: FinanceRepository</p>
                <p>) : ViewModel() &#123;</p>
                <p className="pl-4 text-[#64748b]">// Reactive UI state stream</p>
                <p className="pl-4"><span className="text-[#6366f1]">val</span> uiState: StateFlow&lt;FinanceUiState&gt; =</p>
                <p className="pl-8">repository.observeTransactions()</p>
                <p className="pl-8">.map &#123; list -&gt; FinanceUiState.Success(list) &#125;</p>
                <p className="pl-8">.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), Loading)</p>
                <p className="mt-2 pl-4"><span className="text-[#6366f1]">fun</span> <span className="text-[#34d399]">addTransaction</span>(entry: Transaction) =</p>
                <p className="pl-8">viewModelScope.launch(Dispatchers.IO) &#123;</p>
                <p className="pl-12">repository.insert(entry)</p>
                <p className="pl-8">&#125;</p>
                <p>&#125;</p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#94a3b8]">
                <span>✓ Verified Type Safe</span>
                <span className="text-[#34d399]">60 FPS Compose Rendering</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= TECH STACK MATRIX ================= */}
      <section id="stack" className="px-6 py-28 md:px-12">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#34d399]">
                <Code2 size={14} />
                <span>TOOLKIT &amp; TECHNOLOGIES</span>
              </div>
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
                  className="rounded-full border border-white/10 bg-[#111424]/80 px-4 py-2 text-xs font-mono text-[#cbd5e1]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Categorized Tech Grid */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {techCategories.map((cat, idx) => (
              <Reveal key={cat.category} delay={idx * 0.1}>
                <div className="h-full rounded-2xl border border-white/[0.08] bg-[#0f111d]/70 p-6 backdrop-blur-md">
                  <h3 className="font-display text-base font-bold text-white pb-3 border-b border-white/[0.08] flex items-center justify-between">
                    <span>{cat.category}</span>
                    <span className="text-xs font-mono text-[#34d399]">{cat.items.length} skills</span>
                  </h3>

                  <div className="mt-4 space-y-2.5">
                    {cat.items.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between py-1 text-sm text-[#94a3b8]"
                      >
                        <span className="text-white/90">{item.name}</span>
                        <span className="text-[11px] font-mono text-[#64748b] bg-white/5 px-2 py-0.5 rounded">
                          {item.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= LIVE GITHUB REPOS ================= */}
      <section className="border-t border-white/[0.08] bg-[#090a12] px-6 py-24 md:px-12">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/[0.08]">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#34d399]">
                  <Github size={14} />
                  <span>OPEN SOURCE CONTRIBUTIONS</span>
                </div>
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
                  <Reveal key={repo.name} delay={i * 0.1}>
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex h-full flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#0f111d]/70 p-5 backdrop-blur-md hover:border-[#34d399]/40 hover:bg-[#15192c]/80 transition-all"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[#64748b] group-hover:text-white transition-colors">
                          <FolderGit2 size={16} />
                          <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <h4 className="mt-3 font-display font-bold text-white text-base truncate">
                          {repo.name}
                        </h4>
                        <p className="mt-2 text-xs text-[#94a3b8] line-clamp-2 leading-relaxed">
                          {repo.description || "Open source experiment and code shared on GitHub."}
                        </p>
                      </div>

                      <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/5 text-[11px] font-mono text-[#64748b]">
                        <span className="text-[#34d399]">{repo.language || "Code"}</span>
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
                  <Reveal key={item.name} delay={i * 0.1}>
                    <a
                      href="https://github.com/Subhan-Haider"
                      target="_blank"
                      rel="noreferrer"
                      className="group flex h-full flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#0f111d]/70 p-5 backdrop-blur-md hover:border-[#34d399]/40 transition-all"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[#64748b]">
                          <FolderGit2 size={16} />
                          <ArrowUpRight size={14} />
                        </div>
                        <h4 className="mt-3 font-display font-bold text-white text-base">
                          {item.name}
                        </h4>
                        <p className="mt-2 text-xs text-[#94a3b8] leading-relaxed">{item.desc}</p>
                      </div>
                      <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/5 text-[11px] font-mono text-[#64748b]">
                        <span className="text-[#34d399]">{item.lang}</span>
                        <span>Open Source</span>
                      </div>
                    </a>
                  </Reveal>
                ))}
          </div>
        </div>
      </section>

      {/* ================= JOURNEY TIMELINE ================= */}
      <section id="journey" className="border-t border-white/[0.08] bg-[#0c0e18] px-6 py-28 md:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#34d399]">
                <Zap size={14} />
                <span>EXPERIENCE &amp; GROWTH</span>
              </div>
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
              <Reveal key={node.title} delay={i * 0.1}>
                <div className="relative group">
                  {/* Node Dot */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#090a12] border-2 border-[#34d399] flex items-center justify-center group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(52,211,153,0.5)]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#34d399]" />
                  </div>

                  <div className="rounded-2xl border border-white/[0.08] bg-[#111424]/60 p-6 backdrop-blur-sm">
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
          <div className="relative rounded-3xl border border-white/15 bg-gradient-to-r from-[#171b33] via-[#0f111e] to-[#122320] p-8 sm:p-14 backdrop-blur-2xl shadow-2xl overflow-hidden">
            {/* Ambient corner glows */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#34d399]/15 blur-3xl rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#6366f1]/15 blur-3xl rounded-full pointer-events-none" />

            <div className="relative z-10 grid gap-10 lg:grid-cols-[1.3fr_0.7fr] items-center">
              <div>
                <GlowBadge variant="emerald">
                  <span>READY TO COLLABORATE</span>
                </GlowBadge>
                <h2 className="display-title mt-4 text-4xl sm:text-6xl font-extrabold text-white">
                  LET&apos;S BUILD <br />
                  <span className="gradient-text-mint">SOMETHING IMPACTFUL.</span>
                </h2>
                <p className="mt-5 text-base sm:text-lg text-[#94a3b8] max-w-xl leading-relaxed">
                  Whether you have an idea for an Android app, want to collaborate on open-source projects,
                  or simply want to connect, my inbox is always open.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href="/contact"
                    className="flex items-center gap-2 rounded-full bg-[#34d399] px-6 py-3.5 text-sm font-bold text-[#090a12] shadow-lg hover:bg-[#6ee7b7] hover:scale-105 transition-all"
                  >
                    <span>Get In Touch</span>
                    <ArrowUpRight size={16} />
                  </Link>

                  <Link
                    href="/resume"
                    className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-medium text-white hover:bg-white/10 transition-all"
                  >
                    <span>View Complete Resume</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Quick Contact Card */}
              <div className="rounded-2xl border border-white/10 bg-[#090a12]/80 p-6 backdrop-blur-xl">
                <div className="text-xs font-mono text-[#64748b] uppercase tracking-wider">Quick Info</div>
                <div className="mt-4 space-y-3 text-sm">
                  <div>
                    <span className="text-[#64748b] block text-xs">Role</span>
                    <span className="text-white font-medium">Student &amp; Software Developer</span>
                  </div>
                  <div>
                    <span className="text-[#64748b] block text-xs">Core Focus</span>
                    <span className="text-[#34d399] font-medium">Android (Kotlin/Compose) &amp; Web</span>
                  </div>
                  <div>
                    <span className="text-[#64748b] block text-xs">Profiles</span>
                    <div className="mt-1 flex gap-3 text-xs text-[#cbd5e1]">
                      <a
                        href="https://github.com/Subhan-Haider"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-[#34d399] underline flex items-center gap-1"
                      >
                        GitHub <ArrowUpRight size={11} />
                      </a>
                      <a
                        href="https://tester.subhan.tech/"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-[#34d399] underline flex items-center gap-1"
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

