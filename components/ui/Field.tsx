import type { ReactNode } from "react";

/**
 * Label + control + helper/error.
 * Errors say what broke AND how to fix it — never a bare "invalid".
 */
export type FieldProps = {
  label: string;
  htmlFor: string;
  helper?: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
};

export function Field({
  label,
  htmlFor,
  helper,
  error,
  required,
  className,
  children,
}: FieldProps) {
  return (
    <div className={["flex flex-col gap-1.5", className].filter(Boolean).join(" ")}>
      <label htmlFor={htmlFor} className="text-label text-content-secondary">
        {label}
        {required ? (
          <span className="text-danger-500 ms-1" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} className="text-caption text-danger-700">
          {error}
        </p>
      ) : helper ? (
        <p id={`${htmlFor}-helper`} className="text-caption text-content-tertiary">
          {helper}
        </p>
      ) : null}
    </div>
  );
}
