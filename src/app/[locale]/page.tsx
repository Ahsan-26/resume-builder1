import TestimonialsSection from "@/components/testimonials/TestimonialsSection";
import PricingSection from "@/components/pricing/PricingSection";
import TemplatesSection from "@/components/templates/TemplatesSection";
import FaqSection from "@/components/FAQs/FAQs";

export default function Home() {
  return (
    <div className="container mx-auto px-6 py-12">
    <TemplatesSection />
    <PricingSection />
    <TestimonialsSection />
    <FaqSection />  
    </div>
  );
}
