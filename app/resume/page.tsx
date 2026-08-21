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
    <main className="relative min-h-screen bg-[#090a12] text-[#f8fafc] overflow-hidden">
      <Nav />

      <article className="relative pt-36 pb-24 px-6 md:px-12 grid-pattern">
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
          <header className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#15192c] via-[#0f111d] to-[#0c1815] p-6 sm:p-12 backdrop-blur-xl shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <GlowBadge variant="emerald">
                <span>CURRICULUM VITAE</span>
              </GlowBadge>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
                <a
                  href="/resume-subhan-haider.pdf"
                  download
                  className="flex items-center justify-center gap-2 rounded-full bg-[#34d399] px-5 py-2.5 text-xs font-bold text-[#090a12] shadow-md hover:scale-105 transition-all text-center"
                >
                  <Download size={14} />
                  <span>Download PDF</span>
                </a>

                <a
                  href="/resume-subhan-haider.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-medium text-white hover:bg-white/10 transition-all text-center"
                >
                  <span>Open PDF</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>

            <div className="mt-8">
              <h1 className="display-title text-3xl sm:text-6xl font-black text-white">
                SUBHAN HAIDER<span className="text-[#34d399]">.</span>
              </h1>
              <p className="mt-3 text-base sm:text-xl text-[#94a3b8]">
                Student • Android Developer • Web Builder
              </p>
            </div>

            {/* Quick Contact Bar */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-4 sm:gap-6 text-xs font-mono text-[#cbd5e1]">
              <a
                href="https://github.com/Subhan-Haider"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-[#34d399] transition-colors"
              >
                <Github size={13} />
                <span>github.com/Subhan-Haider</span>
              </a>

              <a
                href="https://tester.subhan.tech/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-[#34d399] transition-colors"
              >
                <Smartphone size={13} />
                <span>tester.subhan.tech</span>
              </a>

              <Link
                href="/contact"
                className="flex items-center gap-1.5 hover:text-[#34d399] transition-colors"
              >
                <Mail size={13} />
                <span>subhan.tech/contact</span>
              </Link>
            </div>
          </header>

          {/* Section: Profile Summary */}
          <section className="mt-12 rounded-2xl border border-white/[0.08] bg-[#0f111d]/80 p-8 backdrop-blur-xl">
            <h2 className="font-display text-xl font-bold text-white flex items-center gap-2 pb-4 border-b border-white/[0.08]">
              <Sparkles size={18} className="text-[#34d399]" />
              <span>Professional Summary</span>
            </h2>
            <p className="mt-5 text-base sm:text-lg text-[#94a3b8] leading-relaxed">
              Enthusiastic high school student and self-driven software developer specializing in
              native Android applications with Kotlin &amp; Jetpack Compose, as well as modern web
              applications with Next.js and TypeScript. Dedicated to learning through building
              production-grade software with a strong focus on clean architecture, performance, and user privacy.
            </p>
          </section>

          {/* Section: Technical Skillset Matrix */}
          <section className="mt-8 rounded-2xl border border-white/[0.08] bg-[#0f111d]/80 p-8 backdrop-blur-xl">
            <h2 className="font-display text-xl font-bold text-white flex items-center gap-2 pb-4 border-b border-white/[0.08]">
              <FileText size={18} className="text-[#34d399]" />
              <span>Technical Skills</span>
            </h2>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {techCategories.map((cat) => (
                <div
                  key={cat.category}
                  className="rounded-xl border border-white/5 bg-white/[0.02] p-5"
                >
                  <h3 className="text-sm font-bold text-white font-display mb-3">
                    {cat.category}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.items.map((item) => (
                      <span
                        key={item.name}
                        className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-mono text-[#cbd5e1]"
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
          <section className="mt-8 rounded-2xl border border-white/[0.08] bg-[#0f111d]/80 p-8 backdrop-blur-xl">
            <h2 className="font-display text-xl font-bold text-white flex items-center gap-2 pb-4 border-b border-white/[0.08]">
              <Smartphone size={18} className="text-[#34d399]" />
              <span>Featured Engineering Projects</span>
            </h2>

            <div className="mt-6 space-y-6">
              {projects.map((proj) => (
                <div
                  key={proj.slug}
                  className="rounded-xl border border-white/5 bg-white/[0.02] p-6 hover:border-white/10 transition-colors"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-display text-lg font-bold text-white">
                      {proj.title}
                    </h3>
                    <span className="text-xs font-mono text-[#34d399] font-bold">
                      {proj.type}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-[#94a3b8] leading-relaxed">
                    {proj.summary}
                  </p>

                  {proj.features && (
                    <ul className="mt-4 space-y-1 text-xs text-[#cbd5e1]">
                      {proj.features.slice(0, 3).map((f) => (
                        <li key={f} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#34d399]" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/5">
                    <div className="flex flex-wrap gap-1.5">
                      {proj.stack.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] font-mono text-[#64748b]"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/projects/${proj.slug}`}
                      className="text-xs font-bold text-[#34d399] hover:underline flex items-center gap-1"
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
          <section className="mt-8 rounded-2xl border border-white/[0.08] bg-[#0f111d]/80 p-8 backdrop-blur-xl">
            <h2 className="font-display text-xl font-bold text-white flex items-center gap-2 pb-4 border-b border-white/[0.08]">
              <GraduationCap size={18} className="text-[#34d399]" />
              <span>Education</span>
            </h2>

            <div className="mt-6 rounded-xl border border-white/5 bg-white/[0.02] p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="font-display text-base font-bold text-white">
                    High School Diploma (In Progress)
                  </h3>
                  <p className="text-xs text-[#94a3b8] mt-0.5">
                    Focus: Computer Science, Mathematics, Software Engineering
                  </p>
                </div>
                <span className="text-xs font-mono text-[#34d399] bg-[#34d399]/10 border border-[#34d399]/20 px-3 py-1 rounded-full">
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

