import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Icon } from "@/components/ui/Icon";
import { POSTS, getPost } from "@/lib/posts";
import { formatJalaliDate, toPersianDigits } from "@/lib/format";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "مقاله پیدا نشد" };
  return { title: post.title, description: post.excerpt };
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const others = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrow={post.kicker.toUpperCase()}
        title={post.title}
        breadcrumb={[
          { href: "/blog", label: "وبلاگ" },
          { href: `/blog/${post.slug}`, label: post.title },
        ]}
      >
        <p className="text-caption text-content-tertiary tnum mt-6">
          {formatJalaliDate(post.date[0], post.date[1], post.date[2])} ·{" "}
          {toPersianDigits(post.minutes)} دقیقه مطالعه
        </p>
      </PageHeader>

      <article className="py-16 md:py-20">
        <div className="mx-auto w-full max-w-[1200px] px-5 md:px-10 lg:px-12">
          <div className="max-w-[68ch]">
            <p className="text-body-lg text-content-primary">{post.excerpt}</p>
            <div className="border-border-subtle mt-8 border-t pt-8">
              {post.body.map((para) => (
                <p key={para.slice(0, 24)} className="text-body text-content-secondary mb-5">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </article>

      <section className="border-border-subtle border-t py-16 md:py-20">
        <div className="mx-auto w-full max-w-[1200px] px-5 md:px-10 lg:px-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-h2 text-content-primary">مقالات دیگر</h2>
            <Link
              href="/blog"
              className="text-action-sm text-content-brand hover:text-brand-800 inline-flex items-center gap-1.5"
            >
              همه مقالات
              <Icon name="arrow" size={16} />
            </Link>
          </div>

          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {others.map((p) => (
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
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
