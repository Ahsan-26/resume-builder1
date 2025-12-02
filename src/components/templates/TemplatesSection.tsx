import TemplateShowcase from "./TemplateShowcase";
import TemplatesGallery from "./TemplatesGallery";
import TemplatesInteractive from "./TemplatesInteractive";

export default function TemplatesSection() {
  return (
    <section className="py-16 bg-[var(--color-brand-background)]">
      <TemplateShowcase />
      <TemplatesGallery />
      <TemplatesInteractive />
    </section>
  );
}
