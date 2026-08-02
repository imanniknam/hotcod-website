/**
 * The waybill perforation rule. Budgeted: three appearances on the homepage
 * total (hero calculator top edge, the divider above the stat band, the
 * footer top edge). A fourth turns the motif into a costume.
 */
export function Perforation({ className }: { className?: string }) {
  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={["perforation w-full", className].filter(Boolean).join(" ")}
    />
  );
}
