import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "تماس با ما",
};

/**
 * The homepage contact section is the whole page here — same form, same
 * details, same wording, so the two never drift apart.
 * Heading «با ما در ارتباط باشید.» is verbatim from
 * HODCOD-home page.pdf — «Section 08 | تماس با ما».
 */
export default function ContactPage() {
  return <Contact />;
}
