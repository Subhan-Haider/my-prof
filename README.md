# Subhan Haider — Personal Portfolio

A modern, full-stack personal portfolio and project showcase built with **Next.js 15**, **React 19**, **Tailwind CSS v4**, and **Supabase** — fully mobile-responsive and powered by a custom CMS admin studio.

---

## ✨ Features

- **Animated Hero** — Framer Motion scroll reveals, glow effects, and a live GitHub stats counter
- **Projects Archive** — Filterable, searchable project cards with slug-based case study pages
- **Android Spotlight** — Dedicated section for native mobile engineering work
- **Tech Stack Matrix** — Auto-animating marquee of tools and technologies
- **Journey Timeline** — Education, internships, and milestones
- **Resume Page** — Downloadable PDF CV with inline contact details
- **Contact Form** — Topic-based inquiry form with live feedback
- **Admin CMS** — Password-protected `/admin` studio to manage projects, skills, journey entries, and inbox messages — no external CMS needed
- **100% Mobile Responsive** — Tested at 375 × 812 px (iPhone SE) across all routes

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| UI Library | [React 19](https://react.dev/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Animations | [Framer Motion 12](https://www.framer.com/motion/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Database | [Supabase](https://supabase.com/) (PostgreSQL + Auth) |
| Fonts | Outfit · Plus Jakarta Sans · JetBrains Mono (Google Fonts) |
| Language | TypeScript 5 |
| Deployment | [Vercel](https://vercel.com/) |

---

## 📁 Project Structure

```
.
├── app/
│   ├── page.tsx              # Homepage — hero, projects spotlight, android section, tech stack
│   ├── projects/
│   │   ├── page.tsx          # Projects archive — filter, search, grid/list view
│   │   └── [slug]/page.tsx   # Individual case study page
│   ├── resume/page.tsx       # CV / resume page with download
│   ├── contact/page.tsx      # Contact form
│   ├── admin/page.tsx        # Admin CMS dashboard (password-protected)
│   ├── layout.tsx            # Root layout with font loading
│   └── globals.css           # Global CSS, design tokens, utility classes
│
├── components/
│   ├── site.tsx              # Shared Nav + Footer components
│   └── providers.tsx         # Client providers (if any)
│
├── lib/
│   ├── data.ts               # Static project & skill data (local seed)
│   └── supabase.ts           # Supabase client initialisation
│
├── public/                   # Static assets (CV PDF, OG image, favicon)
├── supabase/                 # Supabase schema / migrations
├── .env.example              # Environment variable template
└── next.config.ts
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm / pnpm
- A [Supabase](https://supabase.com/) project (free tier is sufficient)

### 1 — Clone & install

```bash
git clone https://github.com/Subhan-Haider/portfolio.git
cd portfolio
npm install
```

### 2 — Configure environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env.local
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase `anon` public key |
| `ADMIN_PASSWORD` | Password to unlock `/admin` (stored only in server env) |

### 3 — Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Admin CMS

Navigate to `/admin` and enter the `ADMIN_PASSWORD` to access the studio.

### Capabilities

| Section | Actions |
|---|---|
| **Projects** | Create, edit, delete — title, stack, links, featured toggle |
| **Skills** | Add / remove skills by category |
| **Journey** | Manage timeline entries (education & experience) |
| **Inbox** | View and delete contact form submissions |

Admin state is persisted in Supabase and reflected live on all public pages.

---

## 📦 Scripts

```bash
npm run dev      # Start local dev server (http://localhost:3000)
npm run build    # Build production bundle
npm run start    # Serve production build locally
npm run lint     # Run ESLint
```

---

## 🎨 Design System

All design tokens live in `app/globals.css` as CSS custom properties:

```css
--accent-emerald: #34d399;   /* primary CTA */
--accent-indigo:  #6366f1;   /* secondary accent */
--bg-main:        #090a12;   /* page background */
--font-display:   'Outfit';
--font-sans:      'Plus Jakarta Sans';
--font-mono:      'JetBrains Mono';
```

Key utility classes: `.glass-panel`, `.display-title`, `.gradient-text-mint`, `.glow-emerald`, `.scrollbar-none`, `.marquee-track`.

---

## 📱 Mobile Responsiveness

All routes are optimised for viewports from **320 px** to **1920 px**:

- Filter chips and admin tabs use `overflow-x-auto scrollbar-none` for horizontal swipe
- CTA button groups use `flex-col sm:flex-row` — stacked on mobile, inline on tablet+
- Floating decorative elements use `hidden sm:flex` / `hidden md:flex` to prevent clipping
- Inputs and selects enforce `font-size: 16px` on mobile to prevent iOS Safari auto-zoom
- `overflow-x: hidden` on `body` prevents horizontal bleed from glow spheres

---

## 🚢 Deployment

The easiest way to deploy is [Vercel](https://vercel.com/new):

1. Import the GitHub repo in Vercel
2. Set the environment variables under **Project Settings → Environment Variables**
3. Deploy — Vercel auto-detects Next.js and handles everything

---

## 📄 License

This project is open-sourced under the [MIT License](LICENSE). Feel free to fork, adapt, and build your own portfolio from it — attribution appreciated but not required.

---

> Built with ❤️ by [Subhan Haider](https://github.com/Subhan-Haider)
