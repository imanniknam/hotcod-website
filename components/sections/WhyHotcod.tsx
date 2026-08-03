import { Icon } from "@/components/ui/Icon";
import { RateCalculator } from "@/components/sections/RateCalculator";

/**
 * Copy source: HODCOD-home page.pdf — «Section 02 | مزیت‌های اصلی».
 * Heading and all four items are verbatim. The document supplies no
 * supporting sentence for these items, so none is invented — the section is
 * a ledger of four claims and nothing else.
 */
const ITEMS = [
  "بیش از ۳ سال تجربه در تجارت الکترونیک",
  "پنل هوشمند مدیریت ارسال",
  "همکاری با شرکت‌های حمل‌ونقل معتبر",
  "پشتیبانی تخصصی",
];

export function WhyHotcod() {
  return (
    <section className="py-20 md:py-28 lg:py-32">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-10 lg:px-12">
        <p className="text-overline font-mono text-content-brand">WHY HOTCOD</p>
        <h2 className="text-h1 text-content-primary mt-4">
          چرا <span className="bidi-isolate font-mono">HOTCOD</span>؟
        </h2>

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
          <ul className="border-border-subtle border-t lg:col-span-7">
            {ITEMS.map((item) => (
              <li
                key={item}
                className="border-border-subtle flex items-center gap-5 border-b py-7"
              >
                <span className="bg-brand-50 text-brand-700 flex h-9 w-9 shrink-0 items-center justify-center rounded-full">
                  <Icon name="check" size={18} />
                </span>
                <span className="text-h3 text-content-primary">{item}</span>
              </li>
            ))}
          </ul>

          <div className="lg:col-span-5">
            <RateCalculator />
          </div>
        </div>
      </div>
    </section>
  );
}
