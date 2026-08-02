import type { ElementType, ReactNode } from "react";

/**
 * The neutral container. Sections restyle it via `className` — this file
 * only owns elevation, radius and the optional registration marks. Do not
 * add section-specific opinions here; §7 assigns each section its own
 * anatomy on top of this shell.
 */
export type CardProps = {
  elevation?: 0 | 1 | 2 | 3;
  regMarks?: boolean;
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

const ELEVATION_CLASSES: Record<NonNullable<CardProps["elevation"]>, string> = {
  0: "shadow-none",
  1: "shadow-e1",
  2: "shadow-e2",
  3: "shadow-e3",
};

export function Card({
  elevation = 1,
  regMarks = false,
  as: Component = "div",
  className,
  children,
}: CardProps) {
  const classes = [
    "rounded-md border border-border-subtle bg-surface-raised",
    ELEVATION_CLASSES[elevation],
    regMarks ? "reg-marks" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <Component className={classes}>{children}</Component>;
}
