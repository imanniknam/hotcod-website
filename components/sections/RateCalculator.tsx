"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Figure } from "@/components/ui/Figure";
import { Perforation } from "@/components/ui/Perforation";
import { Icon } from "@/components/ui/Icon";
import { formatDeliveryWindow, toLatinDigits, toPersianDigits } from "@/lib/format";

const CITIES = [
  "تهران", "مشهد", "اصفهان", "شیراز", "تبریز", "کرج", "اهواز", "قم",
  "کرمانشاه", "رشت", "زاهدان", "همدان", "یزد", "اردبیل", "بندرعباس", "ساری",
];

type Quote = { carrier: string; price: number; minDays: number; maxDays: number; note?: string };

/** Deterministic sample pricing — replaced by the rate API at integration. */
function quote(origin: string, destination: string, grams: number, cod: number): Quote[] {
  const sameCity = origin === destination;
  const base = sameCity ? 38_000 : 62_000;
  const weightStep = Math.max(0, Math.ceil(grams / 500) - 1) * 9_500;
  const codFee = Math.round(cod * 0.01);
  const round = (n: number) => Math.round(n / 500) * 500;

  return [
    {
      carrier: "پست پیشتاز",
      price: round(base * 0.82 + weightStep * 0.9 + codFee),
      minDays: sameCity ? 1 : 3,
      maxDays: sameCity ? 2 : 5,
      note: "ارزان‌ترین",
    },
    {
      carrier: "تیپاکس",
      price: round(base * 1.35 + weightStep * 1.1 + codFee),
      minDays: sameCity ? 1 : 2,
      maxDays: sameCity ? 1 : 3,
      note: "سریع‌ترین",
    },
    {
      carrier: "چاپار",
      price: round(base * 1.12 + weightStep + codFee),
      minDays: sameCity ? 1 : 2,
      maxDays: sameCity ? 2 : 4,
    },
  ].sort((a, b) => a.price - b.price);
}

export function RateCalculator() {
  const uid = useId();
  const [origin, setOrigin] = useState("تهران");
  const [destination, setDestination] = useState("مشهد");
  const [weight, setWeight] = useState("۱۰۰۰");
  const [cod, setCod] = useState("۸۵۰۰۰۰");
  const [results, setResults] = useState<Quote[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const grams = Number(toLatinDigits(weight).replace(/\D/g, ""));
    const codValue = Number(toLatinDigits(cod).replace(/\D/g, ""));
    if (!grams) {
      setError("وزن مرسوله را وارد کن — مثلاً ۱۰۰۰ برای یک کیلوگرم.");
      setResults(null);
      return;
    }
    setError(null);
    setResults(quote(origin, destination, grams, codValue));
  };

  const cheapest = results?.[0]?.price;

  return (
    <div className="reg-marks shadow-e3 border-border-subtle bg-surface-raised relative rounded-lg border">
      {/* The waybill tear edge. */}
      <Perforation className="absolute inset-x-0 top-8" />

      {/* pt clears the tear line at top-8 at every breakpoint */}
      <form onSubmit={submit} className="p-6 pt-14 md:p-8 md:pt-14">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-overline font-mono text-content-brand">RATE CALCULATOR</p>
            <h2 className="text-h3 text-content-primary mt-1.5">محاسبه هزینه ارسال</h2>
          </div>
          <Icon name="calculator" className="text-content-tertiary shrink-0" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="مبدأ" htmlFor={`${uid}-origin`}>
            <Select
              id={`${uid}-origin`}
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            >
              {CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
          </Field>

          <Field label="مقصد" htmlFor={`${uid}-destination`}>
            <Select
              id={`${uid}-destination`}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            >
              {CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
          </Field>

          <Field label="وزن" htmlFor={`${uid}-weight`} helper="به گرم">
            <Input
              id={`${uid}-weight`}
              inputMode="numeric"
              value={weight}
              invalid={Boolean(error)}
              onChange={(e) => setWeight(toPersianDigits(e.target.value))}
            />
          </Field>

          <Field label="مبلغ پس‌کرایه" htmlFor={`${uid}-cod`} helper="تومان">
            <Input
              id={`${uid}-cod`}
              inputMode="numeric"
              value={cod}
              onChange={(e) => setCod(toPersianDigits(e.target.value))}
            />
          </Field>
        </div>

        {error ? (
          <p role="alert" className="text-caption text-danger-700 mt-3">
            {error}
          </p>
        ) : null}

        <Button type="submit" size="lg" className="mt-6 w-full">
          محاسبه هزینه ارسال
        </Button>
      </form>

      {/* The result is the point of this widget, so it gets the weight. */}
      {results ? (
        <div className="border-border-subtle border-t">
          <ul className="divide-border-subtle divide-y">
            {results.map((r) => (
              <li
                key={r.carrier}
                className="flex items-center justify-between gap-4 px-6 py-3.5 md:px-8"
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className="text-body-sm text-content-primary truncate">{r.carrier}</span>
                  {r.note ? (
                    <span
                      className={`text-caption shrink-0 rounded-xs px-1.5 py-0.5 ${
                        r.price === cheapest
                          ? "bg-success-50 text-success-700"
                          : "bg-surface-sunken text-content-secondary"
                      }`}
                    >
                      {r.note}
                    </span>
                  ) : null}
                </div>
                <div className="flex shrink-0 items-center gap-5">
                  <span className="text-caption text-content-tertiary tnum hidden sm:inline">
                    {formatDeliveryWindow(r.minDays, r.maxDays)}
                  </span>
                  <Figure value={r.price} unit="تومان" size="md" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="border-border-subtle text-caption text-content-tertiary border-t px-6 py-4 md:px-8">
          نرخ سه شرکت حمل‌ونقل را کنار هم می‌بینی و خودت انتخاب می‌کنی.
        </div>
      )}
    </div>
  );
}
