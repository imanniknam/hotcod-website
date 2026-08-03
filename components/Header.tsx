"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";

/**
 * Copy source: HODCOD-home page.pdf — «ساختار منوی اصلی» and «نکات اجرایی / Header».
 * Menu order and button labels are verbatim from the document; the doc requires
 * the button labels to be identical everywhere on the site.
 */
const NAV = [
  { href: "/", label: "خانه" },
  { href: "/services", label: "خدمات" },
  { href: "/rates", label: "محاسبه هزینه ارسال" },
  { href: "/guide", label: "راهنمای استفاده" },
  { href: "/blog", label: "وبلاگ" },
  { href: "/about", label: "درباره ما" },
  { href: "/contact", label: "تماس با ما" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`bg-surface-raised/95 sticky top-0 z-50 backdrop-blur-md transition-shadow duration-[200ms] ease-standard ${
        scrolled ? "border-border-subtle border-b" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-[1200px] items-center gap-4 px-5 md:px-10 lg:px-12">
        {/* Logo sits at the far right — the start of the reading order. */}
        <Link href="/" className="shrink-0" aria-label="HOTCOD، صفحه اصلی">
          <Logo className="h-8 w-auto" />
        </Link>

        <nav aria-label="اصلی" className="hidden flex-1 xl:block">
          <ul className="flex items-center">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-action-sm text-content-secondary hover:text-content-primary hover:bg-surface-sunken rounded-sm px-2.5 py-2 whitespace-nowrap transition-colors duration-[120ms] ease-standard"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* «ورود» is the header's primary CTA — it links out to the merchant dashboard on shop.hotcod.ir. */}
        <div className="ms-auto hidden items-center gap-2 xl:flex">
          <Button href="https://shop.hotcod.ir" size="sm">
            ورود
          </Button>
          <Button href="/tracking" variant="secondary" size="sm">
            رهگیری مرسولات
          </Button>
        </div>

        <button
          type="button"
          className="text-content-primary hover:bg-surface-sunken ms-auto flex h-11 w-11 items-center justify-center rounded-sm xl:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "بستن منو" : "باز کردن منو"}</span>
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>

      {/* Mobile: a full sheet, not a cramped dropdown. */}
      {open ? (
        <div
          id="mobile-nav"
          className="bg-surface-raised fixed inset-x-0 top-[72px] bottom-0 z-50 overflow-y-auto xl:hidden"
        >
          <nav aria-label="اصلی، موبایل" className="px-5 py-6">
            <ul className="flex flex-col">
              {NAV.map((item) => (
                <li key={item.href} className="border-border-subtle border-b">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-h4 text-content-primary flex items-center justify-between py-4"
                  >
                    {item.label}
                    <Icon name="chevron" size={20} className="text-content-tertiary" />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3">
              <Button href="https://shop.hotcod.ir" size="lg" className="w-full">
                ورود
              </Button>
              <Button href="/tracking" variant="secondary" size="lg" className="w-full">
                رهگیری مرسولات
              </Button>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
