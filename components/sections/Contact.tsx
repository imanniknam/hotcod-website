"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Icon, type IconName } from "@/components/ui/Icon";
import { toPersianDigits } from "@/lib/format";

const DETAILS: { icon: IconName; label: string; value: string; href?: string }[] = [
  { icon: "phone", label: "تلفن پشتیبانی", value: toPersianDigits("021-45405"), href: "tel:+982145405" },
  { icon: "mail", label: "ایمیل", value: "hello@hotcod.ir", href: "mailto:hello@hotcod.ir" },
  { icon: "map-pin", label: "دفتر مرکزی", value: "تهران، یوسف‌آباد، خیابان اسدآبادی، کوچه اول، پلاک ۲" },
];

const SOCIAL: { icon: IconName; label: string; href: string }[] = [
  { icon: "instagram", label: "اینستاگرام", href: "#" },
  { icon: "telegram", label: "تلگرام", href: "#" },
  { icon: "whatsapp", label: "واتساپ", href: "#" },
];

export function Contact() {
  const uid = useId();
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="bg-surface-raised border-border-subtle border-t py-20 md:py-28 lg:py-32">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-10 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* form on the right — the start of the reading order */}
          <div className="lg:col-span-7">
            <p className="text-overline font-mono text-content-brand">CONTACT</p>
            {/* Copy source: HODCOD-home page.pdf — «Section 08 | تماس با ما».
                The document specifies three displays here: فرم تماس،
                اطلاعات تماس، شبکه‌های اجتماعی. */}
            <h2 className="text-h1 text-content-primary mt-4">با ما در ارتباط باشید.</h2>

            {sent ? (
              <div className="border-s-success-500 bg-success-50 mt-8 rounded-sm border-s-[3px] p-5">
                <p className="text-body text-success-700">
                  پیامت رسید. تا یک روز کاری جواب می‌دیم.
                </p>
              </div>
            ) : (
              <form
                className="mt-8 grid gap-5 sm:grid-cols-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <Field label="نام و نام خانوادگی" htmlFor={`${uid}-name`} required>
                  <Input id={`${uid}-name`} name="name" required autoComplete="name" />
                </Field>
                <Field label="نام فروشگاه" htmlFor={`${uid}-shop`}>
                  <Input id={`${uid}-shop`} name="shop" autoComplete="organization" />
                </Field>
                <Field
                  label="شماره موبایل"
                  htmlFor={`${uid}-phone`}
                  helper="برای هماهنگی تماس می‌گیریم"
                  required
                  className="sm:col-span-2"
                >
                  <Input
                    id={`${uid}-phone`}
                    name="phone"
                    inputMode="tel"
                    required
                    autoComplete="tel"
                    dir="ltr"
                    className="text-end"
                  />
                </Field>
                <Field label="پیام" htmlFor={`${uid}-message`} className="sm:col-span-2">
                  <textarea
                    id={`${uid}-message`}
                    name="message"
                    rows={4}
                    className="border-border-default bg-surface-raised text-body text-content-primary placeholder:text-content-placeholder hover:border-border-strong focus:border-brand-500 w-full rounded-sm border px-3.5 py-3 transition-colors duration-[120ms] ease-standard"
                  />
                </Field>
                <div className="sm:col-span-2">
                  <Button type="submit" size="lg">
                    ارسال پیام
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* details on the left */}
          <div className="lg:col-span-5 lg:pt-16">
            <dl className="border-border-subtle border-t">
              {DETAILS.map((d) => (
                <div key={d.label} className="border-border-subtle flex gap-4 border-b py-5">
                  <span className="text-content-tertiary shrink-0 pt-0.5">
                    <Icon name={d.icon} size={20} />
                  </span>
                  <div>
                    <dt className="text-label text-content-tertiary">{d.label}</dt>
                    <dd className="text-body text-content-primary tnum mt-1">
                      {d.href ? (
                        <a href={d.href} className="hover:text-content-brand" dir={d.icon === "phone" || d.icon === "mail" ? "ltr" : undefined}>
                          {d.value}
                        </a>
                      ) : (
                        d.value
                      )}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>

            <ul className="mt-8 flex gap-3">
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    className="border-border-default text-content-secondary hover:border-brand-500 hover:text-content-brand flex h-11 w-11 items-center justify-center rounded-sm border transition-colors duration-[120ms] ease-standard"
                  >
                    <Icon name={s.icon} size={20} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
