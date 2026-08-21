import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#090a12" },
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "Subhan Haider",
    template: "%s | Subhan Haider",
  },
  description:
    "Personal portfolio and platform for Android apps, web experiences, open-source projects, and experiments by Subhan Haider.",
  metadataBase: new URL("https://subhan.tech"),
  keywords: [
    "Subhan Haider",
    "Android Developer",
    "Kotlin",
    "Jetpack Compose",
    "Next.js",
    "React",
    "Portfolio",
    "Student Developer",
  ],
  authors: [{ name: "Subhan Haider", url: "https://github.com/Subhan-Haider" }],
  openGraph: {
    type: "website",
    title: "Subhan Haider",
    description:
      "Turning ideas into Android apps, websites, experiments, and digital experiences.",
    url: "https://subhan.tech",
    siteName: "Subhan Haider Portfolio",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Subhan Haider",
    description:
      "Turning ideas into Android apps, websites, experiments, and digital experiences.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${outfit.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} scroll-smooth dark`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const savedTheme = localStorage.getItem('theme');
                const theme = savedTheme === 'light' ? 'light' : 'dark';
                document.documentElement.classList.remove('light', 'dark');
                document.documentElement.classList.add(theme);
                document.documentElement.setAttribute('data-theme', theme);
                document.documentElement.style.colorScheme = theme;
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="bg-[var(--bg-main)] text-[var(--text-primary)] antialiased selection:bg-[#34d399]/25 selection:text-[#059669] dark:selection:text-[#34d399] font-sans transition-colors duration-300">
        <ThemeProvider>
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-[#6366f1]/15 via-[#34d399]/8 to-transparent blur-3xl rounded-full opacity-70 dark:opacity-100" />
            <div className="absolute top-[35%] -left-64 w-[600px] h-[600px] bg-[#6366f1]/10 blur-3xl rounded-full opacity-60 dark:opacity-100" />
            <div className="absolute top-[65%] -right-64 w-[600px] h-[600px] bg-[#34d399]/8 blur-3xl rounded-full opacity-60 dark:opacity-100" />
          </div>
          <div className="relative z-10">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
