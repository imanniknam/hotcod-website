import { TrackingRail } from "@/components/TrackingRail";
import { Button } from "@/components/ui/Button";
import type { RailStage } from "@/lib/types";

/**
 * Copy source: HODCOD-home page.pdf — «Section 05 | راهنمای استفاده از پنل».
 * Heading and the four step labels are verbatim, in the document's order.
 *
 * The rail's second appearance, doing structural work: it IS the four-step
 * flow, running right to left. Genuinely sequential, so the numbered markers
 * the document shows (01–04) are permitted here — and only here.
 */
const STEPS: RailStage[] = [
  { key: "registered", label: "ثبت‌نام" },
  { key: "collected", label: "ثبت سفارش" },
  { key: "transit", label: "ارسال مرسوله" },
  { key: "settled", label: "تسویه حساب" },
];

export function GetStarted() {
  return (
    <section className="bg-surface-raised border-border-subtle border-y py-20 md:py-28 lg:py-32">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-10 lg:px-12">
        <p className="text-overline font-mono text-content-brand">HOW IT WORKS</p>
        <h2 className="text-h1 text-content-primary mt-4">در چهار مرحله شروع کنید.</h2>

        <div className="mt-14 hidden md:block">
          <TrackingRail variant="steps" activeIndex={3} stages={STEPS} />
        </div>

        {/* 390 is designed, not squeezed: the rail turns vertical rather than
            cramming four labels into 350px. */}
        <ol className="mt-10 md:hidden">
          {STEPS.map((s, i) => (
            <li key={s.key} className="flex gap-4 pb-7 last:pb-0">
              <div className="flex w-9 shrink-0 flex-col items-center">
                <span className="tnum border-brand-500 text-content-primary text-num-sm flex h-9 w-9 items-center justify-center rounded-full border-2">
                  {["۰۱", "۰۲", "۰۳", "۰۴"][i]}
                </span>
                {i < STEPS.length - 1 ? (
                  <span className="bg-border-default mt-1 w-0.5 flex-1" />
                ) : null}
              </div>
              <p className="text-h4 text-content-primary pt-1.5">{s.label}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12">
          <Button href="/signup" size="lg">
            ثبت‌نام
          </Button>
        </div>
      </div>
    </section>
  );
}
