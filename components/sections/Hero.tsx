import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { TrackingRail } from "@/components/TrackingRail";
import { CANONICAL_STAGES } from "@/lib/types";

/**
 * Copy source: HODCOD-home page.pdf — «Section 01 | Hero».
 * H1, description and both CTA labels are verbatim from the document.
 */
const LIVE_STAGES = CANONICAL_STAGES.map((s, i) => ({
  ...s,
  meta: ["۰۸:۱۲", "۱۰:۴۰", "۱۳:۰۵", "—", "—"][i],
}));

export function Hero() {
  return (
    <section className="pt-12 pb-0 md:pt-16 lg:pt-20">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-10 lg:px-12">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Right column — reading starts here in RTL. */}
          <div className="lg:col-span-6 lg:pt-4">
            <p className="text-overline font-mono text-content-brand">
              CASH ON DELIVERY · IRAN-WIDE
            </p>
            <h1 className="text-h1 md:text-display-2 text-content-primary mt-4 text-balance">
              تمام فرآیند ارسال فروشگاهت رو از یک پنل مدیریت کن.
            </h1>
            <p className="text-body text-content-secondary mt-5 max-w-[62ch] text-justify">
              <span className="bidi-isolate font-mono font-medium">HOTCOD</span> یک پلتفرم
              هوشمند مدیریت لجستیک است که به فروشگاه‌های اینترنتی کمک می‌کند سفارش‌هایشان را
              سریع‌تر، ارزان‌تر و با کنترل کامل ارسال کنند؛ از مقایسه آنلاین هزینه ارسال و ثبت
              سفارش گرفته تا رهگیری مرسوله، تسویه مالی و پرداخت در محل.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/signup" size="lg">
                ثبت‌نام
              </Button>
              <Button
                href="/tracking"
                variant="secondary"
                size="lg"
                iconStart={<Icon name="package" size={20} />}
              >
                رهگیری مرسولات
              </Button>
            </div>
          </div>

          {/* Left column — the cash-on-delivery visual, visible without scrolling. */}
          <div className="flex items-center justify-center lg:col-span-6">
            <Image
              src="/cash-on-delivery.png"
              alt="پرداخت پس‌کرایه هات‌کد"
              width={1024}
              height={1024}
              priority
              className="h-auto w-full max-w-[440px]"
            />
          </div>
        </div>
      </div>

      {/* The rail is structural: it sits ON the boundary between the hero and
          the next section rather than inside a container. */}
      <div className="mt-16 md:mt-20 lg:mt-24">
        <div className="mx-auto w-full max-w-[1200px] px-5 md:px-10 lg:px-12">
          <div className="border-border-subtle bg-surface-raised shadow-e1 rounded-lg border px-2 py-8 md:px-6">
            <p className="text-overline font-mono text-content-tertiary mb-6 text-center">
              LIVE PARCEL · HC ۴۱۹۲ ۸۸۳۰ ۷۷۱۵
            </p>
            <TrackingRail variant="live" activeIndex={2} stages={LIVE_STAGES} />
          </div>
        </div>
      </div>
    </section>
  );
}
