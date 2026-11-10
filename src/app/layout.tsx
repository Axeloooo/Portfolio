import AskResumeChat from "@/components/ask-resume-chat";
import Navbar from "@/components/navbar";
import FaviconSwitcher from "@/components/favicon-switcher";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/theme-provider";
import { DATA } from "@/data/resume";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: `${DATA.name} | ${DATA.role}`,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.seoDescription,
  icons: {
    icon: [
      { url: "/favicon-light.ico", media: "(prefers-color-scheme: light)" },
      { url: "/favicon-dark.ico", media: "(prefers-color-scheme: dark)" },
    ],
  },
  openGraph: {
    title: `${DATA.name} | ${DATA.role}`,
    description: DATA.seoDescription,
    url: DATA.url,
    siteName: DATA.name,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: `${DATA.name} | ${DATA.role}`,
    description: DATA.seoDescription,
    card: "summary_large_image",
  },
  verification: {
    google: "",
    yandex: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased max-w-2xl mx-auto py-12 sm:py-24 px-6">
        <ThemeProvider attribute="class" defaultTheme="light">
          <FaviconSwitcher />
          {children}
          {/* The Vercel scripts only exist on Vercel; elsewhere they 404. */}
          {process.env.VERCEL && (
            <>
              <SpeedInsights />
              <Analytics />
            </>
          )}
          <Navbar />
          <AskResumeChat />
        </ThemeProvider>
      </body>
    </html>
  );
}
