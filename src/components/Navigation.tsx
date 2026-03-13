"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  Headphones,
  BookOpen,
  PenLine,
  Mic,
  BarChart3,
  Plane,
  Home,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/listening", label: "Listening", icon: Headphones },
  { href: "/reading", label: "Reading", icon: BookOpen },
  { href: "/writing", label: "Writing", icon: PenLine },
  { href: "/speaking", label: "Speaking", icon: Mic },
  { href: "/scoring", label: "Scoring", icon: BarChart3 },
  { href: "/immigration", label: "Immigration", icon: Plane },
];

export function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-brand-700 text-lg">
            <span className="bg-brand-600 text-white rounded-md px-2 py-0.5 text-sm font-bold">
              CELPIP
            </span>
            <span className="hidden sm:inline text-gray-800">Study Guide</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={clsx(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                  pathname === href
                    ? "bg-brand-50 text-brand-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 px-2 py-1 rounded"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            Menu <ChevronDown className={clsx("w-4 h-4 transition-transform", mobileOpen && "rotate-180")} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pb-3">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={clsx(
                "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium mt-1 transition-colors",
                pathname === href
                  ? "bg-brand-50 text-brand-700"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
