import type { LucideIcon } from "lucide-react";
import clsx from "clsx";

interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  color: "blue" | "green" | "purple" | "orange" | "red" | "teal";
  stats?: { label: string; value: string }[];
}

const colorMap = {
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    icon: "bg-blue-600 text-white",
    title: "text-blue-900",
    sub: "text-blue-700",
    badge: "bg-blue-100 text-blue-800",
  },
  green: {
    bg: "bg-green-50",
    border: "border-green-200",
    icon: "bg-green-600 text-white",
    title: "text-green-900",
    sub: "text-green-700",
    badge: "bg-green-100 text-green-800",
  },
  purple: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    icon: "bg-purple-600 text-white",
    title: "text-purple-900",
    sub: "text-purple-700",
    badge: "bg-purple-100 text-purple-800",
  },
  orange: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    icon: "bg-orange-600 text-white",
    title: "text-orange-900",
    sub: "text-orange-700",
    badge: "bg-orange-100 text-orange-800",
  },
  red: {
    bg: "bg-red-50",
    border: "border-red-200",
    icon: "bg-red-600 text-white",
    title: "text-red-900",
    sub: "text-red-700",
    badge: "bg-red-100 text-red-800",
  },
  teal: {
    bg: "bg-teal-50",
    border: "border-teal-200",
    icon: "bg-teal-600 text-white",
    title: "text-teal-900",
    sub: "text-teal-700",
    badge: "bg-teal-100 text-teal-800",
  },
};

export function SectionHeader({ icon: Icon, title, subtitle, color, stats }: SectionHeaderProps) {
  const c = colorMap[color];
  return (
    <div className={clsx("rounded-xl border p-6 mb-8", c.bg, c.border)}>
      <div className="flex items-start gap-4">
        <div className={clsx("rounded-lg p-3", c.icon)}>
          <Icon className="w-7 h-7" />
        </div>
        <div className="flex-1">
          <h1 className={clsx("text-3xl font-bold", c.title)}>{title}</h1>
          <p className={clsx("mt-1 text-base", c.sub)}>{subtitle}</p>
          {stats && (
            <div className="mt-4 flex flex-wrap gap-2">
              {stats.map(({ label, value }) => (
                <span key={label} className={clsx("px-3 py-1 rounded-full text-sm font-medium", c.badge)}>
                  <span className="font-bold">{value}</span> {label}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
