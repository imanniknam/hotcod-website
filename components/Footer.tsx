import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Perforation } from "@/components/ui/Perforation";
import { toPersianDigits } from "@/lib/format";

/* Link labels mirror the main menu and the services list in
   HODCOD-home page.pdf so wording stays identical across the site. */
const COLUMNS = [
  {
    title: "سایت",
    links: [
      { href: "/", label: "خانه" },
      { href: "/services", label: "خدمات" },
      { href: "/rates", label: "محاسبه هزینه ارسال" },
      { href: "/guide", label: "راهنمای استفاده" },
    ],
  },
  {
    title: "خدمات",
    links: [
      { href: "/services", label: "طراحی فروشگاه اینترنتی" },
      { href: "/services", label: "API فروشگاهی" },
      { href: "/services", label: "انبارداری و لجستیک" },
      { href: "/services", label: "کارتن و ملزومات بسته‌بندی" },
    ],
  },
  {
    title: "شرکت",
    links: [
      { href: "/about", label: "درباره ما" },
      { href: "/blog", label: "وبلاگ" },
      { href: "/tracking", label: "رهگیری مرسولات" },
      { href: "/contact", label: "تماس با ما" },
    ],
  },
];

const CARRIERS = ["پست پیشتاز", "تیپاکس", "چاپار", "ماهکس", "الوپیک"];

export function Footer() {
  return (
    <footer className="bg-surface-canvas mt-auto">
      {/* the third and final perforation on the homepage */}
      <Perforation />

      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 md:px-10 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo className="h-9 w-auto" />
            <p className="text-body-sm text-content-secondary mt-5 max-w-[38ch]">
              پلتفرم ارسال پس‌کرایه برای فروشگاه‌های آنلاین ایران. از ثبت سفارش تا تسویه، در
              یک پنل.
            </p>

            {/* e-namad trust seal — placeholder until the real badge is issued */}
            <div className="mt-7 flex items-center gap-3">
              <div className="border-border-default bg-surface-raised text-caption text-content-tertiary flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-sm border text-center">
                <span className="text-overline font-mono">E-NAMAD</span>
                <span>نماد اعتماد</span>
              </div>
              <div className="border-border-default bg-surface-raised text-caption text-content-tertiary flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-sm border text-center">
                <span className="text-overline font-mono">SAMANDEHI</span>
                <span>ساماندهی</span>
              </div>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title} className="lg:col-span-2">
              <h2 className="text-label text-content-primary">{col.title}</h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-body-sm text-content-secondary hover:text-content-brand transition-colors duration-[120ms] ease-standard"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="lg:col-span-2">
            <h2 className="text-label text-content-primary">شرکای حمل‌ونقل</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {CARRIERS.map((c) => (
                <li key={c} className="text-body-sm text-content-tertiary">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-border-subtle mt-14 flex flex-col gap-3 border-t pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-caption text-content-tertiary tnum">
            شرکت هات‌کد · شماره ثبت {toPersianDigits("۵۸۴۹۲۱")} · شناسه ملی{" "}
            {toPersianDigits("۱۴۰۱۰۹۸۷۶۵۴")}
          </p>
          <p className="text-caption text-content-tertiary tnum">
            © {toPersianDigits("۱۴۰۵")} هات‌کد. همه حقوق محفوظ است.
          </p>
        </div>
      </div>
    </footer>
  );
}
