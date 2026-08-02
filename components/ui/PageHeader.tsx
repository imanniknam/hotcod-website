import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

/**
 * Interior-page masthead. Sits on a raised surface with a hairline bottom so
 * every page below the homepage opens the same way — the calm, repeated
 * frame is what makes the site read as one instrument.
 */
export type PageHeaderProps = {
  eyebrow: string;
  title: string;
  lead?: string;
  breadcrumb?: { href: string; label: string }[];
  children?: React.ReactNode;
};

export function PageHeader({ eyebrow, title, lead, breadcrumb, children }: PageHeaderProps) {
  return (
    <section className="bg-surface-raised border-border-subtle border-b">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-14 md:px-10 md:py-16 lg:px-12 lg:py-20">
        {breadcrumb?.length ? (
          <nav aria-label="مسیر" className="mb-6">
            <ol className="text-caption text-content-tertiary flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-content-brand">
                  خانه
                </Link>
              </li>
              {breadcrumb.map((c) => (
                <li key={c.href} className="flex items-center gap-1.5">
                  {/* forward is LEFT in RTL, so the separator points left */}
                  <Icon name="chevron" size={14} className="shrink-0" />
                  <Link href={c.href} className="hover:text-content-brand">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <p className="text-overline font-mono text-content-brand">{eyebrow}</p>
        <h1 className="text-h1 md:text-display-2 text-content-primary mt-4 text-balance">
          {title}
        </h1>
        {lead ? (
          <p className="text-body-lg text-content-secondary mt-5 max-w-[62ch]">{lead}</p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
