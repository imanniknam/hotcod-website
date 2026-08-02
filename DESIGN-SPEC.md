# HOTCOD — Build Contract

**Read this fully before writing a line.** It is the single source of truth. The token layer
(`app/globals.css`), the root layout (`app/layout.tsx`) and the formatters (`lib/format.ts`)
are **already built and frozen**. Do not edit them. Do not add tokens. If you need a value
that does not exist, you are solving the problem wrong — use what is here.

---

## 1. The product

HOTCOD is an Iranian **cash-on-delivery logistics platform for online store owners**. Merchants
compare carrier rates, create shipments, track parcels live, auto-SMS their buyers, collect
cash on delivery, and settle up — from one dashboard. Three years in market. Its single
strongest differentiator is **nationwide geographic coverage, wider than any competitor**.

This is the **public marketing site only**. The dashboard lives on another subdomain. The site
has exactly three jobs:

1. make a skeptical merchant trust us in under 10 seconds,
2. get them to calculate a shipping rate,
3. get them to sign up.

Anything that does not serve one of those three is decoration. Cut it.

**Audience:** Iranian online sellers, 25–45, running Instagram shops and small e-commerce
sites. Non-technical. They are used to cluttered, low-trust, banner-heavy Persian logistics
sites. Our advantage is not more features on the page — it is **visible competence and calm**.

---

## 2. Art direction — PRECISION IN TRANSIT

The visual language comes from the physical world of the product: waybills, barcodes,
corrugated cardboard, tracking numbers, rubber postal stamps, tape, banknotes. **Not from
generic SaaS.** The site should feel like a well-engineered logistics instrument — closer to a
flight-tracking console or a premium fintech ledger than to a marketing brochure.

Three devices carry this, and **nothing else may compete with them**:

**A · The tracking rail** — the signature element. A precise horizontal line with node markers
for parcel states. It appears exactly three times, each time doing real work: the hero's live
element, the structure of the four-step onboarding section, and the core of the tracking result
page. Design it with the care of a transit map, not a progress bar.

**B · Numbers as typography** — this product is made of numbers. Numerals are a first-class
design element with their own tabular treatment on a strict baseline. Tracking codes get
letter-spacing and grouping. Prices get a deliberate currency-unit treatment.

**C · The waybill grid** — structure, not skin, borrowed from shipping labels: dashed
perforation rules as separators, small corner registration marks on key cards, one
barcode-derived strip as a divider. **Maximum three appearances on the homepage total.**

**Surface:** near-white with a faint cool cast (`surface-canvas`). Never a warm cream
background. Light theme only.
**Depth:** soft, low, warm-tinted shadows, three steps. No glassmorphism, no neon glow, no
heavy borders on everything.
**Motion:** exactly one orchestrated moment — the parcel traversing the rail on load, speed
lines resolving behind it. Everything else is quiet: 120–200ms hover transitions, a restrained
scroll reveal. `prefers-reduced-motion` is already handled globally in `globals.css`.

---

## 3. HARD RULES — the work is rejected if any of these appear

- ✗ Isometric or 3D illustrations of trucks, boxes, or delivery people
- ✗ Purple or indigo **anywhere**
- ✗ Cream background with a serif display face
- ✗ Full-page or full-section gradient backgrounds. **The gradient budget for the entire site
  is two placements: the primary CTA, and the completed segment of the tracking rail.**
  Nothing else gets a gradient. Ever.
- ✗ Glassmorphism, neon glow, dark hero
- ✗ Stock photos of western warehouses or smiling couriers with clipboards
- ✗ A hero that is a big number with a small label plus a gradient accent
- ✗ `01/02/03` markers on anything that is not genuinely sequential
- ✗ Every card having the same icon-title-two-lines shape at every scale — **§7 assigns a
  deliberately different card anatomy to each section. Follow it.**
- ✗ Generic copy: "seamless", "cutting-edge", "revolutionize", "بی‌نظیر", "متحول"

### Accessibility, non-negotiable

White text on `brand-500` is **2.73:1 and fails AA**. The primary button is
`bg-brand-500` with `text-content-on-brand` (ink-900) → **5.66:1**. On dark or photographic
backgrounds use `bg-brand-700` with white → **5.18:1**. Never ship white on `brand-500` under
24px.

`content-tertiary` is 4.69:1 on canvas — fine for body, but never put it on a tinted surface
without rechecking.

### The colour invariant

The primary CTA is the **only saturated warm fill on the site**. If a merchant sees a solid
orange rectangle, it is a button. Status chips, alerts and badges use **tinted surfaces only**
(`*-50` background + `*-700` text + a 3px inline-start rail). This is why `warning` is a dark
low-chroma gold (`#8a6508`) and never a fill — it is the one semantic that cannot escape the
brand's hue range, so it is separated by chroma and form instead.

---

## 4. RTL craft — first-class, not a mirroring step

- **Logical properties only.** `ps-*` `pe-*` `ms-*` `me-*` `start-*` `end-*` `border-s-*`
  `text-start` `text-end` `rounded-s-*`. **Never** `pl/pr/ml/mr/left/right/text-left`.
  A code review that finds one physical property fails the file.
- Logo far right, nav flows right to left, **primary CTA to the right of secondary**, card
  icons on the right of their text, process steps run right to left.
- **Forward arrows point LEFT.** Chevrons, "next", step connectors all mirror. Checkmarks,
  clocks, logos and play buttons do not.
- Persian line-height: body 1.7–1.9, headings 1.35–1.5. Already encoded in the type scale — use
  `text-body`, `text-h1` etc. and never override leading.
- **Never** italicise Persian. **Never** set Persian all-caps. **Never** letter-space Persian
  script. Letter-spacing on Persian *numerals* is fine — they do not join.
- Persian numerals everywhere in UI. Route every figure through `lib/format.ts`. No raw Latin
  digit reaches the DOM.
- Latin runs inside Persian sentences (HOTCOD, API, SMS) get `<span className="bidi-isolate">`.

---

## 5. Frozen API — build to these signatures exactly

Agent 1 implements these. Everyone else imports them and **must not change the shape**.
All components are server components unless they need state; mark those `"use client"`.

```ts
// components/ui/Button.tsx
type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost" | "danger";  // default "primary"
  size?: "sm" | "md" | "lg";                                // 36 / 44 / 52px
  loading?: boolean;
  disabled?: boolean;
  href?: string;               // renders <Link> instead of <button>
  iconStart?: React.ReactNode; // "start" = RIGHT in RTL
  iconEnd?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

// components/ui/Card.tsx — the neutral container. Sections restyle via className.
type CardProps = {
  elevation?: 0 | 1 | 2 | 3;   // default 1
  regMarks?: boolean;          // corner registration marks; default false
  as?: React.ElementType;      // default "div"
  className?: string;
  children: React.ReactNode;
};

// components/ui/Figure.tsx — numbers as typography. NEVER print a number without it.
type FigureProps = {
  value: number | string;      // number → formatNumber(); string → used verbatim
  unit?: string;               // "تومان", "شهر", "روز" — rendered at text-num-unit/tertiary
  size?: "xl" | "lg" | "md" | "sm";  // default "md"
  className?: string;
};

// components/ui/TrackingCode.tsx
type TrackingCodeProps = { value: string; prefix?: string; className?: string };

// components/ui/StatusBadge.tsx
type ParcelStatus = "registered" | "collected" | "transit" | "delivered" | "settled";
type StatusBadgeProps = { status: ParcelStatus; className?: string };

// components/ui/Field.tsx — label + control + helper/error, RTL
type FieldProps = {
  label: string;
  htmlFor: string;
  helper?: string;
  error?: string;              // errors say what broke AND how to fix it
  required?: boolean;
  children: React.ReactNode;
};

// components/ui/Input.tsx, Select.tsx  — native controls, styled, forwardRef
// components/ui/CityCombobox.tsx        — "use client", searchable, keyboard-navigable
type CityComboboxProps = {
  id: string;
  value: string | null;
  onChange: (city: string) => void;
  placeholder?: string;
};

// components/ui/Perforation.tsx — <div className="perforation" role="presentation" />
// components/ui/SpeedLines.tsx  — the 12° motif
type SpeedLinesProps = { count?: 1|2|3; direction?: "start" | "end"; className?: string };

// components/ui/Logo.tsx
type LogoProps = { variant?: "full" | "mark"; theme?: "light" | "dark"; className?: string };
```

### The signature element

```ts
// components/TrackingRail.tsx   "use client" (it animates)
type RailStage = { key: ParcelStatus; label: string; meta?: string };

type TrackingRailProps = {
  /** index of the currently-active node, 0-based */
  activeIndex: number;
  /** defaults to the five canonical stages below */
  stages?: RailStage[];
  /**
   *  "live"   — hero. Animates the parcel along the rail once on mount.
   *  "steps"  — the 4-step onboarding section. Static, labels below nodes.
   *  "result" — tracking result page. Vertical on mobile, timestamps per node.
   */
  variant?: "live" | "steps" | "result";
  className?: string;
};
```

Canonical stages, **running right to left** (index 0 is the RIGHTMOST node):

| index | key | label |
|---|---|---|
| 0 | `registered` | ثبت سفارش |
| 1 | `collected` | جمع‌آوری |
| 2 | `transit` | در حال حمل |
| 3 | `delivered` | تحویل شد |
| 4 | `settled` | تسویه شد |

**Rail anatomy** — build it like a transit map, not a progress bar:
- 2px track, `border-default`. The completed portion (from the start/right edge to the active
  node) carries the **one permitted gradient**: `linear-gradient(160deg, #fe8d1a, #fd3f13)`.
- Ruler ticks: 1px × 4px `border-default` hairlines between nodes. This is the detail that
  makes it read as an instrument.
- Node states — **done**: 14px filled circle `ink-900`. **active**: 20px `brand-500` circle,
  6px `ink-900` core, plus a 32px `brand-500/12` halo. **idle**: 10px circle, `surface-raised`
  fill, 2px `border-strong` ring.
- The active node trails three speed lines at 12° pointing **toward the end (left)** — motion
  direction in RTL.
- Labels sit below their node, `text-label` / `content-primary` when reached, `content-tertiary`
  when not. Meta (timestamp) at `text-caption` / `content-tertiary`.
- `variant="live"` animates the parcel from index 0 to `activeIndex` over
  `1400ms var(--ease-transit)`, once, on mount. Nothing else on the page moves during it.

---

## 6. Layout system

- Container: `mx-auto w-full max-w-[1200px] px-5 md:px-10 lg:px-12`.
- Vertical rhythm between sections: `py-20 md:py-28 lg:py-32`.
- Breakpoints: **390 is the base** (design it, don't squeeze it), then `md` 768, `lg` 1024,
  `xl` 1440.
- Every interactive target is ≥44px on mobile.
- Section headings: an `text-overline font-mono text-content-brand` Latin eyebrow (Latin only —
  never Persian in the mono/overline style), then `h2` at `text-h1`, then one `text-body-lg`
  line of `content-secondary`. Max width on that line: `max-w-[60ch]`.

---

## 7. The homepage — section order and assigned card anatomy

Each section gets a **deliberately different anatomy**. This is a hard requirement.

| # | Section | File | Anatomy — do not converge these |
|---|---|---|---|
| 1 | Hero | `sections/Hero.tsx` | Two columns. Right: eyebrow, h1, 3-line max subhead, `[ثبت‌نام]` primary + `[رهگیری مرسوله]` secondary. Left: the rate calculator as a **waybill card** — perforated top edge, registration marks, `shadow-e3`. The live tracking rail spans the full width **below both columns, sitting on the section boundary**. Calculator must be fully visible without scrolling at 1440×900. |
| 2 | Why HOTCOD | `sections/WhyHotcod.tsx` | **Not cards.** A four-row ledger: hairline `border-subtle` rules between rows, a large tabular figure on the left of each row, label + one line on the right. Reads like a spec sheet. |
| 3 | Coverage | `sections/Coverage.tsx` | The differentiator. **One wide dark `ink-900` panel**, full-bleed inside the container, with three `Figure size="xl"` stats in a band and a sparse abstract node-network (SVG dots + hairlines, no map illustration, no clipart). |
| 4 | Platform features | `sections/PlatformFeatures.tsx` | 5 cards, **asymmetric grid**: one wide card spanning 2 columns + 4 standard. Icon sits **top-right**. Two lines of text maximum each. `Card elevation={1}`. |
| 5 | Services | `sections/Services.tsx` | 6 items, **visually lighter than §4**: no border, no shadow, no card background. Just a 2px `brand-500` top rule, a title, one line. Pure typography. |
| 6 | Get started in 4 steps | `sections/GetStarted.tsx` | The tracking rail again, `variant="steps"`, running **right to left**: ثبت‌نام → ثبت سفارش → ارسال → تسویه. Genuinely sequential, so numbered markers ARE allowed here — and only here. |
| 7 | Customers | `sections/Customers.tsx` | Three shapes in one section: a muted logo strip, two testimonial cards (quote-led, no avatar circle cliché — use the merchant's shop name in `text-h4` + city), and a three-up stat band separated by a `perforation` rule. |
| 8 | Latest articles | `sections/Articles.tsx` | 3 cards, anatomy again different: a vertical `brand-500` date rail on the **right** edge of each card, Jalali date in Persian numerals, title, read-time. No icons, no images. |
| 9 | Contact | `sections/Contact.tsx` | Two columns: form on the right (name, shop, phone, message), contact details + social on the left. Submit says exactly what happens. |
| — | Footer | `components/Footer.tsx` | e-namad trust seal placeholder, carrier partner logo placeholders, company registration line, sitemap columns. |
| — | Header | `components/Header.tsx` | Logo far right. Nav RTL. `[ورود]` ghost + `[ثبت‌نام]` primary at the far left. Sticky, `backdrop-blur` **not** glassmorphism — solid `surface-raised/95` with a `border-subtle` bottom hairline once scrolled. Mobile: full-screen sheet, not a dropdown. |

**Perforation budget:** the waybill motifs total **three appearances on the homepage**. They are
spent on: the hero calculator's top edge, the divider above §7's stat band, and the footer's top
edge. Do not add a fourth.

---

## 8. Copy

All UI copy is **Persian**. Write from the merchant's side of the screen: name things by what
they control, plain verbs, active voice, sentence case. Buttons say exactly what happens.
Errors explain what went wrong and how to fix it. Empty states are invitations to act, not
apologies. **Specific beats clever.**

Approved strings you must reuse verbatim where they apply:

- Primary CTA: `ثبت‌نام رایگان`
- Secondary CTA: `رهگیری مرسوله`
- Calculator submit: `محاسبه هزینه ارسال`
- Hero h1: `ارسال پس‌کرایه رو از یک پنل بچرخون`
- Hero subhead: `نرخ شرکت‌های حمل‌ونقل رو مقایسه کن، مرسوله بساز، لحظه‌ای رهگیری کن و پول پس‌کرایه رو سر وقت تحویل بگیر.`
- Coverage headline: `گسترده‌ترین پوشش جغرافیایی بین پلتفرم‌های ارسال`
- Coverage stats: `۱٬۲۴۰ شهر تحت پوشش` · `۳۱ استان` · `۹۸٪ جمعیت کشور`
- Why HOTCOD rows: `۳+ سال سابقه در تجارت الکترونیک` · `پنل هوشمند مدیریت ارسال` ·
  `همکاری با شرکت‌های حمل‌ونقل کشور` · `پشتیبانی تخصصی و اختصاصی`

Invent the rest in the same register. Do not use exclamation marks.

---

## 9. Definition of done for your files

1. `npx tsc --noEmit` passes.
2. `grep -nE '\b(pl-|pr-|ml-|mr-|text-left|text-right|left-|right-|border-l-|border-r-|rounded-l-|rounded-r-)' <your files>` returns **nothing**.
3. No raw Latin digits in rendered strings — everything through `lib/format.ts`.
4. No hex colours, no arbitrary `[#...]` values, no inline font sizes. Tokens only.
5. Every interactive element has a visible `:focus-visible` state (global ring already applies —
   just don't remove outlines) and an accessible name.
6. Renders correctly at **390** and **1440**. Mobile is designed, not squeezed.
7. You did not touch `globals.css`, `layout.tsx`, `lib/format.ts`, or another agent's files.

Report back: files created, deviations from this spec and why, and anything you think is weak.
