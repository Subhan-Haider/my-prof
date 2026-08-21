"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Send,
  Mail,
  Github,
  Smartphone,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  MessageSquare,
} from "lucide-react";
import { Nav, Footer, GlowBadge } from "@/components/site";

const topics = [
  "General Inquiry",
  "Android App Idea",
  "Web Project",
  "Open Source Collaboration",
  "Mentorship / Feedback",
];

export default function ContactPage() {
  const [selectedTopic, setSelectedTopic] = useState("General Inquiry");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");

    try {
      const payload = {
        ...formData,
        subject: formData.subject || selectedTopic,
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setState("done");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  return (
    <main className="relative min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] transition-colors duration-300 overflow-hidden">
      <Nav />

      <section className="relative pt-32 sm:pt-40 pb-20 sm:pb-28 px-4 sm:px-6 md:px-12 grid-pattern">
        {/* Glow Spheres */}
        <div className="absolute top-28 left-1/4 w-[600px] h-[350px] bg-[#6366f1]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-48 right-1/4 w-[500px] h-[300px] bg-[#34d399]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="mx-auto max-w-5xl">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#34d399] hover:underline mb-8"
          >
            <ArrowLeft size={14} />
            <span>Back to Home</span>
          </Link>

          <div className="grid gap-10 lg:gap-12 lg:grid-cols-[1fr_1.3fr] items-start">
            {/* Left Column: Direct Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >

              <h1 className="display-title mt-4 text-3xl sm:text-6xl font-extrabold text-[var(--text-primary)] break-words">
                START A <br />
                <span className="gradient-text-mint">CONVERSATION.</span>
              </h1>

              <p className="mt-5 sm:mt-6 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
                Have a question about an Android project, want to discuss software engineering,
                or have an idea you&apos;d like to build together? Drop a message below.
              </p>

              {/* Direct channels */}
              <div className="mt-8 sm:mt-10 space-y-3 sm:space-y-4">
                <a
                  href="https://github.com/Subhan-Haider"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3.5 sm:gap-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3.5 sm:p-4 hover:border-[var(--border-active)] hover:bg-[var(--bg-surface-elevated)] active:scale-98 transition-all group shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-primary)] group-hover:scale-110 transition-transform">
                    <Github size={20} />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-[var(--text-muted)] block">GITHUB</span>
                    <span className="text-sm font-bold text-[var(--text-primary)] group-hover:text-emerald-600 dark:group-hover:text-[#34d399] transition-colors break-all">
                      github.com/Subhan-Haider
                    </span>
                  </div>
                </a>

                <a
                  href="https://tester.subhan.tech/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3.5 sm:gap-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3.5 sm:p-4 hover:border-sky-500/40 hover:bg-[var(--bg-surface-elevated)] active:scale-98 transition-all group shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-600 dark:text-[#38bdf8] group-hover:scale-110 transition-transform">
                    <Smartphone size={20} />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-[var(--text-muted)] block">TESTER PORTAL</span>
                    <span className="text-sm font-bold text-[var(--text-primary)] group-hover:text-sky-600 dark:group-hover:text-[#38bdf8] transition-colors break-all">
                      tester.subhan.tech
                    </span>
                  </div>
                </a>
              </div>
            </motion.div>

            {/* Right Column: Interactive Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 sm:p-8 sm:p-10 backdrop-blur-2xl shadow-lg dark:shadow-2xl"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-[#34d399] font-medium pb-4 mb-6 border-b border-[var(--border-subtle)]">
                <MessageSquare size={15} />
                <span>DIRECT MESSAGE FORM</span>
              </div>

              {state === "done" ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-[#34d399] flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 size={28} />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[var(--text-primary)]">
                    Message Received!
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] max-w-sm mx-auto">
                    Thank you for reaching out. I will get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => setState("idle")}
                    className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--border-medium)] bg-[var(--bg-surface-elevated)] px-5 py-2.5 text-xs font-bold text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-colors shadow-sm"
                  >
                    <span>Send Another Message</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Topic Selector */}
                  <div>
                    <label className="block text-xs font-mono text-[var(--text-secondary)] font-medium mb-2.5">
                      Select Topic
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {topics.map((t) => (
                        <button
                          type="button"
                          key={t}
                          onClick={() => {
                            setSelectedTopic(t);
                            setFormData((prev) => ({ ...prev, subject: t }));
                          }}
                          className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                            selectedTopic === t
                              ? "bg-emerald-600 text-white dark:bg-[#34d399] dark:text-[#090a12] font-bold shadow-md"
                              : "bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:border-[var(--border-medium)] hover:text-[var(--text-primary)]"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name & Email Row */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-mono text-[var(--text-secondary)] font-medium mb-2">
                        Your Name *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Alex Smith"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-emerald-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[var(--text-secondary)] font-medium mb-2">
                        Email Address *
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="alex@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-emerald-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Subject Input */}
                  <div>
                    <label className="block text-xs font-mono text-[var(--text-secondary)] font-medium mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="Brief title of your inquiry"
                      value={formData.subject || selectedTopic}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-emerald-500 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Message Input */}
                  <div>
                    <label className="block text-xs font-mono text-[var(--text-secondary)] font-medium mb-2">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell me about your idea, question, or project..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-emerald-500 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {state === "error" && (
                    <div className="flex items-center gap-2 rounded-xl bg-rose-500/10 border border-rose-500/20 p-3 text-xs text-rose-600 dark:text-[#fca5a5]">
                      <AlertCircle size={15} />
                      <span>
                        Something went wrong while sending your message. Please try again.
                      </span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={state === "sending"}
                    className="w-full flex items-center justify-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-[#34d399] dark:text-[#090a12] dark:hover:bg-[#6ee7b7] py-3.5 text-xs font-bold shadow-lg disabled:opacity-50 transition-all cursor-pointer"
                  >
                    {state === "sending" ? (
                      <span>Transmitting message...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send size={14} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

