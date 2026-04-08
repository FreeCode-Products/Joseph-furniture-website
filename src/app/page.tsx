import HeroSection from "@/components/sections/hero";
import BrandStorySection from "@/components/sections/brand-story";
import CategoriesSection from "@/components/sections/categories";

import ContactSection from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <BrandStorySection />

      <ContactSection />
    </>
  );
}
