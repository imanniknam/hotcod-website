"use client";

import { CANONICAL_STAGES, type RailStage } from "@/lib/types";
import { toPersianDigits } from "@/lib/format";

/**
 * THE SIGNATURE ELEMENT.
 *
 * A transit map, not a progress bar. Three variants, each doing real work:
 *   live   — the hero. Animates the parcel along the rail once on mount.
 *   steps  — the four-step onboarding section. Static, numbered (the only
 *            place numbered markers are permitted, because it is genuinely
 *            sequential).
 *   result — the tracking result. Vertical on mobile, timestamps per node.
 *
 * RTL: index 0 is the RIGHTMOST node and forward travel is toward the left.
 * Positions use `inset-inline-start`, so the whole thing is direction-agnostic
 * and never needs mirroring.
 */
export type TrackingRailProps = {
  activeIndex: number;
  stages?: RailStage[];
  variant?: "live" | "steps" | "result";
  className?: string;
};

/** Zero-width centering anchor — children overflow equally to both sides. */
function Anchor({
  pct,
  className,
  children,
}: {
  pct: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={["absolute flex w-0 justify-center", className].filter(Boolean).join(" ")}
      style={{ insetInlineStart: `${pct}%` }}
    >
      {children}
    </div>
  );
}

function Node({
  state,
  index,
  numbered,
}: {
  state: "done" | "active" | "idle";
  index: number;
  numbered: boolean;
}) {
  if (numbered) {
    const reached = state !== "idle";
    return (
      <span
        className={[
          "tnum flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-num-sm",
          reached
            ? "border-brand-500 bg-surface-raised text-content-primary"
            : "border-border-strong bg-surface-raised text-content-tertiary",
        ].join(" ")}
      >
        {toPersianDigits(index + 1)}
      </span>
    );
  }

  if (state === "active") {
    return (
      <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
        <span className="absolute h-8 w-8 rounded-full bg-brand-500/12" />
        <span
          className="relative flex h-5 w-5 items-center justify-center rounded-full bg-brand-500"
          style={{ animation: "rail-node-arrive 320ms var(--ease-enter) both 1200ms" }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-ink-900" />
        </span>
      </span>
    );
  }

  if (state === "done") {
    return <span className="bg-ink-900 h-3.5 w-3.5 shrink-0 rounded-full" />;
  }

  return (
    <span className="border-border-strong bg-surface-raised h-2.5 w-2.5 shrink-0 rounded-full border-2" />
  );
}

export function TrackingRail({
  activeIndex,
  stages = CANONICAL_STAGES,
  variant = "live",
  className,
}: TrackingRailProps) {
  const last = stages.length - 1;
  const clamped = Math.max(0, Math.min(activeIndex, last));
  const progress = last === 0 ? 0 : (clamped / last) * 100;
  const numbered = variant === "steps";

  /* ---- result: vertical on mobile, horizontal from md up --------------- */
  if (variant === "result") {
    return (
      <ol className={className}>
        {stages.map((s, i) => {
          const state = i < clamped ? "done" : i === clamped ? "active" : "idle";
          return (
            <li key={s.key} className="relative flex gap-4 pb-6 last:pb-0">
              <div className="flex w-5 shrink-0 flex-col items-center">
                <Node state={state} index={i} numbered={false} />
                {i < last ? (
                  <span
                    className={`mt-1 w-0.5 flex-1 ${i < clamped ? "bg-brand-500" : "bg-border-default"}`}
                  />
                ) : null}
              </div>
              <div className="pb-2">
                <p
                  className={`text-label ${state === "idle" ? "text-content-tertiary" : "text-content-primary"}`}
                >
                  {s.label}
                </p>
                {s.meta ? (
                  <p className="text-caption text-content-tertiary tnum mt-0.5">{s.meta}</p>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    );
  }

  /* ---- live / steps: horizontal ---------------------------------------- */
  return (
    <div
      className={["relative w-full px-8", className].filter(Boolean).join(" ")}
      role="group"
      aria-label="وضعیت مرسوله"
    >
      <div className={`relative ${numbered ? "h-9" : "h-5"}`}>
        {/* track */}
        <div className="bg-border-default absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 rounded-full" />

        {/* ruler ticks — the detail that makes this read as an instrument */}
        {Array.from({ length: last * 3 }, (_, k) => {
          const seg = Math.floor(k / 3);
          const t = (k % 3) + 1;
          const pct = ((seg + t / 4) / last) * 100;
          return (
            <span
              key={`tick-${k}`}
              aria-hidden="true"
              className="bg-border-default absolute top-1/2 h-1 w-px -translate-y-1/2"
              style={{ insetInlineStart: `${pct}%` }}
            />
          );
        })}

        {/* completed segment — the second and final permitted gradient */}
        <div
          className="absolute top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-[linear-gradient(160deg,#fe8d1a,#fd3f13)]"
          style={{
            insetInlineStart: 0,
            width: `${progress}%`,
            ["--rail-progress" as string]: `${progress}%`,
            animation:
              variant === "live"
                ? "rail-travel var(--motion-rail,1400ms) var(--ease-transit) both"
                : undefined,
          }}
        >
          {/* the parcel, riding the leading edge, speed lines trailing behind */}
          {variant === "live" && progress > 0 ? (
            <span className="absolute end-0 top-1/2 flex -translate-y-1/2 items-center">
              <span
                aria-hidden="true"
                className="me-1 flex flex-col items-end gap-[3px] opacity-70"
              >
                <span className="shear bg-brand-500 block h-[2px] w-4 rounded-full" />
                <span className="shear bg-brand-500 block h-[2px] w-2.5 rounded-full opacity-70" />
              </span>
            </span>
          ) : null}
        </div>

        {/* nodes */}
        {stages.map((s, i) => {
          const state = i < clamped ? "done" : i === clamped ? "active" : "idle";
          return (
            <Anchor key={s.key} pct={(i / last) * 100} className="top-1/2 -translate-y-1/2">
              <Node state={state} index={i} numbered={numbered} />
            </Anchor>
          );
        })}
      </div>

      {/* labels */}
      <div className="relative mt-4 h-12">
        {stages.map((s, i) => {
          const reached = i <= clamped;
          return (
            <Anchor key={`${s.key}-label`} pct={(i / last) * 100}>
              <div className="w-28 text-center">
                <p
                  className={`text-label ${reached ? "text-content-primary" : "text-content-tertiary"}`}
                >
                  {s.label}
                </p>
                {s.meta ? (
                  <p className="text-caption text-content-tertiary tnum mt-0.5">{s.meta}</p>
                ) : null}
              </div>
            </Anchor>
          );
        })}
      </div>
    </div>
  );
}
