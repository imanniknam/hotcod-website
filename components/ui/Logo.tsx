/**
 * The HOTCOD mark.
 *
 * Anatomy: an H sheared by the locked 12° with three trailing speed lines,
 * and a dark D counterform holding the parcel-over-banknote glyph. The shear
 * is applied as a real `skewX(-12)` transform, so the angle in the artwork is
 * the same number as `--shear-angle` — one source of truth.
 *
 * The wordmark is real HTML, not SVG <text>: it inherits the loaded webfont
 * instead of depending on font resolution inside an SVG document, and it can
 * never overflow a viewBox.
 *
 * The gradient here is part of the logo artwork and does not spend from the
 * site's two-placement gradient budget.
 */
export type LogoProps = {
  variant?: "full" | "mark";
  theme?: "light" | "dark";
  className?: string;
};

function Mark({ id, className }: { id: string; className?: string }) {
  return (
    <svg viewBox="0 0 88 46" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#fe8d1a" />
          <stop offset="100%" stopColor="#fd3f13" />
        </linearGradient>
      </defs>

      <g transform="translate(16,0) skewX(-12)" fill={`url(#${id})`}>
        {/* three trailing speed lines */}
        <rect x="-14" y="8" width="14" height="4" rx="2" />
        <rect x="-11" y="18" width="11" height="4" rx="2" opacity="0.75" />
        <rect x="-8" y="28" width="8" height="4" rx="2" opacity="0.5" />
        {/* the H */}
        <rect x="12" y="6" width="12" height="34" rx="1" />
        <rect x="34" y="6" width="12" height="34" rx="1" />
        <rect x="12" y="17" width="34" height="9" />
      </g>

      {/* the D counterform */}
      <path d="M60 6h10a17 17 0 0 1 0 34H60Z" fill="#1d252f" />
      <rect x="64" y="12" width="13" height="10" rx="1.5" fill="#ffffff" />
      <path d="M64 15.5h13M70.5 12v10" stroke="#1d252f" strokeWidth="1" />
      <rect x="64" y="25" width="13" height="8" rx="1.5" fill="#ffffff" />
      <circle cx="70.5" cy="29" r="2" fill="#1d252f" />
    </svg>
  );
}

export function Logo({ variant = "full", theme = "light", className }: LogoProps) {
  const id = `hc-grad-${variant}-${theme}`;
  const cod = theme === "dark" ? "text-ink-0" : "text-ink-900";
  const strap = theme === "dark" ? "text-ink-400" : "text-content-tertiary";

  if (variant === "mark") {
    return (
      <span className={["inline-flex", className].filter(Boolean).join(" ")} role="img" aria-label="هات‌کد">
        <Mark id={id} className="h-full w-auto" />
      </span>
    );
  }

  return (
    <span
      className={["inline-flex items-center gap-2", className].filter(Boolean).join(" ")}
      role="img"
      aria-label="هات‌کد"
    >
      <Mark id={id} className="h-full w-auto" />
      <span className="flex flex-col justify-center gap-[0.15em]">
        <span className="font-display text-[1rem] leading-none font-bold md:text-[1.15rem]" dir="ltr">
          <span className="text-brand-500">HOT</span>
          <span className={cod}>COD</span>
        </span>
        {/* the strapline is detail, not identity — it goes at small sizes */}
        <span className="hidden items-center gap-1 md:flex" dir="ltr" aria-hidden="true">
          <span className="bg-brand-500 h-px w-2" />
          <span className={`font-mono text-[0.4rem] leading-none tracking-[0.18em] ${strap}`}>
            CASH ON DELIVERY
          </span>
          <span className="bg-brand-500 h-px w-2" />
        </span>
      </span>
    </span>
  );
}
