"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Figure } from "@/components/ui/Figure";
import { Icon } from "@/components/ui/Icon";
import { CITIES, getQuotes, total, type Quote } from "@/lib/rates";
import { formatDeliveryWindow, toLatinDigits, toPersianDigits } from "@/lib/format";

type State =
  | { status: "empty" }
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "done"; quotes: Quote[]; route: string };

/**
 * The rate page. Per the brief, the RESULT is the hero here — the form is a
 * compact bar and the comparison table gets the weight and the width.
 */
export function RateExplorer() {
  const uid = useId();
  const [origin, setOrigin] = useState("تهران");
  const [destination, setDestination] = useState("مشهد");
  const [weight, setWeight] = useState("۱۰۰۰");
  const [cod, setCod] = useState("۸۵۰۰۰۰");
  const [state, setState] = useState<State>({ status: "empty" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const grams = Number(toLatinDigits(weight).replace(/\D/g, ""));
    const codValue = Number(toLatinDigits(cod).replace(/\D/g, ""));

    if (!grams) {
      setState({ status: "error", message: "وزن مرسوله را وارد کنید — مثلاً ۱۰۰۰ برای یک کیلوگرم." });
      return;
    }
    if (grams > 30_000) {
      setState({
        status: "error",
        message: "بیشترین وزن قابل ارسال ۳۰ کیلوگرم است. برای بار سنگین‌تر با پشتیبانی تماس بگیرید.",
      });
      return;
    }

    setState({ status: "loading" });
    window.setTimeout(() => {
      setState({
        status: "done",
        quotes: getQuotes(origin, destination, grams, codValue),
        route: `${origin} ← ${destination}`,
      });
    }, 450);
  };

  return (
    <>
      {/* the form is a bar, not the main event */}
      <section className="bg-surface-raised border-border-subtle border-b">
        <div className="mx-auto w-full max-w-[1200px] px-5 py-8 md:px-10 lg:px-12">
          <form onSubmit={submit} className="grid gap-4 md:grid-cols-5 md:items-end">
            <Field label="مبدأ" htmlFor={`${uid}-o`}>
              <Select id={`${uid}-o`} value={origin} onChange={(e) => setOrigin(e.target.value)}>
                {CITIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </Select>
            </Field>
            <Field label="مقصد" htmlFor={`${uid}-d`}>
              <Select
                id={`${uid}-d`}
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              >
                {CITIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </Select>
            </Field>
            <Field label="وزن" htmlFor={`${uid}-w`} helper="گرم">
              <Input
                id={`${uid}-w`}
                inputMode="numeric"
                value={weight}
                invalid={state.status === "error"}
                onChange={(e) => setWeight(toPersianDigits(e.target.value))}
              />
            </Field>
            <Field label="مبلغ پرداخت در محل" htmlFor={`${uid}-c`} helper="تومان">
              <Input
                id={`${uid}-c`}
                inputMode="numeric"
                value={cod}
                onChange={(e) => setCod(toPersianDigits(e.target.value))}
              />
            </Field>
            <Button type="submit" size="lg" loading={state.status === "loading"}>
              محاسبه هزینه ارسال
            </Button>
          </form>

          {state.status === "error" ? (
            <p
              role="alert"
              className="border-s-danger-500 bg-danger-50 text-body-sm text-danger-700 mt-5 rounded-sm border-s-[3px] px-4 py-3"
            >
              {state.message}
            </p>
          ) : null}
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto w-full max-w-[1200px] px-5 md:px-10 lg:px-12">
          {state.status === "done" ? (
            <>
              <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3">
                <h2 className="text-h2 text-content-primary">
                  {toPersianDigits(state.quotes.length)} گزینه برای این مسیر
                </h2>
                <p className="text-body-sm text-content-tertiary">{state.route}</p>
              </div>

              <div className="border-border-subtle bg-surface-raised shadow-e1 overflow-x-auto rounded-lg border">
                <table className="w-full min-w-[680px] border-collapse">
                  <thead>
                    <tr className="border-border-subtle border-b">
                      <th scope="col" className="text-label text-content-tertiary px-5 py-3.5 text-start">
                        شرکت حمل‌ونقل
                      </th>
                      <th scope="col" className="text-label text-content-tertiary px-5 py-3.5 text-start">
                        زمان تحویل
                      </th>
                      <th scope="col" className="text-label text-content-tertiary px-5 py-3.5 text-end">
                        هزینه ارسال
                      </th>
                      <th scope="col" className="text-label text-content-tertiary px-5 py-3.5 text-end">
                        کارمزد پرداخت در محل
                      </th>
                      <th scope="col" className="text-label text-content-tertiary px-5 py-3.5 text-end">
                        مجموع
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-border-subtle divide-y">
                    {state.quotes.map((q) => (
                      <tr key={q.carrier} className="hover:bg-surface-sunken transition-colors duration-[120ms] ease-standard">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2.5">
                            <span className="text-body text-content-primary">{q.carrier}</span>
                            {q.note ? (
                              <span
                                className={`text-caption rounded-xs px-1.5 py-0.5 ${
                                  q.note === "کم‌هزینه‌ترین"
                                    ? "bg-success-50 text-success-700"
                                    : "bg-info-50 text-info-700"
                                }`}
                              >
                                {q.note}
                              </span>
                            ) : null}
                          </div>
                          <p className="text-caption text-content-tertiary mt-0.5">{q.service}</p>
                        </td>
                        <td className="text-body-sm text-content-secondary tnum px-5 py-4">
                          {formatDeliveryWindow(q.minDays, q.maxDays)}
                        </td>
                        <td className="px-5 py-4 text-end">
                          <Figure value={q.price} size="sm" />
                        </td>
                        <td className="px-5 py-4 text-end">
                          <Figure value={q.codFee} size="sm" />
                        </td>
                        <td className="px-5 py-4 text-end">
                          <Figure value={total(q)} unit="تومان" size="md" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-caption text-content-tertiary mt-4">
                نرخ‌ها تقریبی است و در زمان ثبت سفارش بر اساس تعرفه روز شرکت حمل‌ونقل نهایی می‌شود.
              </p>

              <div className="mt-10">
                <Button href="https://shop.hotcod.ir" size="lg">
                  ورود
                </Button>
              </div>
            </>
          ) : state.status === "loading" ? (
            <div className="border-border-subtle bg-surface-raised rounded-lg border p-6">
              <span className="sr-only">در حال محاسبه</span>
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="border-border-subtle flex items-center justify-between gap-6 border-b py-5 last:border-0"
                >
                  <span className="bg-surface-sunken h-4 w-40 animate-pulse rounded-xs" />
                  <span className="bg-surface-sunken h-4 w-24 animate-pulse rounded-xs" />
                  <span className="bg-surface-sunken h-4 w-28 animate-pulse rounded-xs" />
                </div>
              ))}
            </div>
          ) : (
            /* empty state — an invitation, not an apology */
            <div className="border-border-default rounded-lg border border-dashed px-6 py-16 text-center">
              <span className="bg-brand-50 text-brand-700 mx-auto flex h-12 w-12 items-center justify-center rounded-full">
                <Icon name="calculator" />
              </span>
              <h2 className="text-h3 text-content-primary mt-5">
                مبدأ و مقصد را انتخاب کنید تا نرخ‌ها را ببینید
              </h2>
              <p className="text-body text-content-secondary mx-auto mt-2 max-w-[46ch]">
                هزینه چهار شرکت حمل‌ونقل را کنار هم می‌بینید و خودتان انتخاب می‌کنید.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
