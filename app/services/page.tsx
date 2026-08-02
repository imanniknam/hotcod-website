import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "خدمات",
};

/**
 * Service TITLES are verbatim from HODCOD-home page.pdf — «Section 04 | خدمات».
 *
 * ⚠ The supporting sentence under each title is NOT in the document — the PDF
 * lists these as bare titles. The lines below are placeholders awaiting a
 * services content document.
 */
const SERVICES: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "package",
    title: "طراحی فروشگاه اینترنتی",
    body: "راه‌اندازی فروشگاه آنلاین با اتصال آماده به سامانه ارسال.",
  },
  {
    icon: "calculator",
    title: "API فروشگاهی",
    body: "اتصال سایت یا اپلیکیشن شما به سرویس ثبت سفارش و رهگیری.",
  },
  {
    icon: "truck",
    title: "انبارداری و لجستیک",
    body: "نگهداری کالا در انبار و ارسال سفارش‌ها به‌جای فروشگاه.",
  },
  {
    icon: "bell",
    title: "تبلیغات",
    body: "معرفی فروشگاه شما به مخاطبان هدف در بسترهای آنلاین.",
  },
  {
    icon: "headset",
    title: "ربات ثبت سفارش",
    body: "ثبت خودکار سفارش از پیام‌رسان بدون ورود دستی اطلاعات.",
  },
  {
    icon: "wallet",
    title: "کارتن و ملزومات بسته‌بندی",
    body: "تأمین کارتن، چسب و برچسب استاندارد با تعرفه عمده.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="SERVICES"
        title="خدمات HOTCOD"
        lead="جز ارسال مرسوله، سرویس‌های دیگری هم هست که می‌توانید برای فروشگاه‌تان فعال کنید."
        breadcrumb={[{ href: "/services", label: "خدمات" }]}
      />

      <section className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-[1200px] px-5 md:px-10 lg:px-12">
          <ul className="border-border-subtle border-t">
            {SERVICES.map((s) => (
              <li
                key={s.title}
                className="border-border-subtle grid gap-x-8 gap-y-3 border-b py-8 md:grid-cols-12 md:items-start"
              >
                <div className="md:col-span-1">
                  <span className="bg-brand-50 text-brand-700 flex h-11 w-11 items-center justify-center rounded-sm">
                    <Icon name={s.icon} size={22} />
                  </span>
                </div>
                <h2 className="text-h3 text-content-primary md:col-span-5">{s.title}</h2>
                <p className="text-body text-content-secondary md:col-span-6">{s.body}</p>
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
