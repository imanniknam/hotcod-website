import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { TrackingRail } from "@/components/TrackingRail";
import { Button } from "@/components/ui/Button";
import type { RailStage } from "@/lib/types";
import { toPersianDigits } from "@/lib/format";

export const metadata: Metadata = {
  title: "راهنمای استفاده",
};

/**
 * Step LABELS are verbatim from HODCOD-home page.pdf —
 * «Section 05 | راهنمای استفاده از پنل», as is the heading
 * «در چهار مرحله شروع کنید.».
 *
 * ⚠ The explanatory paragraph under each step is NOT in the document and is
 * a placeholder awaiting a panel-guide content document.
 */
const STEPS: RailStage[] = [
  { key: "registered", label: "ثبت‌نام" },
  { key: "collected", label: "ثبت سفارش" },
  { key: "transit", label: "ارسال مرسوله" },
  { key: "settled", label: "تسویه حساب" },
];

const DETAIL = [
  "با شماره موبایل ثبت‌نام کنید و اطلاعات فروشگاه را کامل کنید. تأیید حساب معمولاً کمتر از یک روز کاری طول می‌کشد.",
  "سفارش را تکی ثبت کنید یا فایل سفارش‌ها را یکجا وارد کنید. هزینه ارسال پیش از تأیید نمایش داده می‌شود.",
  "درخواست جمع‌آوری بدهید تا مرسوله از فروشگاه تحویل گرفته شود، یا خودتان به شعبه تحویل دهید.",
  "مبلغ دریافتی از مشتری پس از تحویل، طبق دوره تسویه به حساب فروشگاه واریز می‌شود.",
];

const FAQ = [
  {
    q: "برای شروع باید قرارداد امضا کنم؟",
    a: "خیر. ثبت‌نام آنلاین است و بعد از تکمیل اطلاعات فروشگاه می‌توانید اولین سفارش را ثبت کنید.",
  },
  {
    q: "هزینه ارسال چه زمانی نهایی می‌شود؟",
    a: "نرخ نمایش‌داده‌شده در ماشین‌حساب تقریبی است و در زمان ثبت سفارش بر اساس تعرفه روز شرکت حمل‌ونقل نهایی می‌شود.",
  },
  {
    q: "اگر مشتری مرسوله را تحویل نگیرد چه می‌شود؟",
    a: "مرسوله به فروشگاه برگشت می‌خورد و وضعیت آن در پنل با همان کد رهگیری قابل پیگیری است.",
  },
];

export default function GuidePage() {
  return (
    <>
      <PageHeader
        eyebrow="HOW IT WORKS"
        title="در چهار مرحله شروع کنید."
        breadcrumb={[{ href: "/guide", label: "راهنمای استفاده" }]}
      />

      <section className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-[1200px] px-5 md:px-10 lg:px-12">
          <div className="hidden md:block">
            <TrackingRail variant="steps" activeIndex={3} stages={STEPS} />
          </div>

          <ol className="mt-4 md:mt-20">
            {STEPS.map((s, i) => (
              <li
                key={s.key}
                className="border-border-subtle grid gap-x-8 gap-y-3 border-b py-8 first:border-t md:grid-cols-12 md:items-baseline"
              >
                <span className="text-num-lg text-content-brand tnum md:col-span-1" data-numeric>
                  {toPersianDigits(String(i + 1).padStart(2, "0"))}
                </span>
                <h2 className="text-h3 text-content-primary md:col-span-4">{s.label}</h2>
                <p className="text-body text-content-secondary md:col-span-7">{DETAIL[i]}</p>
              </li>
            ))}
          </ol>

          <h2 className="text-h2 text-content-primary mt-20">پرسش‌های پرتکرار</h2>
          <dl className="border-border-subtle mt-8 border-t">
            {FAQ.map((f) => (
              <div key={f.q} className="border-border-subtle border-b py-6">
                <dt className="text-h4 text-content-primary">{f.q}</dt>
                <dd className="text-body text-content-secondary mt-2 max-w-[70ch]">{f.a}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-14">
            <Button href="/signup" size="lg">
              ثبت‌نام
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
