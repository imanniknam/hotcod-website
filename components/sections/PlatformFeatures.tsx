import { Card } from "@/components/ui/Card";
import { Icon, type IconName } from "@/components/ui/Icon";

/**
 * Copy source: HODCOD-home page.pdf — «Section 03 | امکانات سامانه».
 * Heading, all five card titles and all five descriptions are verbatim.
 *
 * Anatomy: an asymmetric grid — one wide card plus four standard ones — with
 * the icon on the TOP-RIGHT (the start corner in RTL). Deliberately a
 * different shape from §4 Services, which is pure typography.
 */
type Feature = { icon: IconName; title: string; body: string; wide?: boolean };

const FEATURES: Feature[] = [
  {
    icon: "calculator",
    title: "محاسبه آنلاین هزینه ارسال",
    body: "مقایسه هزینه ارسال میان شرکت‌های حمل‌ونقل و انتخاب بهترین گزینه.",
    wide: true,
  },
  {
    icon: "truck",
    title: "روش‌های متنوع ارسال و پرداخت",
    body: "ارسال سفارش‌ها با روش‌های مختلف و امکان پرداخت در محل.",
  },
  {
    icon: "package",
    title: "رهگیری و مانیتورینگ مرسولات",
    body: "مشاهده وضعیت سفارش‌ها به‌صورت لحظه‌ای تا زمان تحویل.",
  },
  {
    icon: "bell",
    title: "ارسال پیامک هوشمند",
    body: "اطلاع‌رسانی خودکار وضعیت سفارش به مشتری.",
  },
  {
    icon: "wallet",
    title: "سیستم حسابداری و تسویه",
    body: "مدیریت گزارش‌های مالی و تسویه حساب‌ها از طریق پنل.",
  },
];

export function PlatformFeatures() {
  return (
    <section id="features" className="pb-20 md:pb-28 lg:pb-32">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-10 lg:px-12">
        <p className="text-overline font-mono text-content-brand">PLATFORM</p>
        <h2 className="text-h1 text-content-primary mt-4">
          امکانات <span className="bidi-isolate font-mono">HOTCOD</span>
        </h2>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <Card key={f.title} className={`p-6 md:p-7 ${f.wide ? "lg:col-span-2" : ""}`}>
              <div className="flex items-start justify-between gap-4">
                <div className={f.wide ? "max-w-[46ch]" : ""}>
                  <h3 className="text-h4 text-content-primary">{f.title}</h3>
                  <p className="text-body-sm text-content-secondary mt-2">{f.body}</p>
                </div>
                <span className="bg-brand-50 text-brand-700 flex h-10 w-10 shrink-0 items-center justify-center rounded-sm">
                  <Icon name={f.icon} size={20} />
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
