import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { toPersianDigits } from "@/lib/format";

export default function NotFound() {
  return (
    <section className="py-24 md:py-32 lg:py-40">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-10 lg:px-12">
        <div className="mx-auto max-w-[52ch] text-center">
          <p
            className="text-num-xl text-content-tertiary tnum font-display"
            data-numeric
            aria-hidden="true"
          >
            {toPersianDigits(404)}
          </p>
          <h1 className="text-h1 text-content-primary mt-4">این صفحه پیدا نشد</h1>
          <p className="text-body text-content-secondary mt-4">
            آدرس را اشتباه وارد کرده‌اید یا صفحه جابه‌جا شده است. اگر دنبال وضعیت یک مرسوله
            هستید، از صفحه رهگیری استفاده کنید.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button href="/" iconEnd={<Icon name="arrow" size={18} />}>
              بازگشت به خانه
            </Button>
            <Button href="/tracking" variant="secondary">
              رهگیری مرسولات
            </Button>
            <Button href="/contact" variant="ghost">
              تماس با ما
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
