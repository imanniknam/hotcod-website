import { formatNumber } from "@/lib/format";

/**
 * Numbers as typography. NEVER print a number without this component — it
 * is the only place raw values are routed through `formatNumber()` and
 * given the tabular-numeral treatment. Pass a pre-formatted string (from
 * `formatToman`, `formatTrackingCode`, etc.) when the value needs a
 * formatter other than the plain grouped-integer default.
 */
export type FigureProps = {
  value: number | string;
  unit?: string;
  size?: "xl" | "lg" | "md" | "sm";
  className?: string;
};

const SIZE_CLASSES: Record<NonNullable<FigureProps["size"]>, string> = {
  xl: "text-num-xl",
  lg: "text-num-lg",
  md: "text-num-md",
  sm: "text-num-sm",
};

export function Figure({ value, unit, size = "md", className }: FigureProps) {
  const display = typeof value === "number" ? formatNumber(value) : value;

  return (
    <span
      className={["inline-flex items-baseline gap-1.5", className].filter(Boolean).join(" ")}
      data-numeric
    >
      <span className={`tnum text-content-primary ${SIZE_CLASSES[size]}`}>{display}</span>
      {unit ? <span className="text-num-unit text-content-tertiary">{unit}</span> : null}
    </span>
  );
}
