import Link from "next/link";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { Nav, Footer, GlowBadge } from "@/components/site";

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-[var(--bg-surface)] text-[#f8fafc] overflow-hidden flex flex-col">
      <Nav />

      <section className="relative flex-1 flex flex-col items-center justify-center px-6 py-40 text-center z-10 grid-pattern">
        {/* Glow Spheres */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#34d399]/10 rounded-full blur-[140px] pointer-events-none" />
        
        <GlowBadge variant="emerald">
          <AlertTriangle size={14} className="mr-1" />
          <span>PAGE NOT FOUND</span>
        </GlowBadge>

        <h1 className="display-title mt-8 text-7xl sm:text-9xl font-extrabold text-white">
          <span className="gradient-text-mint">404</span>
        </h1>
        
        <p className="mt-6 text-lg sm:text-xl text-[#94a3b8] max-w-lg mx-auto leading-relaxed">
          The page you're looking for seems to have drifted into the digital void. Let's get you back to familiar territory.
        </p>

        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-[#34d399] px-8 py-4 text-sm font-bold text-[#090a12] shadow-[0_0_30px_rgba(52,211,153,0.3)] hover:bg-[#6ee7b7] transition-all hover:-translate-y-1"
          >
            <ArrowLeft size={16} />
            <span>Return to Base</span>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
