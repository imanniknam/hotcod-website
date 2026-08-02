import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { formatJalaliDate, toPersianDigits } from "@/lib/format";

/**
 * Copy source: HODCOD-home page.pdf — «Section 07 | وبلاگ».
 * Heading («آخرین مقالات و اخبار») and the supporting line
 * («نمایش آخرین مقالات سایت») are verbatim.
 *
 * ⚠ PLACEHOLDER DATA: the three posts below are stand-ins. The document
 * specifies this section renders the site's latest posts, so this list is
 * replaced by real content at integration.
 *
 * Anatomy, different again: a vertical brand rule on the card's inline START
 * edge (the right, in RTL), a Jalali date, title, read time. No icons.
 */
const POSTS = [
  {
    slug: "cod-vs-prepaid",
    date: [1405, 4, 22] as const,
    title: "پرداخت در محل بهتر است یا پیش‌پرداخت؟",
    minutes: 7,
    kicker: "تحلیل",
  },
  {
    slug: "reduce-returns",
    date: [1405, 4, 9] as const,
    title: "چطور نرخ مرجوعی را بدون از دست دادن مشتری کم کنیم",
    minutes: 5,
    kicker: "راهنما",
  },
  {
    slug: "packaging-costs",
    date: [1405, 3, 28] as const,
    title: "هزینه بسته‌بندی را کجا بی‌دلیل از دست می‌دهید",
    minutes: 6,
    kicker: "راهنما",
  },
];

export function Articles() {
  return (
    <section id="articles" className="pb-20 md:pb-28 lg:pb-32">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-10 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-overline font-mono text-content-brand">JOURNAL</p>
            <h2 className="text-h1 text-content-primary mt-4">آخرین مقالات و اخبار</h2>
            <p className="text-body text-content-secondary mt-3">نمایش آخرین مقالات سایت</p>
          </div>
          <Link
            href="/blog"
            className="text-action-sm text-content-brand hover:text-brand-800 inline-flex items-center gap-1.5"
          >
            همه مقالات
            <Icon name="arrow" size={16} />
          </Link>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {POSTS.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/blog/${p.slug}`}
                className="border-brand-500 hover:bg-surface-raised group block h-full border-s-2 ps-5 transition-colors duration-[200ms] ease-standard"
              >
                <p className="text-caption text-content-tertiary tnum">
                  {formatJalaliDate(p.date[0], p.date[1], p.date[2])} · {p.kicker}
                </p>
                <h3 className="text-h4 text-content-primary group-hover:text-content-brand mt-2 transition-colors duration-[120ms] ease-standard">
                  {p.title}
                </h3>
                <p className="text-caption text-content-tertiary mt-4">
                  {toPersianDigits(p.minutes)} دقیقه مطالعه
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
