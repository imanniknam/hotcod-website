/**
 * Number and text formatting for a Persian, right-to-left product.
 *
 * Rule: no raw Latin digit ever reaches the DOM in UI chrome. Every figure
 * goes through one of these. They are pure and safe on the server, so they
 * run during SSR and there is no hydration flash of Latin numerals.
 */

const PERSIAN_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"] as const;

/** U+066C ARABIC THOUSANDS SEPARATOR — not a comma. */
export const THOUSANDS = "٬";
/** U+066B ARABIC DECIMAL SEPARATOR. */
export const DECIMAL = "٫";

/** Converts every Latin digit in a string to its Persian counterpart. */
export function toPersianDigits(input: string | number): string {
  return String(input).replace(/[0-9]/g, (d) => PERSIAN_DIGITS[Number(d)]);
}

/** Converts Persian (and Arabic-Indic) digits back to Latin — for form parsing. */
export function toLatinDigits(input: string): string {
  return input
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660));
}

/**
 * A figure ready to be rendered: Persian digits, U+066C grouping.
 * Use with `<Figure>` so the unit gets its own typographic treatment.
 */
export function formatNumber(value: number): string {
  const [whole, fraction] = Math.abs(value).toString().split(".");
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, THOUSANDS);
  const sign = value < 0 ? "−" : "";
  return toPersianDigits(sign + grouped + (fraction ? DECIMAL + fraction : ""));
}

/** Prices are always whole tomans in this product — no minor unit. */
export function formatToman(value: number): string {
  return formatNumber(Math.round(value));
}

/**
 * Tracking codes group in fours, separated by a thin space (U+2009).
 * Persian numerals do not join, so the letter-spacing applied by the
 * `text-code` style is safe here — the rule that bans tracking on Persian
 * applies to script, not digits.
 */
export function formatTrackingCode(code: string): string {
  const digits = toLatinDigits(code).replace(/\D/g, "");
  const groups = digits.match(/.{1,4}/g) ?? [];
  return toPersianDigits(groups.join(" "));
}

/** Weights read in grams below 1kg and kilograms above it. */
export function formatWeight(grams: number): { value: string; unit: string } {
  if (grams < 1000) return { value: formatNumber(grams), unit: "گرم" };
  const kg = grams / 1000;
  return { value: formatNumber(Number(kg.toFixed(kg % 1 === 0 ? 0 : 1))), unit: "کیلوگرم" };
}

/** "۲ تا ۳ روز کاری" / "۱ روز کاری" */
export function formatDeliveryWindow(minDays: number, maxDays: number): string {
  if (minDays === maxDays) return `${toPersianDigits(minDays)} روز کاری`;
  return `${toPersianDigits(minDays)} تا ${toPersianDigits(maxDays)} روز کاری`;
}

const PERSIAN_MONTHS = [
  "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
  "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند",
] as const;

/** Jalali date from a [year, month, day] tuple. Content is authored, not computed. */
export function formatJalaliDate(year: number, month: number, day: number): string {
  return `${toPersianDigits(day)} ${PERSIAN_MONTHS[month - 1]} ${toPersianDigits(year)}`;
}

/** "۱۴:۳۲" */
export function formatTime(hours: number, minutes: number): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return toPersianDigits(`${pad(hours)}:${pad(minutes)}`);
}
