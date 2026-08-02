/**
 * The logo's three trailing speed lines, at the locked 12° shear.
 *
 * `direction` is where the motion is HEADING. In RTL forward is the inline
 * end (visually left), so the lines trail behind toward the inline start.
 */
export type SpeedLinesProps = {
  count?: 1 | 2 | 3;
  direction?: "start" | "end";
  className?: string;
};

const WIDTHS = ["w-8", "w-5", "w-3"];

export function SpeedLines({ count = 3, direction = "end", className }: SpeedLinesProps) {
  return (
    <span
      aria-hidden="true"
      className={[
        "pointer-events-none inline-flex flex-col gap-1",
        direction === "end" ? "items-end" : "items-start",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {WIDTHS.slice(0, count).map((w, i) => (
        <span
          key={w}
          className={`shear block h-[3px] rounded-full bg-brand-500 ${w}`}
          style={{ opacity: 1 - i * 0.28 }}
        />
      ))}
    </span>
  );
}
