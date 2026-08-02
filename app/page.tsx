import { Hero } from "@/components/sections/Hero";
import { WhyHotcod } from "@/components/sections/WhyHotcod";
import { PlatformFeatures } from "@/components/sections/PlatformFeatures";
import { Services } from "@/components/sections/Services";
import { GetStarted } from "@/components/sections/GetStarted";
import { Customers } from "@/components/sections/Customers";
import { Articles } from "@/components/sections/Articles";
import { Contact } from "@/components/sections/Contact";

/**
 * Section order follows HODCOD-home page.pdf — «ساختار صفحه»:
 * Hero · مزیت‌های اصلی · امکانات سامانه · خدمات · نحوه کار · مشتریان ·
 * وبلاگ · تماس با ما.
 *
 * The nationwide-coverage section from the design brief is NOT in that list,
 * so it is not rendered. components/sections/Coverage.tsx is kept in the repo
 * and can be dropped back in with one line.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyHotcod />
      <PlatformFeatures />
      <Services />
      <GetStarted />
      <Customers />
      <Articles />
      <Contact />
    </>
  );
}
