"use client";

import TemplatesInteractive from "@/components/templates/TemplatesInteractive";

export default function TemplatePreview({ formData }: { formData: any }) {
  const definition = {
    schema_version: 1,
    layout: {
      type: formData.layoutType,
      header: formData.layoutHeader,
    },
    style: {
      font_family: formData.fontFamily,
      heading_scale: formData.headingScale,
      body_scale: formData.bodyScale,
      primary_color: formData.primaryColor,
      accent_color: formData.accentColor,
      section_gap: formData.sectionGap,
      line_height: formData.lineHeight,
    },
    sections: formData.sections,
  };

  return (
    <div className="bg-white p-4 rounded-xl border shadow-sm">
      <h2 className="font-bold mb-3">Live Preview</h2>
      <TemplatesInteractive definition={definition} />
    </div>
  );
}
