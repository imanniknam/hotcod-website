/**
 * The icon system. One inline SVG sprite sheet exported as a single typed
 * component. 24px viewBox, 1.5px stroke, round caps/joins, currentColor.
 *
 * Directional icons (arrow, chevron) are authored pointing LEFT — in RTL
 * that is the forward direction. Never mirror these with a transform; the
 * artwork itself is drawn correctly so it never needs flipping per-locale.
 */

export type IconName =
  | "arrow"
  | "chevron"
  | "check"
  | "search"
  | "package"
  | "truck"
  | "wallet"
  | "headset"
  | "map-pin"
  | "bell"
  | "calculator"
  | "phone"
  | "mail"
  | "instagram"
  | "telegram"
  | "whatsapp"
  | "close"
  | "menu"
  | "plus"
  | "minus";

export type IconProps = {
  name: IconName;
  className?: string;
  size?: number;
};

const paths: Record<IconName, React.ReactNode> = {
  arrow: <path d="M19 12H5M11 6l-6 6 6 6" />,
  chevron: <path d="M15 6l-6 6 6 6" />,
  check: <path d="M20 6L9 17l-5-5" />,
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.35-4.35" />
    </>
  ),
  package: (
    <>
      <path d="M12 3l8.5 4.5v9L12 21l-8.5-4.5v-9L12 3z" />
      <path d="M3.5 7.5L12 12l8.5-4.5" />
      <path d="M12 12v9" />
    </>
  ),
  truck: (
    <>
      <path d="M2 7h11v10H2z" />
      <path d="M13 10h4l4 3.5V17h-8z" />
      <circle cx="6.5" cy="18.5" r="1.75" />
      <circle cx="16.5" cy="18.5" r="1.75" />
    </>
  ),
  wallet: (
    <>
      <path d="M3 7.5A2.5 2.5 0 015.5 5H18a2 2 0 012 2v1" />
      <path d="M3 7.5v9A2.5 2.5 0 005.5 19H19a2 2 0 002-2v-7a2 2 0 00-2-2H6a3 3 0 00-3 3z" />
      <circle cx="16.5" cy="13.5" r="1.25" />
    </>
  ),
  headset: (
    <>
      <path d="M4 13v-1a8 8 0 0116 0v1" />
      <rect x="2.5" y="13" width="4" height="6" rx="1.5" />
      <rect x="17.5" y="13" width="4" height="6" rx="1.5" />
      <path d="M20 19v1a2 2 0 01-2 2h-3" />
    </>
  ),
  "map-pin": (
    <>
      <path d="M12 21s7-6.6 7-12a7 7 0 10-14 0c0 5.4 7 12 7 12z" />
      <circle cx="12" cy="9" r="2.25" />
    </>
  ),
  bell: (
    <>
      <path d="M6 9a6 6 0 0112 0c0 4.5 1.5 6 2 6.5H4c.5-.5 2-2 2-6.5z" />
      <path d="M10 19a2 2 0 004 0" />
    </>
  ),
  calculator: (
    <>
      <rect x="4.5" y="2.5" width="15" height="19" rx="2" />
      <path d="M7.5 6.5h9" />
      <path d="M7.5 11h.01M12 11h.01M16.5 11h.01M7.5 15h.01M12 15h.01M16.5 15h.01M7.5 18.5h.01M12 18.5h.01M16.5 13v5.5" />
    </>
  ),
  phone: (
    <path d="M5 4h3.5l1.5 4.5-2 1.5a12 12 0 006 6l1.5-2 4.5 1.5V19a2 2 0 01-2 2C10.5 21 3 13.5 3 6a2 2 0 012-2z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 6.5L12 13l8.5-6.5" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <path d="M17.2 6.8h.01" />
    </>
  ),
  telegram: <path d="M21 4L3 11.5l6 2M21 4L14.5 20l-5.5-6.5M21 4l-12 8.5" />,
  whatsapp: (
    <>
      <path d="M6.5 17.5L4 20l2.6-.7A8 8 0 1012 20a7.9 7.9 0 01-5.5-2.5z" />
      <path d="M9 9.2c0-.5.4-1 .9-1 .3 0 .5.1.6.3l.7 1.4c.1.2 0 .5-.1.6l-.6.6c.4 1 1.2 1.8 2.2 2.2l.6-.6c.2-.2.4-.2.6-.1l1.4.7c.2.1.3.4.3.6 0 .5-.5.9-1 .9-2.6 0-5.6-3-5.6-5.6z" />
    </>
  ),
  close: <path d="M18 6L6 18M6 6l12 12" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  plus: <path d="M12 4v16M4 12h16" />,
  minus: <path d="M4 12h16" />,
};

/**
 * `<Icon name="package" />` — the only way icons are drawn on this site.
 * Colour comes from the surrounding `text-*` colour (currentColor); size
 * defaults to the 24px viewBox at 1:1 (1.5rem) unless overridden.
 */
export function Icon({ name, className, size = 24 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}
