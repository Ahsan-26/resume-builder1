"use client";

interface Props {
  formData: any;
  setFormData: (cb: any) => void;
}

export default function TemplateStyle({ formData, setFormData }: Props) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <h2 className="text-lg font-bold mb-4">Style</h2>

      <div className="grid grid-cols-2 gap-6">
        <input
          type="text"
          placeholder="Font Family"
          value={formData.fontFamily}
          onChange={(e) =>
            setFormData((p: any) => ({ ...p, fontFamily: e.target.value }))
          }
          className="border rounded-lg px-3 py-2"
        />

        <input
          type="number"
          step="0.1"
          placeholder="Heading Scale"
          value={formData.headingScale}
          onChange={(e) =>
            setFormData((p: any) => ({ ...p, headingScale: +e.target.value }))
          }
          className="border rounded-lg px-3 py-2"
        />

        <input
          type="number"
          step="0.1"
          placeholder="Body Scale"
          value={formData.bodyScale}
          onChange={(e) =>
            setFormData((p: any) => ({ ...p, bodyScale: +e.target.value }))
          }
          className="border rounded-lg px-3 py-2"
        />

        <input
          type="number"
          placeholder="Section Gap"
          value={formData.sectionGap}
          onChange={(e) =>
            setFormData((p: any) => ({ ...p, sectionGap: +e.target.value }))
          }
          className="border rounded-lg px-3 py-2"
        />

        <input
          type="number"
          step="0.1"
          placeholder="Line Height"
          value={formData.lineHeight}
          onChange={(e) =>
            setFormData((p: any) => ({ ...p, lineHeight: +e.target.value }))
          }
          className="border rounded-lg px-3 py-2"
        />

        <input
          type="color"
          value={formData.primaryColor}
          onChange={(e) =>
            setFormData((p: any) => ({ ...p, primaryColor: e.target.value }))
          }
        />

        <input
          type="color"
          value={formData.accentColor}
          onChange={(e) =>
            setFormData((p: any) => ({ ...p, accentColor: e.target.value }))
          }
        />
      </div>
    </div>
  );
}
