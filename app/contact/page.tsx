"use client";

import { useState } from "react";
import Link from "next/link";
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
    <main className="relative min-h-screen bg-[#090a12] text-[#f8fafc] overflow-hidden">
      <Nav />

      <section className="relative pt-40 pb-28 px-6 md:px-12 grid-pattern">
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

          <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] items-start">
            {/* Left Column: Direct Info */}
            <div>
              <GlowBadge variant="emerald">
                <span>GET IN TOUCH</span>
              </GlowBadge>

              <h1 className="display-title mt-4 text-4xl sm:text-6xl font-extrabold text-white">
                START A <br />
                <span className="gradient-text-mint">CONVERSATION.</span>
              </h1>

              <p className="mt-6 text-base sm:text-lg text-[#94a3b8] leading-relaxed">
                Have a question about an Android project, want to discuss software engineering,
                or have an idea you&apos;d like to build together? Drop a message below.
              </p>

              {/* Direct channels */}
              <div className="mt-10 space-y-4">
                <a
                  href="https://github.com/Subhan-Haider"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-[#0f111d]/80 p-4 hover:border-[#34d399]/40 hover:bg-[#15192c]/80 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <Github size={20} />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-[#64748b] block">GITHUB</span>
                    <span className="text-sm font-bold text-white group-hover:text-[#34d399] transition-colors">
                      github.com/Subhan-Haider
                    </span>
                  </div>
                </a>

                <a
                  href="https://tester.subhan.tech/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-[#0f111d]/80 p-4 hover:border-[#38bdf8]/40 hover:bg-[#15192c]/80 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#38bdf8]/10 flex items-center justify-center text-[#38bdf8] group-hover:scale-110 transition-transform">
                    <Smartphone size={20} />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-[#64748b] block">TESTER PORTAL</span>
                    <span className="text-sm font-bold text-white group-hover:text-[#38bdf8] transition-colors">
                      tester.subhan.tech
                    </span>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Column: Interactive Form */}
            <div className="rounded-3xl border border-white/10 bg-[#0f111d]/90 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl">
              <div className="flex items-center gap-2 text-xs font-mono text-[#34d399] pb-4 mb-6 border-b border-white/10">
                <MessageSquare size={15} />
                <span>DIRECT MESSAGE FORM</span>
              </div>

              {state === "done" ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#34d399]/20 text-[#34d399] flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(52,211,153,0.4)]">
                    <CheckCircle2 size={28} />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    Message Received!
                  </h3>
                  <p className="text-sm text-[#94a3b8] max-w-sm mx-auto">
                    Thank you for reaching out. I will get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => setState("idle")}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-xs font-bold text-white hover:bg-white/15 transition-colors"
                  >
                    <span>Send Another Message</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Topic Selector */}
                  <div>
                    <label className="block text-xs font-mono text-[#94a3b8] mb-2.5">
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
                              ? "bg-[#34d399] text-[#090a12] font-bold shadow-[0_0_12px_rgba(52,211,153,0.3)]"
                              : "bg-white/[0.04] text-[#94a3b8] border border-white/5 hover:bg-white/10 hover:text-white"
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
                      <label className="block text-xs font-mono text-[#94a3b8] mb-2">
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
                        className="w-full rounded-xl border border-white/10 bg-[#090a12]/80 px-4 py-3 text-sm text-white placeholder:text-[#64748b] focus:border-[#34d399] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#94a3b8] mb-2">
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
                        className="w-full rounded-xl border border-white/10 bg-[#090a12]/80 px-4 py-3 text-sm text-white placeholder:text-[#64748b] focus:border-[#34d399] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Subject Input */}
                  <div>
                    <label className="block text-xs font-mono text-[#94a3b8] mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="Brief title of your inquiry"
                      value={formData.subject || selectedTopic}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full rounded-xl border border-white/10 bg-[#090a12]/80 px-4 py-3 text-sm text-white placeholder:text-[#64748b] focus:border-[#34d399] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Message Input */}
                  <div>
                    <label className="block text-xs font-mono text-[#94a3b8] mb-2">
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
                      className="w-full rounded-xl border border-white/10 bg-[#090a12]/80 px-4 py-3 text-sm text-white placeholder:text-[#64748b] focus:border-[#34d399] focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {state === "error" && (
                    <div className="flex items-center gap-2 rounded-xl bg-[#ef4444]/10 border border-[#ef4444]/20 p-3 text-xs text-[#fca5a5]">
                      <AlertCircle size={15} />
                      <span>
                        Something went wrong while sending your message. Please try again.
                      </span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={state === "sending"}
                    className="w-full flex items-center justify-center gap-2 rounded-full bg-[#34d399] py-3.5 text-xs font-bold text-[#090a12] shadow-lg hover:bg-[#6ee7b7] disabled:opacity-50 transition-all cursor-pointer"
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
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

