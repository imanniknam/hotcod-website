/**
 * Shared types for the HOTCOD UI kit.
 * Frozen shapes — see DESIGN-SPEC.md §5. Do not rename or widen casually;
 * other agents build against these exact unions.
 */

/** The five canonical parcel lifecycle states, in forward (registration → settlement) order. */
export type ParcelStatus =
  | "registered"
  | "collected"
  | "transit"
  | "delivered"
  | "settled";

/** One node on the TrackingRail. */
export type RailStage = {
  key: ParcelStatus;
  label: string;
  meta?: string;
};

/** Canonical parcel lifecycle. Index 0 is the RIGHTMOST node in RTL. */
export const CANONICAL_STAGES: RailStage[] = [
  { key: "registered", label: "ثبت سفارش" },
  { key: "collected", label: "جمع‌آوری" },
  { key: "transit", label: "در حال حمل" },
  { key: "delivered", label: "تحویل شد" },
  { key: "settled", label: "تسویه شد" },
];

/** Badge wording. Deliberately past-tense — it reports what happened. */
export const STATUS_LABEL: Record<ParcelStatus, string> = {
  registered: "ثبت شده",
  collected: "جمع‌آوری شد",
  transit: "در حال حمل",
  delivered: "تحویل شد",
  settled: "تسویه شد",
};
