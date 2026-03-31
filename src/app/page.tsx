import HeroSection from "@/components/sections/hero";
import BrandStorySection from "@/components/sections/brand-story";
import CategoriesSection from "@/components/sections/categories";
import FeaturedSection from "@/components/sections/featured";
import FeaturesSection from "@/components/sections/features";
import TestimonialsSection from "@/components/sections/testimonials";
import ContactSection from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <HeroSection />
      <BrandStorySection />
      <CategoriesSection />
      <FeaturedSection />
      <FeaturesSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
