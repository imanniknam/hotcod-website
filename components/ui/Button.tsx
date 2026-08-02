import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

/**
 * The only button on the site. Primary carries the single other permitted
 * gradient (the tracking rail's completed segment is the first) — see
 * DESIGN-SPEC.md §3. Never put white text on brand-500 directly; primary's
 * text is `text-content-on-brand` (ink-900, 5.66:1) by contract.
 *
 * `iconStart` renders first in DOM order, which in this RTL-only site means
 * the RIGHT edge of the button — "start" follows reading direction, not the
 * physical left.
 */
export type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  href?: string;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  className?: string;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const SIZE_CLASSES: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "h-9 px-3 text-action-sm",
  md: "h-11 px-4 text-action",
  lg: "h-[52px] px-6 text-action-lg",
};

const GAP_CLASSES: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "gap-1.5",
  md: "gap-2",
  lg: "gap-2.5",
};

const VARIANT_CLASSES: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-[linear-gradient(160deg,#fe8d1a,#fd3f13)] text-content-on-brand shadow-e1 hover:shadow-e2 active:shadow-e1",
  secondary:
    "bg-surface-raised text-content-primary border border-border-default hover:bg-surface-sunken active:bg-surface-sunken",
  ghost:
    "bg-transparent text-content-primary hover:bg-surface-sunken active:bg-surface-sunken",
  danger: "bg-danger-500 text-content-inverse hover:bg-danger-700 active:bg-danger-700",
};

const BASE =
  "relative inline-flex select-none items-center justify-center whitespace-nowrap rounded-sm font-body transition-[background-color,box-shadow,color] duration-[120ms] ease-[var(--ease-standard)] active:duration-[80ms] disabled:pointer-events-none disabled:opacity-50";

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={`animate-spin ${className ?? ""}`}
      viewBox="0 0 24 24"
      width={16}
      height={16}
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2.5" />
      <path d="M21 12a9 9 0 00-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  href,
  iconStart,
  iconEnd,
  className,
  children,
  type,
  ...rest
}: ButtonProps) {
  const classes = [BASE, SIZE_CLASSES[size], VARIANT_CLASSES[variant], className]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span
        className={`inline-flex items-center ${GAP_CLASSES[size]} ${loading ? "invisible" : ""}`}
      >
        {iconStart}
        {children}
        {iconEnd}
      </span>
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <Spinner />
        </span>
      )}
    </>
  );

  const isDisabled = disabled || loading;

  if (href) {
    if (isDisabled) {
      return (
        <span className={classes} aria-disabled="true" role="link" aria-busy={loading || undefined}>
          {content}
        </span>
      );
    }
    return (
      <Link href={href} className={classes} aria-busy={loading || undefined}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type ?? "button"}
      className={classes}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      {...rest}
    >
      {content}
    </button>
  );
}
