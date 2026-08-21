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
import { projects } from "@/lib/data";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((x) => x.slug === slug);
  if (!project) return notFound();

  const currentIndex = projects.findIndex((x) => x.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const prevProject =
    projects[(currentIndex - 1 + projects.length) % projects.length];

  return (
    <main className="relative min-h-screen bg-[#090a12] text-[#f8fafc] overflow-hidden">
      <Nav />

      {/* Case Study Hero */}
      <article className="relative pt-36 pb-24 px-6 md:px-12 grid-pattern">
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

          <h1 className="display-title text-3xl sm:text-6xl lg:text-7xl font-extrabold text-white">
            {project.title}
          </h1>

          <p className="mt-6 text-lg sm:text-2xl text-[#cbd5e1] font-light leading-relaxed">
            {project.tagline || project.summary}
          </p>

          {/* Action Links */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pb-12 border-b border-white/[0.08]">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-[#34d399] px-6 py-3 text-xs font-bold text-[#090a12] shadow-lg hover:scale-105 transition-all text-center"
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
                className="flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-xs font-medium text-white hover:bg-white/10 transition-all text-center"
              >
                <Github size={15} />
                <span>Source Repository</span>
              </a>
            )}
          </div>

          {/* Key Metrics Grid */}
          {project.metrics && (
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {project.metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-2xl border border-white/[0.08] bg-[#0f111d]/80 p-5 text-center backdrop-blur-md"
                >
                  <div className="text-xs font-mono text-[#64748b]">{m.label}</div>
                  <div className="font-display text-lg sm:text-xl font-bold text-white mt-1">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Interface Visual Showcase Banner */}
          <div className="mt-12 rounded-3xl border border-white/10 bg-gradient-to-br from-[#161a30] via-[#0f111d] to-[#0c1815] p-6 sm:p-10 shadow-2xl overflow-hidden relative">
            <div className="flex items-center justify-between pb-6 border-b border-white/10 text-xs font-mono text-[#64748b]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
                <span className="ml-2 text-white/80">{project.slug}.spec</span>
              </div>
              <span className="text-[#34d399] font-bold">SCREENSHOT &amp; ARCHITECTURE</span>
            </div>

            <div className="py-6 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
              <div>
                <span className="text-xs font-mono text-[#34d399] uppercase tracking-wider">
                  Product Overview
                </span>
                <p className="mt-3 text-base sm:text-lg text-[#cbd5e1] leading-relaxed">
                  {project.summary}
                </p>

                <div className="mt-6 rounded-2xl border border-white/10 bg-[#090a12]/80 p-5 space-y-3 font-mono text-xs text-[#94a3b8]">
                  <div className="flex justify-between items-center text-[#34d399]">
                    <span>BUILD STATUS</span>
                    <span>VERIFIED PASS</span>
                  </div>
                  <div className="text-white/80">&gt; Target: {project.type} Platform</div>
                  <div className="text-white/80">&gt; Architecture: Clean Architecture + MVVM</div>
                  <div className="text-[#64748b]">&gt; Local Security: 100% On-Device Persistence</div>
                </div>
              </div>

              {/* Real Project Screenshot / Mockup Preview */}
              <div className="flex justify-center">
                {project.slug === "daily-finance" ? (
                  <div className="relative w-full max-w-[260px] aspect-[9/18] rounded-[2rem] border-[6px] border-[#1e2238] bg-[#07080e] shadow-2xl overflow-hidden group">
                    <img
                      src="/images/daily-finance-dashboard.jpg"
                      alt="Daily Finance Dashboard Screenshot"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                ) : project.slug === "app-tester" ? (
                  <div className="relative w-full max-w-[260px] aspect-[9/18] rounded-[2rem] border-[6px] border-[#1e2238] bg-[#07080e] shadow-2xl overflow-hidden group">
                    <img
                      src="/images/app-tester-hub.jpg"
                      alt="App Tester Hub Screenshot"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                ) : (
                  <div className="w-full rounded-2xl border border-white/10 bg-[#090a12]/90 p-6 font-mono text-xs text-[#94a3b8] space-y-2">
                    <div className="text-[#34d399]">$ git status --short</div>
                    <div className="text-white">&gt; 100% Free &amp; Open Source</div>
                    <div className="text-[#64748b]">&gt; Modular architecture patterns</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Deep Dive: Idea & Problem */}
          {project.idea && (
            <section className="mt-16 pt-12 border-t border-white/[0.08]">
              <div className="flex items-center gap-2 text-xs font-mono text-[#34d399] mb-3">
                <Sparkles size={14} />
                <span>THE INSPIRATION</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                Why I Built This
              </h2>
              <p className="mt-4 text-base sm:text-lg text-[#94a3b8] leading-relaxed">
                {project.idea}
              </p>
            </section>
          )}

          {/* Deep Dive: Challenge & Solution */}
          {project.challenge && project.solution && (
            <section className="mt-16 pt-12 border-t border-white/[0.08] grid gap-8 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/[0.08] bg-[#111424]/60 p-6 backdrop-blur-md">
                <div className="w-9 h-9 rounded-xl bg-[#ef4444]/10 text-[#ef4444] flex items-center justify-center mb-4">
                  <Cpu size={18} />
                </div>
                <h3 className="font-display text-lg font-bold text-white">
                  Technical Challenge
                </h3>
                <p className="mt-3 text-sm text-[#94a3b8] leading-relaxed">
                  {project.challenge}
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-[#111424]/60 p-6 backdrop-blur-md">
                <div className="w-9 h-9 rounded-xl bg-[#34d399]/10 text-[#34d399] flex items-center justify-center mb-4">
                  <CheckCircle2 size={18} />
                </div>
                <h3 className="font-display text-lg font-bold text-white">
                  Engineering Solution
                </h3>
                <p className="mt-3 text-sm text-[#94a3b8] leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </section>
          )}

          {/* Features Breakdown */}
          {project.features && (
            <section className="mt-16 pt-12 border-t border-white/[0.08]">
              <div className="flex items-center gap-2 text-xs font-mono text-[#34d399] mb-3">
                <Layers size={14} />
                <span>CORE CAPABILITIES</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                Key Features &amp; Modules
              </h2>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {project.features.map((feature, idx) => (
                  <div
                    key={feature}
                    className="rounded-2xl border border-white/[0.08] bg-[#0f111d]/75 p-5 backdrop-blur-md hover:border-[#34d399]/30 transition-all"
                  >
                    <span className="font-mono text-xs text-[#34d399] font-bold">
                      0{idx + 1}
                    </span>
                    <p className="mt-3 text-sm text-[#cbd5e1] font-medium leading-relaxed">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Technology Stack Grid */}
          <section className="mt-16 pt-12 border-t border-white/[0.08]">
            <div className="flex items-center gap-2 text-xs font-mono text-[#34d399] mb-3">
              <Code2 size={14} />
              <span>STACK &amp; LIBRARIES</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Technologies Used
            </h2>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-mono text-white"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Navigation between Projects */}
          <nav className="mt-20 pt-12 border-t border-white/[0.08] grid gap-4 sm:grid-cols-2">
            <Link
              href={`/projects/${prevProject.slug}`}
              className="rounded-2xl border border-white/[0.08] bg-[#0f111d]/70 p-6 backdrop-blur-md hover:border-white/20 transition-all group"
            >
              <span className="text-xs font-mono text-[#64748b]">← PREVIOUS PROJECT</span>
              <div className="font-display text-lg font-bold text-white mt-1 group-hover:text-[#34d399] transition-colors">
                {prevProject.title}
              </div>
            </Link>

            <Link
              href={`/projects/${nextProject.slug}`}
              className="rounded-2xl border border-white/[0.08] bg-[#0f111d]/70 p-6 backdrop-blur-md hover:border-white/20 transition-all text-right group"
            >
              <span className="text-xs font-mono text-[#64748b]">NEXT PROJECT →</span>
              <div className="font-display text-lg font-bold text-white mt-1 group-hover:text-[#34d399] transition-colors">
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

