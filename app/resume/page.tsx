import Link from "next/link";
import {
  Download,
  ArrowLeft,
  ExternalLink,
  Github,
  Mail,
  Smartphone,
  Globe,
  Award,
  GraduationCap,
  Sparkles,
  FileText,
} from "lucide-react";
import { Nav, Footer, GlowBadge } from "@/components/site";
import { techCategories, projects } from "@/lib/data";

export const metadata = {
  title: "Resume — Subhan Haider",
  description:
    "Curriculum vitae and technical overview of Subhan Haider (Android Developer, Student, Builder).",
};

export default function ResumePage() {
  return (
    <main className="relative min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] transition-colors duration-300 overflow-hidden">
      <Nav />

      <article className="relative pt-32 sm:pt-36 pb-20 sm:pb-24 px-4 sm:px-6 md:px-12 grid-pattern">
        {/* Glow Sphere */}
        <div className="absolute top-28 left-1/3 w-[600px] h-[350px] bg-[#6366f1]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="mx-auto max-w-4xl">
          {/* Back home link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#34d399] hover:underline mb-8"
          >
            <ArrowLeft size={14} />
            <span>Back to Home</span>
          </Link>

          {/* Resume Header Card */}
          <header className="rounded-3xl border border-[var(--border-subtle)] bg-gradient-to-br from-emerald-50/50 via-[var(--bg-surface)] to-indigo-50/50 dark:from-[#15192c] dark:via-[#0f111d] dark:to-[#0c1815] p-5 sm:p-8 sm:p-12 backdrop-blur-xl shadow-lg dark:shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <GlowBadge variant="emerald">
                <span>CURRICULUM VITAE</span>
              </GlowBadge>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
                <a
                  href="/resume-subhan-haider.pdf"
                  download
                  className="flex items-center justify-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-[#34d399] dark:text-[#090a12] dark:hover:bg-[#6ee7b7] px-5 py-3 text-xs font-bold shadow-md hover:scale-105 active:scale-98 transition-all text-center min-h-[42px]"
                >
                  <Download size={14} />
                  <span>Download PDF</span>
                </a>

                <a
                  href="/resume-subhan-haider.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full border border-[var(--border-medium)] bg-[var(--bg-surface)] px-4 py-3 text-xs font-medium text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] active:scale-98 transition-all text-center min-h-[42px] shadow-sm"
                >
                  <span>Open PDF</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>

            <div className="mt-6 sm:mt-8">
              <h1 className="display-title text-3xl sm:text-6xl font-black text-[var(--text-primary)] break-words">
                SUBHAN HAIDER<span className="text-emerald-600 dark:text-[#34d399]">.</span>
              </h1>
              <p className="mt-2.5 sm:mt-3 text-base sm:text-xl text-[var(--text-secondary)]">
                Student • Android Developer • Web Builder
              </p>
            </div>

            {/* Quick Contact Bar */}
            <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-[var(--border-subtle)] flex flex-wrap gap-3.5 sm:gap-6 text-xs font-mono text-[var(--text-secondary)]">
              <a
                href="https://github.com/Subhan-Haider"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-emerald-600 dark:hover:text-[#34d399] transition-colors"
              >
                <Github size={13} />
                <span>github.com/Subhan-Haider</span>
              </a>

              <a
                href="https://tester.subhan.tech/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-emerald-600 dark:hover:text-[#34d399] transition-colors"
              >
                <Smartphone size={13} />
                <span>tester.subhan.tech</span>
              </a>

              <Link
                href="/contact"
                className="flex items-center gap-1.5 hover:text-emerald-600 dark:hover:text-[#34d399] transition-colors"
              >
                <Mail size={13} />
                <span>subhan.tech/contact</span>
              </Link>
            </div>
          </header>

          {/* Section: Profile Summary */}
          <section className="mt-8 sm:mt-12 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 sm:p-8 backdrop-blur-xl shadow-sm">
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)] flex items-center gap-2 pb-4 border-b border-[var(--border-subtle)]">
              <Sparkles size={18} className="text-emerald-600 dark:text-[#34d399]" />
              <span>Professional Summary</span>
            </h2>
            <p className="mt-5 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
              Enthusiastic high school student and self-driven software developer specializing in
              native Android applications with Kotlin &amp; Jetpack Compose, as well as modern web
              applications with Next.js and TypeScript. Dedicated to learning through building
              production-grade software with a strong focus on clean architecture, performance, and user privacy.
            </p>
          </section>

          {/* Section: Technical Skillset Matrix */}
          <section className="mt-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8 backdrop-blur-xl shadow-sm">
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)] flex items-center gap-2 pb-4 border-b border-[var(--border-subtle)]">
              <FileText size={18} className="text-emerald-600 dark:text-[#34d399]" />
              <span>Technical Skills</span>
            </h2>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {techCategories.map((cat) => (
                <div
                  key={cat.category}
                  className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] p-5"
                >
                  <h3 className="text-sm font-bold text-[var(--text-primary)] font-display mb-3 flex items-center justify-between">
                    <span>{cat.category}</span>
                    <span className="text-xs font-mono text-emerald-600 dark:text-[#34d399] font-medium">{cat.items.length} skills</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((item) => (
                      <span
                        key={item.name}
                        className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-2.5 py-1 text-xs font-mono text-[var(--text-primary)] shadow-sm"
                      >
                        {item.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Featured Projects */}
          <section className="mt-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8 backdrop-blur-xl shadow-sm">
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)] flex items-center gap-2 pb-4 border-b border-[var(--border-subtle)]">
              <Smartphone size={18} className="text-emerald-600 dark:text-[#34d399]" />
              <span>Featured Engineering Projects</span>
            </h2>

            <div className="mt-6 space-y-6">
              {projects.map((proj) => (
                <div
                  key={proj.slug}
                  className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] p-6 hover:border-[var(--border-active)] transition-colors shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                      {proj.title}
                    </h3>
                    <span className="text-xs font-mono text-emerald-600 dark:text-[#34d399] font-bold">
                      {proj.type}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                    {proj.summary}
                  </p>

                  {proj.features && (
                    <ul className="mt-4 space-y-1 text-xs text-[var(--text-secondary)]">
                      {proj.features.slice(0, 3).map((f) => (
                        <li key={f} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[var(--border-subtle)]">
                    <div className="flex flex-wrap gap-1.5">
                      {proj.stack.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] font-mono text-[var(--text-muted)]"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/projects/${proj.slug}`}
                      className="text-xs font-bold text-emerald-600 dark:text-[#34d399] hover:underline flex items-center gap-1"
                    >
                      <span>View Case Study</span>
                      <ExternalLink size={12} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Education */}
          <section className="mt-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8 backdrop-blur-xl shadow-sm">
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)] flex items-center gap-2 pb-4 border-b border-[var(--border-subtle)]">
              <GraduationCap size={18} className="text-emerald-600 dark:text-[#34d399]" />
              <span>Education</span>
            </h2>

            <div className="mt-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="font-display text-base font-bold text-[var(--text-primary)]">
                    High School Diploma (In Progress)
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                    Focus: Computer Science, Mathematics, Software Engineering
                  </p>
                </div>
                <span className="text-xs font-mono text-emerald-700 dark:text-[#34d399] bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full font-medium">
                  Current Student
                </span>
              </div>
            </div>
          </section>
        </div>
      </article>

      <Footer />
    </main>
  );
}

