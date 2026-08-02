import { forwardRef } from "react";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  invalid?: boolean;
};

/**
 * Native select. The chevron is drawn on the inline END (visually left in
 * RTL) via padding + a background-free pseudo arrow rendered by the caller's
 * wrapper — here we simply reserve the space and kill the platform arrow.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, invalid, children, ...rest },
  ref,
) {
  return (
    <div className="relative">
      <select
        ref={ref}
        aria-invalid={invalid || undefined}
        className={[
          "h-11 w-full appearance-none rounded-sm border bg-surface-raised ps-3.5 pe-10 text-body",
          "text-content-primary transition-colors duration-[120ms] ease-standard",
          invalid
            ? "border-danger-500"
            : "border-border-default hover:border-border-strong focus:border-brand-500",
          "disabled:bg-surface-sunken disabled:text-content-tertiary",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {children}
      </select>
      <svg
        viewBox="0 0 24 24"
        className="text-content-tertiary pointer-events-none absolute inset-y-0 end-3.5 my-auto h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </div>
  );
});
