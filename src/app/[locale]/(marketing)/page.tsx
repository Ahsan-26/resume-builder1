import TestimonialsSection from "@/components/testimonials/TestimonialsSection";
import PricingSection from "@/components/pricing/PricingSection";
import TemplatesSection from "@/components/templates/TemplatesSection";
import FaqSection from "@/components/FAQs/FAQs";
import HeroSection from "@/components/hero/HereoSection";
import AboutSection from "@/components/about/AboutSection";
import TemplateShowcase from "@/components/templates/TemplateShowcase";
import CareerToolboxSection from "@/components/home/CareerToolboxSection";
import FinalCtaSection from "@/components/home/FinalCtaSection";
import ResumeBuilderSection from "@/components/resumes/ResumeBuilderSection";
import CoverLetterBuilderSection from "@/components/cover-letter/CoverLetterBuilderSection";
import ResumeCheckerSection from "@/components/resume-checker/ResumeCheckerSection";
import AiResumeWriterSection from "@/components/ai-writer/AiResumeWriterSection";
import AiCoverLetterSection from "@/components/ai-writer/AiCoverLetterSection";
import FeatureCardsSection from "@/components/home/FeatureCardsSection";
import AiWriterSection from "@/components/home/AiWriterSection";
export default function Home() {
  return (
    <div className="container mx-auto px-6 pb-12">
      <HeroSection imageSrc="/heroImage.jpg" />
      <AiWriterSection />
      <ResumeBuilderSection />
      <CoverLetterBuilderSection />
      <FeatureCardsSection />
      <ResumeCheckerSection />
      <AiResumeWriterSection />
      <AiCoverLetterSection />
      <TemplateShowcase />
      <CareerToolboxSection />
      <FaqSection />
      <FinalCtaSection />
    </div>
  );
}
