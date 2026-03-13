import clsx from "clsx";
import { Lightbulb, AlertTriangle, CheckCircle2, Info } from "lucide-react";

type TipVariant = "tip" | "warning" | "success" | "info";

interface TipBoxProps {
  variant?: TipVariant;
  title?: string;
  children: React.ReactNode;
}

const variantStyles: Record<TipVariant, { container: string; icon: string; iconEl: typeof Lightbulb }> = {
  tip: {
    container: "bg-amber-50 border-amber-200 text-amber-900",
    icon: "text-amber-600",
    iconEl: Lightbulb,
  },
  warning: {
    container: "bg-red-50 border-red-200 text-red-900",
    icon: "text-red-600",
    iconEl: AlertTriangle,
  },
  success: {
    container: "bg-green-50 border-green-200 text-green-900",
    icon: "text-green-600",
    iconEl: CheckCircle2,
  },
  info: {
    container: "bg-blue-50 border-blue-200 text-blue-900",
    icon: "text-blue-600",
    iconEl: Info,
  },
};

export function TipBox({ variant = "tip", title, children }: TipBoxProps) {
  const styles = variantStyles[variant];
  const Icon = styles.iconEl;
  return (
    <div className={clsx("border rounded-lg p-4 mb-4", styles.container)}>
      <div className="flex gap-3">
        <Icon className={clsx("w-5 h-5 mt-0.5 shrink-0", styles.icon)} />
        <div className="text-sm leading-relaxed">
          {title && <p className="font-semibold mb-1">{title}</p>}
          {children}
        </div>
      </div>
    </div>
  );
}
