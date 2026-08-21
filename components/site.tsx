"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, Menu, X, ArrowUp, Sparkles } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Work", href: "/#work" },
  { name: "Android", href: "/#android" },
  { name: "Stack", href: "/#stack" },
  { name: "Journey", href: "/#journey" },
  { name: "Resume", href: "/resume" },
  { name: "Contact", href: "/contact" },
];

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-50 h-[2.5px] origin-left bg-gradient-to-r from-[#6366f1] via-[#38bdf8] to-[#34d399] shadow-[0_0_12px_rgba(52,211,153,0.6)]"
      style={{ scaleX }}
    />
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <ScrollProgress />
      <header className="fixed z-40 top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-6xl transition-all duration-300">
        <div
          className={`flex h-16 items-center justify-between rounded-full px-5 md:px-7 transition-all duration-300 ${
            scrolled
              ? "bg-[#090a12]/85 backdrop-blur-xl border border-white/10 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.8)]"
              : "bg-[#0f111d]/60 backdrop-blur-md border border-white/5"
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 font-display text-lg font-bold tracking-tight text-white group"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#6366f1] to-[#34d399] p-[1px] flex items-center justify-center">
              <div className="w-full h-full bg-[#090a12] rounded-full flex items-center justify-center text-xs font-mono font-bold text-[#34d399] group-hover:scale-110 transition-transform">
                S
              </div>
            </div>
            <span className="tracking-tighter">SUBHAN<span className="text-[#34d399]">.</span></span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] px-3 py-1.5 rounded-full border border-white/5 text-xs text-[#94a3b8]">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-3.5 py-1.5 rounded-full transition-all duration-200 hover:text-white hover:bg-white/[0.08]"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-[#34d399]/10 border border-[#34d399]/20 text-[11px] font-mono text-[#34d399]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-ping" />
              <span>Building Android & Web</span>
            </div>

            <Link
              href="/contact"
              className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-white via-[#f1f5f9] to-[#e2e8f0] px-4 py-2 text-xs font-bold text-[#090a12] shadow-sm hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-[1.02] transition-all"
            >
              Let&apos;s Connect <ArrowUpRight size={13} className="text-[#090a12]" />
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
            className="flex md:hidden w-10 h-10 rounded-full items-center justify-center bg-white/5 border border-white/10 text-white"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="mt-2.5 rounded-3xl border border-white/10 bg-[#0f111d]/95 p-5 backdrop-blur-2xl shadow-2xl md:hidden"
            >
              <div className="flex items-center gap-2 pb-4 mb-3 border-b border-white/10 text-xs font-mono text-[#34d399]">
                <span className="w-2 h-2 rounded-full bg-[#34d399]" />
                <span>Available for projects & experiments</span>
              </div>
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-2.5 px-3 rounded-xl text-sm text-[#cbd5e1] hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight size={14} className="text-[#64748b]" />
                  </Link>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-white/10 flex gap-2">
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#34d399] font-bold text-xs text-[#090a12]"
                >
                  Contact Subhan <ArrowUpRight size={14} />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

export function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative border-t border-white/[0.08] bg-[#07080e] px-6 pt-24 pb-12 md:px-12 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#6366f1]/5 blur-3xl pointer-events-none rounded-full" />

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] items-start pb-16 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#34d399]">
              <Sparkles size={14} />
              <span>CRAFTED WITH PRECISION</span>
            </div>
            <div className="font-display text-4xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-white mt-4">
              SUBHAN<span className="text-[#34d399]">.</span>
            </div>
            <p className="mt-6 max-w-md text-base leading-relaxed text-[#94a3b8]">
              High school student, Android developer, and builder passionate about creating clean,
              functional software and learning through hands-on development.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <p className="font-mono text-xs text-[#64748b] uppercase tracking-wider mb-4">Navigation</p>
              <ul className="space-y-2.5 text-sm text-[#94a3b8]">
                <li><Link href="/" className="hover:text-[#34d399] transition-colors">Home</Link></li>
                <li><Link href="/projects" className="hover:text-[#34d399] transition-colors">All Projects</Link></li>
                <li><Link href="/resume" className="hover:text-[#34d399] transition-colors">Resume</Link></li>
                <li><Link href="/contact" className="hover:text-[#34d399] transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <p className="font-mono text-xs text-[#64748b] uppercase tracking-wider mb-4">Projects</p>
              <ul className="space-y-2.5 text-sm text-[#94a3b8]">
                <li><Link href="/projects/daily-finance" className="hover:text-[#34d399] transition-colors">Daily Finance</Link></li>
                <li><Link href="/projects/app-tester" className="hover:text-[#34d399] transition-colors">App Tester</Link></li>
                <li><Link href="/projects/open-source" className="hover:text-[#34d399] transition-colors">Open Source</Link></li>
              </ul>
            </div>

            <div>
              <p className="font-mono text-xs text-[#64748b] uppercase tracking-wider mb-4">Connect</p>
              <ul className="space-y-2.5 text-sm text-[#94a3b8]">
                <li>
                  <a
                    href="https://github.com/Subhan-Haider"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 hover:text-[#34d399] transition-colors"
                  >
                    GitHub <ArrowUpRight size={12} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://tester.subhan.tech/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 hover:text-[#34d399] transition-colors"
                  >
                    Tester Portal <ArrowUpRight size={12} />
                  </a>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#34d399] transition-colors">
                    Send Message
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between text-xs text-[#64748b]">
          <div className="flex items-center gap-3">
            <span>© {new Date().getFullYear()} Subhan Haider. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Built with Next.js, Tailwind CSS &amp; Compose ideas</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Subhan-Haider"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-[#94a3b8] hover:text-white transition-colors"
            >
              <Github size={15} />
              <span>Subhan-Haider</span>
            </a>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#cbd5e1] hover:text-white hover:bg-white/10 transition-all"
            >
              <span>Back to top</span>
              <ArrowUp size={12} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function GlowBadge({
  children,
  variant = "emerald",
}: {
  children: React.ReactNode;
  variant?: "emerald" | "indigo" | "sky";
}) {
  const styles = {
    emerald: "bg-[#34d399]/10 text-[#34d399] border-[#34d399]/25",
    indigo: "bg-[#6366f1]/10 text-[#818cf8] border-[#6366f1]/25",
    sky: "bg-[#38bdf8]/10 text-[#38bdf8] border-[#38bdf8]/25",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-mono font-medium ${styles[variant]}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}

