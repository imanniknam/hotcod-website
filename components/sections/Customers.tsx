import { Card } from "@/components/ui/Card";
import { Figure } from "@/components/ui/Figure";
import { Perforation } from "@/components/ui/Perforation";

/**
 * Copy source: HODCOD-home page.pdf — «Section 06 | مشتریان».
 * The heading is verbatim. The document specifies the three things to show
 * — لوگوی مشتریان، نظرات مشتریان، آمار همکاری — but supplies no shop names,
 * quotes or figures.
 *
 * ⚠ PLACEHOLDER DATA: everything in SHOPS, TESTIMONIALS and STATS below is
 * stand-in content awaiting the real values. Nothing here is from the PDF.
 */
const SHOPS = ["ترمه", "کاژه", "بوتیک نارنج", "دیجی‌لوازم", "خانه چرم", "آوند"];

const TESTIMONIALS = [
  {
    quote:
      "قبلاً هر روز صبح یک ساعت وقت می‌ذاشتم برای پیگیری مرسوله‌ها. الان فقط پنل رو باز می‌کنم و می‌بینم کدوم تحویل شده.",
    shop: "بوتیک نارنج",
    city: "اصفهان",
  },
  {
    quote:
      "مقایسه نرخ قبل از ثبت سفارش باعث شد هزینه ارسال ماهانه‌مون محسوس کم بشه.",
    shop: "ترمه",
    city: "مشهد",
  },
];

const STATS = [
  { value: 4800, unit: "فروشگاه فعال" },
  { value: 1900000, unit: "مرسوله ارسال‌شده" },
  { value: "۹۶٪", unit: "تحویل موفق" },
];

export function Customers() {
  return (
    <section className="py-20 md:py-28 lg:py-32">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-10 lg:px-12">
        <p className="text-overline font-mono text-content-brand">CUSTOMERS</p>
        <h2 className="text-h1 text-content-primary mt-4">
          مشتریان <span className="bidi-isolate font-mono">HOTCOD</span>
        </h2>

        {/* لوگوی مشتریان — placeholders until the real marks land */}
        <ul className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-5">
          {SHOPS.map((s) => (
            <li
              key={s}
              className="text-h4 text-content-tertiary opacity-70 transition-opacity duration-[200ms] ease-standard hover:opacity-100"
            >
              {s}
            </li>
          ))}
        </ul>

        {/* نظرات مشتریان */}
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <Card key={t.shop} regMarks className="p-7 md:p-9">
              <p className="text-body-lg text-content-primary">«{t.quote}»</p>
              <footer className="border-border-subtle mt-6 flex items-baseline gap-2 border-t pt-4">
                <span className="text-h4 text-content-primary">{t.shop}</span>
                <span className="text-caption text-content-tertiary">{t.city}</span>
              </footer>
            </Card>
          ))}
        </div>

        <Perforation className="mt-16" />

        {/* آمار همکاری */}
        <dl className="grid gap-8 pt-10 sm:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.unit}>
              <dd>
                {typeof s.value === "number" ? (
                  <Figure value={s.value} size="xl" />
                ) : (
                  <span className="text-num-xl text-content-primary font-display tnum" data-numeric>
                    {s.value}
                  </span>
                )}
              </dd>
              <dt className="text-body-sm text-content-secondary mt-2">{s.unit}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
