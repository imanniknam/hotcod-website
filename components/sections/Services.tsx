import { Icon } from "@/components/ui/Icon";

/**
 * Copy source: HODCOD-home page.pdf — «Section 04 | خدمات».
 * Heading and all six items verbatim. The document lists these as bare
 * titles with no supporting line, so none is invented.
 *
 * Anatomy: deliberately lighter than §3. No card, no border, no shadow — a
 * 2px brand rule on top and the title. Pure typography.
 */
const SERVICES = [
  "طراحی فروشگاه اینترنتی",
  "API فروشگاهی",
  "انبارداری و لجستیک",
  "تبلیغات",
  "ربات ثبت سفارش",
  "کارتن و ملزومات بسته‌بندی",
];

export function Services() {
  return (
    <section id="services" className="pb-20 md:pb-28 lg:pb-32">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-10 lg:px-12">
        <p className="text-overline font-mono text-content-brand">SERVICES</p>
        <h2 className="text-h1 text-content-primary mt-4">
          خدمات <span className="bidi-isolate font-mono">HOTCOD</span>
        </h2>

        <ul className="mt-12 grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <li key={s} className="border-brand-500 border-t-2 pt-4">
              <h3 className="text-h4 text-content-primary flex items-center justify-between gap-3">
                {s}
                <Icon name="arrow" size={18} className="text-content-tertiary shrink-0" />
              </h3>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
