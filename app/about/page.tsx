import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Figure } from "@/components/ui/Figure";
import { Button } from "@/components/ui/Button";
import { Perforation } from "@/components/ui/Perforation";

export const metadata: Metadata = {
  title: "درباره ما",
};

/**
 * ⚠ PLACEHOLDER CONTENT. HODCOD-home page.pdf covers the homepage only and
 * says nothing about this page. Everything below is stand-in copy awaiting an
 * about-page content document. The only line reused from the PDF is the
 * platform description in «Section 01 | Hero».
 */
const STATS = [
  { value: 4800, unit: "فروشگاه فعال" },
  { value: 1900000, unit: "مرسوله ارسال‌شده" },
  { value: 24, unit: "شهر با پوشش مستقیم" },
];

const VALUES = [
  {
    title: "قیمت را پنهان نمی‌کنیم",
    body: "هزینه ارسال و کارمزد پیش از ثبت سفارش کامل نمایش داده می‌شود. هیچ رقمی بعداً اضافه نمی‌شود.",
  },
  {
    title: "پول فروشنده سر وقت برمی‌گردد",
    body: "دوره تسویه مشخص است و تغییر نمی‌کند. جریان نقدی فروشگاه نباید گروگان ما باشد.",
  },
  {
    title: "پشتیبانی یعنی یک نفر مشخص",
    body: "به هر فروشگاه کارشناس ثابت وصل می‌شود؛ لازم نیست هر بار ماجرا را از اول تعریف کنید.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="ABOUT"
        title="ما زیرساخت ارسال فروشگاه‌های اینترنتی هستیم"
        lead="HOTCOD یک پلتفرم هوشمند مدیریت لجستیک است که به فروشگاه‌های اینترنتی کمک می‌کند سفارش‌هایشان را سریع‌تر، ارزان‌تر و با کنترل کامل ارسال کنند."
        breadcrumb={[{ href: "/about", label: "درباره ما" }]}
      />

      <section className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-[1200px] px-5 md:px-10 lg:px-12">
          <div className="max-w-[68ch]">
            <p className="text-body text-content-secondary">
              کار ما از یک مشاهده ساده شروع شد: بیشتر فروشنده‌های اینترنتی ایران وقت زیادی صرف
              کارهایی می‌کنند که هیچ ربطی به فروش ندارد — گرفتن نرخ از چند شرکت حمل‌ونقل، ثبت
              دستی سفارش، پیگیری تلفنی مرسوله و جمع کردن پول پرداخت در محل.
            </p>
            <p className="text-body text-content-secondary mt-5">
              همه اینها را در یک پنل جمع کردیم تا فروشنده به‌جای هماهنگی، روی فروش وقت بگذارد.
            </p>
          </div>

          <Perforation className="mt-16" />

          <dl className="grid gap-8 pt-10 sm:grid-cols-3">
            {STATS.map((s) => (
              <div key={s.unit}>
                <dd>
                  <Figure value={s.value} size="xl" />
                </dd>
                <dt className="text-body-sm text-content-secondary mt-2">{s.unit}</dt>
              </div>
            ))}
          </dl>

          <h2 className="text-h2 text-content-primary mt-20">چیزی که سرش کوتاه نمی‌آییم</h2>
          <ul className="border-border-subtle mt-8 border-t">
            {VALUES.map((v) => (
              <li
                key={v.title}
                className="border-border-subtle grid gap-x-8 gap-y-2 border-b py-7 md:grid-cols-12 md:items-baseline"
              >
                <h3 className="text-h4 text-content-primary md:col-span-5">{v.title}</h3>
                <p className="text-body text-content-secondary md:col-span-7">{v.body}</p>
              </li>
            ))}
          </ul>

          <div className="mt-14 flex flex-col gap-3 sm:flex-row">
            <Button href="/signup" size="lg">
              ثبت‌نام
            </Button>
            <Button href="/contact" variant="secondary" size="lg">
              تماس با ما
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
