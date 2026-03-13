import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CELPIP Study Guide",
  description:
    "Comprehensive CELPIP exam preparation guide — Listening, Reading, Writing, Speaking, Scoring, and Immigration requirements.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gray-50`}
      >
        <Navigation />
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <footer className="mt-16 border-t border-gray-200 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-gray-500">
            Personal CELPIP Study Guide — Built for exam preparation. Information sourced from CELPIP.ca and IRCC.
          </div>
        </footer>
      </body>
    </html>
  );
}
