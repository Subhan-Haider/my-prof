"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, Menu, X, ArrowUp, Sparkles, Mail } from "lucide-react";

const socials = [
  { label: "Portfolio", href: "https://subhan.tech", color: "#8A2BE2", icon: "portfolio" },
  { label: "GitHub", href: "https://github.com/Subhan-Haider", color: "#ffffff", icon: "github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/subhan-haider", color: "#0A66C2", icon: "linkedin" },
  { label: "Discord", href: "https://discordapp.com/users/subhan_haid", color: "#5865F2", icon: "discord" },
  { label: "Discord Server", href: "https://discord.gg/MmRfqXqvC2", color: "#5865F2", icon: "discord" },
  { label: "Instagram", href: "https://www.instagram.com/subhan_haid", color: "#E4405F", icon: "instagram" },
  { label: "TikTok", href: "https://www.tiktok.com/@s.subhan.haider", color: "#ffffff", icon: "tiktok" },
  { label: "X / Twitter", href: "https://x.com/Subhan_haide", color: "#ffffff", icon: "x" },
  { label: "YouTube", href: "https://www.youtube.com/@ImgConvertPro", color: "#FF0000", icon: "youtube" },
  { label: "PayPal", href: "https://paypal.me/Subhanhaide", color: "#00457C", icon: "paypal" },
  { label: "Email", href: "mailto:contact@subhan.tech", color: "#34d399", icon: "email" },
];

function SocialIcon({ icon, size = 18 }: { icon: string; size?: number }) {
  if (icon === "github") return <Github size={size} />;
  if (icon === "email") return <Mail size={size} />;
  if (icon === "portfolio") return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
  );
  if (icon === "linkedin") return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>
  );
  if (icon === "discord") return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z" /></svg>
  );
  if (icon === "instagram") return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
  );
  if (icon === "tiktok") return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.22 8.22 0 004.81 1.55V6.79a4.85 4.85 0 01-1.04-.1z" /></svg>
  );
  if (icon === "x") return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
  );
  if (icon === "youtube") return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
  );
  if (icon === "paypal") return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M7.076 21.337H2.47a.641.641 0 01-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 00-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 00-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 00.554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 01.923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z" /></svg>
  );
  return null;
}

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
          className={`flex h-16 items-center justify-between rounded-full px-5 md:px-7 transition-all duration-300 ${scrolled
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
                <li><a href="https://github.com/Subhan-Haider" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-[#34d399] transition-colors">GitHub <ArrowUpRight size={12} /></a></li>
                <li><a href="https://www.linkedin.com/in/subhan-haider" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-[#34d399] transition-colors">LinkedIn <ArrowUpRight size={12} /></a></li>
                <li><a href="https://discord.gg/MmRfqXqvC2" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-[#34d399] transition-colors">Discord Server <ArrowUpRight size={12} /></a></li>
                <li><a href="https://www.instagram.com/subhan_haid" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-[#34d399] transition-colors">Instagram <ArrowUpRight size={12} /></a></li>
                <li><Link href="/contact" className="hover:text-[#34d399] transition-colors">Send Message</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Social Links Row */}
        <div className="mt-10 pt-8 border-t border-white/[0.08]">
          <p className="font-mono text-xs text-[#64748b] uppercase tracking-wider mb-5 text-center">Find me everywhere</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
                aria-label={s.label}
                title={s.label}
                className="group flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/[0.08] bg-white/[0.03] text-[#64748b] hover:border-white/20 hover:bg-white/[0.07] hover:text-white transition-all text-xs font-mono"
              >
                <span className="transition-colors" style={{ color: "inherit" }}>
                  <SocialIcon icon={s.icon} size={14} />
                </span>
                <span>{s.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-[#64748b]">
          <span>© {new Date().getFullYear()} Subhan Haider. All rights reserved.</span>
          <button
            onClick={scrollToTop}
            className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#cbd5e1] hover:text-white hover:bg-white/10 transition-all"
          >
            <span>Back to top</span>
            <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
}

export function Reveal({
  children,
  delay = 0,
  className = "",
  direction = "up", // "up" | "down" | "left" | "right" | "zoom" | "none"
  distance = 45,
  scale = false,
  duration,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "zoom" | "none";
  distance?: number;
  scale?: boolean;
  duration?: number;
}) {
  const getInitialPosition = () => {
    const base: Record<string, any> = { opacity: 0 };
    if (scale) base.scale = 0.94;

    switch (direction) {
      case "up":
        base.y = distance;
        break;
      case "down":
        base.y = -distance;
        break;
      case "left":
        base.x = -distance;
        break;
      case "right":
        base.x = distance;
        break;
      case "zoom":
        base.scale = 0.9;
        break;
      case "none":
        break;
      default:
        base.y = distance;
    }
    return base;
  };

  const getAnimateTarget = () => {
    const target: Record<string, any> = { opacity: 1, x: 0, y: 0 };
    if (scale || direction === "zoom") target.scale = 1;
    return target;
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={getAnimateTarget()}
      viewport={{ once: true, margin: "-60px" }}
      transition={
        duration
          ? { duration, ease: [0.22, 1, 0.36, 1], delay }
          : {
              type: "spring",
              stiffness: 85,
              damping: 18,
              mass: 0.8,
              delay,
            }
      }
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

