import clsx from "clsx";

interface CardProps {
  title?: string;
  className?: string;
  children: React.ReactNode;
}

export function Card({ title, className, children }: CardProps) {
  return (
    <div className={clsx("bg-white rounded-xl border border-gray-200 p-6 shadow-sm", className)}>
      {title && <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>}
      {children}
    </div>
  );
}

export function CardGrid({ children, cols = 2 }: { children: React.ReactNode; cols?: 2 | 3 | 4 }) {
  return (
    <div
      className={clsx(
        "grid gap-4",
        cols === 2 && "grid-cols-1 sm:grid-cols-2",
        cols === 3 && "grid-cols-1 sm:grid-cols-3",
        cols === 4 && "grid-cols-2 sm:grid-cols-4"
      )}
    >
      {children}
    </div>
  );
}
