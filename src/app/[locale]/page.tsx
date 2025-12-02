import TestimonialsSection from "@/components/testimonials/TestimonialsSection";
import PricingSection from "@/components/pricing/PricingSection";
import TemplatesSection from "@/components/templates/TemplatesSection";
import FaqSection from "@/components/FAQs/FAQs";
import HeroSection from "@/components/hero/HereoSection";
import AboutSection from "@/components/about/AboutSection";
import AiWriterSection from "@/components/home/AiWriterSection";
import TemplateShowcase from "@/components/templates/TemplateShowcase";
import FeatureCardsSection from "@/components/home/FeatureCardsSection";
import CareerToolboxSection from "@/components/home/CareerToolboxSection";
export default function Home() {
  return (
    <div className="container mx-auto px-6 py-12">
      <HeroSection imageSrc="/heroImage.png" />
      <AiWriterSection />
      <TemplateShowcase />
      <FeatureCardsSection />
      <CareerToolboxSection />
      <FaqSection />
    </div>
  );
}
