import type { ParcelStatus } from "@/lib/types";
import { STATUS_LABEL } from "@/lib/types";

/**
 * Parcel status. Tinted surface + a 3px inline-start rail + text — never a
 * saturated fill. That is the invariant that keeps "in transit" (which is
 * legitimately brand-coloured) from reading as a call to action.
 */
export type StatusBadgeProps = { status: ParcelStatus; className?: string };

const TONE: Record<ParcelStatus, string> = {
  registered: "bg-surface-sunken text-content-secondary border-s-ink-400",
  collected: "bg-info-50 text-info-700 border-s-info-500",
  transit: "bg-brand-50 text-brand-700 border-s-brand-500",
  delivered: "bg-success-50 text-success-700 border-s-success-500",
  settled: "bg-surface-sunken text-content-primary border-s-ink-900",
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-xs border-s-[3px] ps-2.5 pe-3 py-1 text-label",
        TONE[status],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}
