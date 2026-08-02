import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { POSTS } from "@/lib/posts";
import { formatJalaliDate, toPersianDigits } from "@/lib/format";

export const metadata: Metadata = {
  title: "وبلاگ",
  description: "آخرین مقالات و اخبار",
};

export default function BlogIndexPage() {
  return (
    <>
      <PageHeader
        eyebrow="JOURNAL"
        title="آخرین مقالات و اخبار"
        lead="نمایش آخرین مقالات سایت"
        breadcrumb={[{ href: "/blog", label: "وبلاگ" }]}
      />

      <section className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-[1200px] px-5 md:px-10 lg:px-12">
          <ul className="grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {POSTS.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="border-brand-500 hover:bg-surface-raised group block h-full border-s-2 ps-5 transition-colors duration-[200ms] ease-standard"
                >
                  <p className="text-caption text-content-tertiary tnum">
                    {formatJalaliDate(p.date[0], p.date[1], p.date[2])} · {p.kicker}
                  </p>
                  <h2 className="text-h4 text-content-primary group-hover:text-content-brand mt-2 transition-colors duration-[120ms] ease-standard">
                    {p.title}
                  </h2>
                  <p className="text-body-sm text-content-secondary mt-2">{p.excerpt}</p>
                  <p className="text-caption text-content-tertiary mt-4">
                    {toPersianDigits(p.minutes)} دقیقه مطالعه
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
