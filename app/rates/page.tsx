import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { RateExplorer } from "@/components/sections/RateExplorer";

export const metadata: Metadata = {
  title: "محاسبه هزینه ارسال",
  description:
    "هزینه ارسال را میان شرکت‌های حمل‌ونقل مقایسه کنید و بهترین گزینه را انتخاب کنید.",
};

export default function RatesPage() {
  return (
    <>
      <PageHeader
        eyebrow="RATE CALCULATOR"
        title="محاسبه هزینه ارسال"
        lead="مقایسه هزینه ارسال میان شرکت‌های حمل‌ونقل و انتخاب بهترین گزینه."
        breadcrumb={[{ href: "/rates", label: "محاسبه هزینه ارسال" }]}
      />
      <RateExplorer />
    </>
  );
}
