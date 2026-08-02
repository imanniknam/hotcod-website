import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { TrackingLookup } from "@/components/sections/TrackingLookup";

export const metadata: Metadata = {
  title: "رهگیری مرسولات",
  description: "مشاهده وضعیت سفارش‌ها به‌صورت لحظه‌ای تا زمان تحویل.",
};

export default function TrackingPage() {
  return (
    <>
      <PageHeader
        eyebrow="TRACKING"
        title="رهگیری مرسولات"
        lead="مشاهده وضعیت سفارش‌ها به‌صورت لحظه‌ای تا زمان تحویل."
        breadcrumb={[{ href: "/tracking", label: "رهگیری مرسولات" }]}
      />
      <TrackingLookup />
    </>
  );
}
