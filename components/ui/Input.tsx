import { forwardRef } from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, invalid, ...rest },
  ref,
) {
  return (
    <input
      ref={ref}
      aria-invalid={invalid || undefined}
      className={[
        "h-11 w-full rounded-sm border bg-surface-raised px-3.5 text-body",
        "text-content-primary placeholder:text-content-placeholder",
        "transition-colors duration-[120ms] ease-standard",
        invalid
          ? "border-danger-500"
          : "border-border-default hover:border-border-strong focus:border-brand-500",
        "disabled:bg-surface-sunken disabled:text-content-tertiary",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    />
  );
});
