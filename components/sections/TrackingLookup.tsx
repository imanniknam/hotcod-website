"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Figure } from "@/components/ui/Figure";
import { Icon } from "@/components/ui/Icon";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { TrackingCode } from "@/components/ui/TrackingCode";
import { TrackingRail } from "@/components/TrackingRail";
import { CANONICAL_STAGES } from "@/lib/types";
import type { ParcelStatus, RailStage } from "@/lib/types";
import { toLatinDigits, toPersianDigits } from "@/lib/format";

type Parcel = {
  code: string;
  status: ParcelStatus;
  activeIndex: number;
  origin: string;
  destination: string;
  carrier: string;
  weightGrams: number;
  cod: number;
  stages: RailStage[];
};

/** Sample parcels — replaced by the tracking API at integration. */
const SAMPLES: Record<string, Parcel> = {
  "4192883077": {
    code: "4192883077",
    status: "transit",
    activeIndex: 2,
    origin: "تهران",
    destination: "مشهد",
    carrier: "تیپاکس",
    weightGrams: 1200,
    cod: 850_000,
    stages: CANONICAL_STAGES.map((s, i) => ({
      ...s,
      meta: [
        "۲۲ تیر ۱۴۰۵ · ۰۸:۱۲",
        "۲۲ تیر ۱۴۰۵ · ۱۰:۴۰",
        "۲۳ تیر ۱۴۰۵ · ۱۳:۰۵",
        "—",
        "—",
      ][i],
    })),
  },
  "8830771549": {
    code: "8830771549",
    status: "delivered",
    activeIndex: 3,
    origin: "اصفهان",
    destination: "شیراز",
    carrier: "چاپار",
    weightGrams: 640,
    cod: 420_000,
    stages: CANONICAL_STAGES.map((s, i) => ({
      ...s,
      meta: [
        "۱۹ تیر ۱۴۰۵ · ۰۹:۳۰",
        "۱۹ تیر ۱۴۰۵ · ۱۴:۰۰",
        "۲۰ تیر ۱۴۰۵ · ۰۸:۱۵",
        "۲۱ تیر ۱۴۰۵ · ۱۱:۴۸",
        "—",
      ][i],
    })),
  },
};

type State =
  | { status: "empty" }
  | { status: "loading" }
  | { status: "invalid"; message: string }
  | { status: "notfound"; code: string }
  | { status: "found"; parcel: Parcel };

export function TrackingLookup() {
  const uid = useId();
  const [code, setCode] = useState("");
  const [state, setState] = useState<State>({ status: "empty" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const digits = toLatinDigits(code).replace(/\D/g, "");

    if (digits.length === 0) {
      setState({ status: "invalid", message: "کد رهگیری را وارد کنید." });
      return;
    }
    if (digits.length !== 10) {
      setState({
        status: "invalid",
        message: `کد رهگیری ۱۰ رقم است؛ شما ${toPersianDigits(digits.length)} رقم وارد کرده‌اید. کد را از پیامک یا پنل کپی کنید.`,
      });
      return;
    }

    setState({ status: "loading" });
    window.setTimeout(() => {
      const parcel = SAMPLES[digits];
      setState(parcel ? { status: "found", parcel } : { status: "notfound", code: digits });
    }, 500);
  };

  return (
    <>
      <section className="bg-surface-raised border-border-subtle border-b">
        <div className="mx-auto w-full max-w-[1200px] px-5 py-8 md:px-10 lg:px-12">
          <form onSubmit={submit} className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <Field
              label="کد رهگیری"
              htmlFor={`${uid}-code`}
              helper="کد ۱۰ رقمی که در پیامک برایتان ارسال شده"
              className="flex-1"
            >
              <Input
                id={`${uid}-code`}
                inputMode="numeric"
                dir="ltr"
                className="text-code font-mono text-start"
                placeholder="۴۱۹۲۸۸۳۰۷۷"
                value={code}
                invalid={state.status === "invalid"}
                onChange={(e) => setCode(toPersianDigits(e.target.value))}
              />
            </Field>
            <Button type="submit" size="lg" loading={state.status === "loading"}>
              رهگیری مرسولات
            </Button>
          </form>

          {state.status === "invalid" ? (
            <p
              role="alert"
              className="border-s-danger-500 bg-danger-50 text-body-sm text-danger-700 mt-5 rounded-sm border-s-[3px] px-4 py-3"
            >
              {state.message}
            </p>
          ) : null}

          <p className="text-caption text-content-tertiary mt-5">
            برای امتحان:{" "}
            <button
              type="button"
              onClick={() => setCode(toPersianDigits("4192883077"))}
              className="text-content-brand font-mono"
              dir="ltr"
            >
              ۴۱۹۲۸۸۳۰۷۷
            </button>
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto w-full max-w-[1200px] px-5 md:px-10 lg:px-12">
          {state.status === "found" ? (
            <>
              <div className="border-border-subtle bg-surface-raised shadow-e1 reg-marks rounded-lg border p-6 md:p-9">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-overline font-mono text-content-tertiary">TRACKING CODE</p>
                    <TrackingCode value={state.parcel.code} prefix="HC" className="mt-2 block" />
                  </div>
                  <StatusBadge status={state.parcel.status} />
                </div>

                <dl className="border-border-subtle mt-8 grid gap-6 border-t pt-7 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <dt className="text-label text-content-tertiary">مسیر</dt>
                    <dd className="text-body text-content-primary mt-1">
                      {state.parcel.origin} ← {state.parcel.destination}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-label text-content-tertiary">شرکت حمل‌ونقل</dt>
                    <dd className="text-body text-content-primary mt-1">{state.parcel.carrier}</dd>
                  </div>
                  <div>
                    <dt className="text-label text-content-tertiary">وزن</dt>
                    <dd className="mt-1">
                      <Figure value={state.parcel.weightGrams} unit="گرم" size="sm" />
                    </dd>
                  </div>
                  <div>
                    <dt className="text-label text-content-tertiary">پرداخت در محل</dt>
                    <dd className="mt-1">
                      <Figure value={state.parcel.cod} unit="تومان" size="sm" />
                    </dd>
                  </div>
                </dl>
              </div>

              {/* the rail's third appearance — the core of this page */}
              <h2 className="text-h3 text-content-primary mt-12">سیر مرسوله</h2>
              <div className="border-border-subtle bg-surface-raised mt-5 rounded-lg border p-6 md:p-9">
                <TrackingRail
                  variant="result"
                  activeIndex={state.parcel.activeIndex}
                  stages={state.parcel.stages}
                />
              </div>
            </>
          ) : state.status === "notfound" ? (
            <div className="border-border-default rounded-lg border border-dashed px-6 py-16 text-center">
              <span className="bg-warning-50 text-warning-700 mx-auto flex h-12 w-12 items-center justify-center rounded-full">
                <Icon name="search" />
              </span>
              <h2 className="text-h3 text-content-primary mt-5">
                مرسوله‌ای با این کد پیدا نشد
              </h2>
              <p className="text-body text-content-secondary mx-auto mt-3 max-w-[52ch]">
                کد{" "}
                <span className="bidi-isolate font-mono">{toPersianDigits(state.code)}</span> در
                سامانه ثبت نشده است. اگر سفارش را همین الان ثبت کرده‌اید، تا ثبت در سامانه شرکت
                حمل‌ونقل کمی طول می‌کشد؛ چند دقیقه دیگر دوباره امتحان کنید.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Button href="/contact" variant="secondary">
                  تماس با ما
                </Button>
              </div>
            </div>
          ) : state.status === "loading" ? (
            <div className="border-border-subtle bg-surface-raised rounded-lg border p-9">
              <span className="sr-only">در حال جست‌وجو</span>
              <div className="bg-surface-sunken h-5 w-48 animate-pulse rounded-xs" />
              <div className="mt-8 grid gap-6 sm:grid-cols-4">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="bg-surface-sunken h-4 w-full animate-pulse rounded-xs" />
                ))}
              </div>
            </div>
          ) : (
            <div className="border-border-default rounded-lg border border-dashed px-6 py-16 text-center">
              <span className="bg-brand-50 text-brand-700 mx-auto flex h-12 w-12 items-center justify-center rounded-full">
                <Icon name="package" />
              </span>
              <h2 className="text-h3 text-content-primary mt-5">کد رهگیری را وارد کنید</h2>
              <p className="text-body text-content-secondary mx-auto mt-2 max-w-[46ch]">
                وضعیت مرسوله را از لحظه ثبت تا تسویه حساب می‌بینید.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
