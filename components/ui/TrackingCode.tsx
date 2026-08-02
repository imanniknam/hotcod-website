import { formatTrackingCode } from "@/lib/format";

/**
 * A parcel tracking code: grouped in fours, Persian numerals, monospace.
 * Digits don't join in Persian script, so the mono voice's letter-spacing
 * is safe here even though it's normally Latin-only — see the note in
 * `lib/format.ts` above `formatTrackingCode`. Rendered `dir="ltr"` so the
 * group order never reverses inside an RTL document.
 */
export type TrackingCodeProps = { value: string; prefix?: string; className?: string };

export function TrackingCode({ value, prefix, className }: TrackingCodeProps) {
  const formatted = formatTrackingCode(value);

  return (
    <span
      dir="ltr"
      className={["bidi-isolate font-mono text-code text-content-primary", className]
        .filter(Boolean)
        .join(" ")}
    >
      {prefix ? <span className="text-content-tertiary">{prefix} </span> : null}
      {formatted}
    </span>
  );
}
