import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { PRICING } from "@/lib/pricing";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StudioSnap AI | Premium AI Photo Edits",
  description: `Create passport-style photos, try outfits, or transform your portrait with a reference image. Preview free. Download HD for ${PRICING.singleHdDownload.displayPrice}.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <header className="sticky top-0 z-50 w-full glass-card border-b border-border/50">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="text-xl font-medium tracking-tight text-foreground">
              StudioSnap <span className="text-primary font-semibold">AI</span>
            </Link>
            <nav className="hidden md:flex gap-6 text-sm font-medium text-foreground/80">
              <Link href="/#tools" className="hover:text-primary transition-colors">Tools</Link>
              <Link href="/#pricing" className="hover:text-primary transition-colors">Pricing</Link>
              <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            </nav>
            <Link 
              href="/#tools" 
              className="px-4 py-2 bg-foreground text-background text-sm font-medium rounded-full hover:bg-primary hover:text-white transition-all shadow-sm"
            >
              Try it free
            </Link>
          </div>
        </header>

        <main className="flex-1">
          {children}
        </main>

        <footer className="bg-white/50 border-t border-border/50 py-12 mt-20">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <p className="text-sm text-foreground/60 mb-4">
              Passport-style results are AI-generated and may still require manual verification against official document requirements.
            </p>
            <div className="flex justify-center gap-6 text-sm font-medium text-foreground/80 mb-8">
              <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
              <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
            </div>
            <p className="text-xs text-foreground/40">
              © {new Date().getFullYear()} StudioSnap AI. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
