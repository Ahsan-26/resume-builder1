import { useTranslations } from "next-intl";
import Image from "next/image";

export default function TemplatesGallery() {
  const t = useTranslations("templates");

  // Mock data
  const templates = [
    { id: 1, titleKey: "template1", image: "/templates/template1.png" },
    { id: 2, titleKey: "template2", image: "/templates/template2.png" },
    { id: 3, titleKey: "template3", image: "/templates/template3.png" },
    { id: 4, titleKey: "template4", image: "/templates/template4.png" }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {templates.map((tpl) => (
        <div key={tpl.id} className="flex flex-col items-center">
          <div className="w-full h-80 relative rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
            <Image src={tpl.image} alt={tpl.titleKey} fill className="object-cover" />
          </div>
          <h3 className="mt-3 font-semibold text-[var(--color-brand-primary)]">
            {t(tpl.titleKey)}
          </h3>
        </div>
      ))}
    </div>
  );
}
