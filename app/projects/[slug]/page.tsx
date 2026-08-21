import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Github,
  ExternalLink,
  CheckCircle2,
  Layers,
  Cpu,
  ShieldCheck,
  Zap,
  Sparkles,
  Smartphone,
  Globe,
  Code2,
} from "lucide-react";
import { Footer, Nav, GlowBadge } from "@/components/site";
import { getAllProjects, getProjectBySlug } from "@/lib/data-server";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const project = await getProjectBySlug(params.slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} — Subhan Haider`,
    description: project.summary,
  };
}

export default async function CaseStudy(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const slug = params.slug;
  const project = await getProjectBySlug(slug);
  if (!project) return notFound();

  const allProjects = await getAllProjects();
  const currentIndex = allProjects.findIndex((x) => x.slug === slug);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];
  const prevProject =
    allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length];

  return (
    <main className="relative min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] transition-colors duration-300 overflow-hidden">
      <Nav />

      {/* Case Study Hero */}
      <article className="relative pt-32 sm:pt-36 pb-20 sm:pb-24 px-4 sm:px-6 md:px-12 grid-pattern">
        {/* Glow Spheres */}
        <div className="absolute top-24 left-1/4 w-[600px] h-[350px] bg-[#6366f1]/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute top-48 right-1/4 w-[500px] h-[300px] bg-[#34d399]/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="mx-auto max-w-5xl">
          {/* Breadcrumb back link */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#34d399] hover:underline mb-8"
          >
            <ArrowLeft size={14} />
            <span>Back to Project Archive</span>
          </Link>

          {/* Type Badge & Year */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <GlowBadge
              variant={
                project.type === "Android"
                  ? "emerald"
                  : project.type === "Open Source"
                  ? "sky"
                  : "indigo"
              }
            >
              <span>{project.type.toUpperCase()} CASE STUDY</span>
            </GlowBadge>
            {project.year && (
              <span className="text-xs font-mono text-[#64748b]">
                • Released {project.year}
              </span>
            )}
          </div>

          <h1 className="display-title text-3xl sm:text-6xl lg:text-7xl font-extrabold text-[var(--text-primary)] break-words">
            {project.title}
          </h1>

          <p className="mt-5 sm:mt-6 text-base sm:text-2xl text-[var(--text-secondary)] font-light leading-relaxed">
            {project.tagline || project.summary}
          </p>

          {/* Action Links */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pb-12 border-b border-[var(--border-subtle)]">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-[#34d399] dark:text-[#090a12] dark:hover:bg-[#6ee7b7] px-6 py-3.5 text-xs font-bold shadow-lg hover:scale-105 active:scale-98 transition-all text-center min-h-[44px]"
              >
                <span>Live Project Hub</span>
                <ExternalLink size={14} />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-full border border-[var(--border-medium)] bg-[var(--bg-surface)] px-6 py-3.5 text-xs font-medium text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] active:scale-98 transition-all text-center min-h-[44px] shadow-sm"
              >
                <Github size={15} />
                <span>Source Repository</span>
              </a>
            )}
          </div>

          {/* Key Metrics Grid */}
          {project.metrics && (
            <div className="mt-10 sm:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {project.metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 sm:p-5 text-center backdrop-blur-md shadow-sm dark:shadow-none"
                >
                  <div className="text-xs font-mono text-[#64748b]">{m.label}</div>
                  <div className="font-display text-base sm:text-xl font-bold text-[var(--text-primary)] mt-1">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Interface Visual Showcase Banner */}
          <div className="mt-10 sm:mt-12 rounded-3xl border border-[var(--border-subtle)] bg-gradient-to-br from-emerald-50/40 via-[var(--bg-surface)] to-indigo-50/40 dark:from-[#161a30] dark:via-[#0f111d] dark:to-[#0c1815] p-4 sm:p-8 sm:p-10 shadow-lg dark:shadow-2xl overflow-hidden relative">
            <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-[var(--border-subtle)] text-xs font-mono text-[var(--text-muted)] gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
                <span className="ml-2 text-[var(--text-primary)] font-mono text-[11px] truncate font-medium">{project.slug}.spec</span>
              </div>
              <span className="text-emerald-600 dark:text-[#34d399] font-bold text-[10px] sm:text-xs">SCREENSHOT &amp; ARCHITECTURE</span>
            </div>

            <div className="py-6 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
              <div>
                <span className="text-xs font-mono text-emerald-600 dark:text-[#34d399] uppercase tracking-wider font-semibold">
                  Product Overview
                </span>
                <p className="mt-3 text-base sm:text-lg text-[var(--text-primary)] leading-relaxed font-normal">
                  {project.summary}
                </p>

                <div className="mt-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] p-5 space-y-3 font-mono text-xs shadow-sm">
                  <div className="flex justify-between items-center text-emerald-600 dark:text-[#34d399] font-bold">
                    <span>BUILD STATUS</span>
                    <span>VERIFIED PASS</span>
                  </div>
                  <div className="text-[var(--text-primary)] font-medium">&gt; Target: {project.type} Platform</div>
                  <div className="text-[var(--text-primary)] font-medium">&gt; Architecture: Clean Architecture + MVVM</div>
                  <div className="text-[var(--text-muted)]">&gt; Local Security: 100% On-Device Persistence</div>
                </div>
              </div>

              {/* Real Project Screenshot / Mockup Preview */}
              <div className="flex justify-center">
                {project.slug === "daily-finance" ? (
                  <div className="relative w-full max-w-[260px] aspect-[9/18] rounded-[2rem] border-[6px] border-slate-300 dark:border-[#1e2238] bg-[var(--bg-surface-elevated)] shadow-2xl overflow-hidden group">
                    <img
                      src="/images/daily-finance-dashboard.jpg"
                      alt="Daily Finance Dashboard Screenshot"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                ) : project.slug === "app-tester" ? (
                  <div className="relative w-full max-w-[260px] aspect-[9/18] rounded-[2rem] border-[6px] border-slate-300 dark:border-[#1e2238] bg-[var(--bg-surface-elevated)] shadow-2xl overflow-hidden group">
                    <img
                      src="/images/app-tester-hub.jpg"
                      alt="App Tester Hub Screenshot"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                ) : (
                  <div className="w-full rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] p-6 font-mono text-xs space-y-2 shadow-sm">
                    <div className="text-emerald-600 dark:text-[#34d399] font-bold">$ git status --short</div>
                    <div className="text-[var(--text-primary)] font-medium">&gt; 100% Free &amp; Open Source</div>
                    <div className="text-[var(--text-muted)]">&gt; Modular architecture patterns</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Deep Dive: Idea & Problem */}
          {project.idea && (
            <section className="mt-16 pt-12 border-t border-[var(--border-subtle)]">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-[#34d399] mb-3 font-semibold">
                <Sparkles size={14} />
                <span>THE INSPIRATION</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                Why I Built This
              </h2>
              <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
                {project.idea}
              </p>
            </section>
          )}

          {/* Deep Dive: Challenge & Solution */}
          {project.challenge && project.solution && (
            <section className="mt-16 pt-12 border-t border-[var(--border-subtle)] grid gap-8 sm:grid-cols-2">
              <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 backdrop-blur-md shadow-sm">
                <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-600 dark:text-[#ef4444] flex items-center justify-center mb-4">
                  <Cpu size={18} />
                </div>
                <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                  Technical Challenge
                </h3>
                <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                  {project.challenge}
                </p>
              </div>

              <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 backdrop-blur-md shadow-sm">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-[#34d399] flex items-center justify-center mb-4">
                  <CheckCircle2 size={18} />
                </div>
                <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                  Engineering Solution
                </h3>
                <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </section>
          )}

          {/* Features Breakdown */}
          {project.features && (
            <section className="mt-16 pt-12 border-t border-[var(--border-subtle)]">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-[#34d399] mb-3 font-semibold">
                <Layers size={14} />
                <span>CORE CAPABILITIES</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                Key Features &amp; Modules
              </h2>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {project.features.map((feature, idx) => (
                  <div
                    key={feature}
                    className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 backdrop-blur-md hover:border-[var(--border-active)] transition-all shadow-sm"
                  >
                    <span className="font-mono text-xs text-emerald-600 dark:text-[#34d399] font-bold">
                      0{idx + 1}
                    </span>
                    <p className="mt-3 text-sm text-[var(--text-primary)] font-medium leading-relaxed">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Technology Stack Grid */}
          <section className="mt-16 pt-12 border-t border-[var(--border-subtle)]">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-[#34d399] mb-3 font-semibold">
              <Code2 size={14} />
              <span>STACK &amp; LIBRARIES</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
              Technologies Used
            </h2>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-[var(--border-medium)] bg-[var(--bg-surface)] px-4 py-2 text-xs font-mono text-[var(--text-primary)] hover:border-[var(--border-active)] transition-colors shadow-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Navigation between Projects */}
          <nav className="mt-20 pt-12 border-t border-[var(--border-subtle)] grid gap-4 sm:grid-cols-2">
            <Link
              href={`/projects/${prevProject.slug}`}
              className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 backdrop-blur-md hover:border-[var(--border-active)] hover:bg-[var(--bg-surface-elevated)] transition-all group shadow-sm"
            >
              <span className="text-xs font-mono text-[var(--text-muted)]">← PREVIOUS PROJECT</span>
              <div className="font-display text-lg font-bold text-[var(--text-primary)] mt-1 group-hover:text-emerald-600 dark:group-hover:text-[#34d399] transition-colors">
                {prevProject.title}
              </div>
            </Link>

            <Link
              href={`/projects/${nextProject.slug}`}
              className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 backdrop-blur-md hover:border-[var(--border-active)] hover:bg-[var(--bg-surface-elevated)] transition-all text-right group shadow-sm"
            >
              <span className="text-xs font-mono text-[var(--text-muted)]">NEXT PROJECT →</span>
              <div className="font-display text-lg font-bold text-[var(--text-primary)] mt-1 group-hover:text-emerald-600 dark:group-hover:text-[#34d399] transition-colors">
                {nextProject.title}
              </div>
            </Link>
          </nav>
        </div>
      </article>

      <Footer />
    </main>
  );
}

