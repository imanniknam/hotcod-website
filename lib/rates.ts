/**
 * Sample rate engine. Deterministic so the UI is stable to look at and to
 * test; replaced by the real carrier rate API at integration. Every number
 * it returns is a whole toman.
 */
export type Quote = {
  carrier: string;
  service: string;
  price: number;
  codFee: number;
  minDays: number;
  maxDays: number;
  note?: string;
};

export const CITIES = [
  "تهران", "مشهد", "اصفهان", "شیراز", "تبریز", "کرج", "اهواز", "قم",
  "کرمانشاه", "رشت", "زاهدان", "همدان", "یزد", "اردبیل", "بندرعباس", "ساری",
  "کرمان", "ارومیه", "زنجان", "بجنورد", "خرم‌آباد", "سنندج", "بوشهر", "گرگان",
];

export function getQuotes(
  origin: string,
  destination: string,
  grams: number,
  cod: number,
): Quote[] {
  const sameCity = origin === destination;
  const base = sameCity ? 38_000 : 62_000;
  const weightStep = Math.max(0, Math.ceil(grams / 500) - 1) * 9_500;
  const codFee = Math.round((cod * 0.01) / 500) * 500;
  const round = (n: number) => Math.round(n / 500) * 500;

  const rows: Quote[] = [
    {
      carrier: "پست پیشتاز",
      service: "زمینی",
      price: round(base * 0.82 + weightStep * 0.9),
      codFee,
      minDays: sameCity ? 1 : 3,
      maxDays: sameCity ? 2 : 5,
    },
    {
      carrier: "تیپاکس",
      service: "اکسپرس",
      price: round(base * 1.35 + weightStep * 1.1),
      codFee,
      minDays: sameCity ? 1 : 2,
      maxDays: sameCity ? 1 : 3,
    },
    {
      carrier: "چاپار",
      service: "استاندارد",
      price: round(base * 1.12 + weightStep),
      codFee,
      minDays: sameCity ? 1 : 2,
      maxDays: sameCity ? 2 : 4,
    },
    {
      carrier: "ماهکس",
      service: "استاندارد",
      price: round(base * 1.04 + weightStep * 1.05),
      codFee,
      minDays: sameCity ? 1 : 3,
      maxDays: sameCity ? 2 : 4,
    },
  ].sort((a, b) => a.price + a.codFee - (b.price + b.codFee));

  const fastest = rows.reduce((a, b) => (b.maxDays < a.maxDays ? b : a));
  rows[0].note = "کم‌هزینه‌ترین";
  if (fastest !== rows[0]) fastest.note = "سریع‌ترین";

  return rows;
}

export const total = (q: Quote) => q.price + q.codFee;
