"use client";

const AREAS = ["header", "left", "right", "full"];

interface Props {
  formData: any;
  setFormData: (cb: any) => void;
}

export default function TemplateSections({ formData, setFormData }: Props) {
  const updateSection = (key: string, field: string, value: any) => {
    setFormData((p: any) => ({
      ...p,
      sections: {
        ...p.sections,
        [key]: {
          ...p.sections[key],
          [field]: value,
        },
      },
    }));
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <h2 className="text-lg font-bold mb-4">Sections</h2>

      <div className="space-y-4">
        {Object.entries(formData.sections).map(([key, section]: any) => (
          <div
            key={key}
            className="border rounded-lg p-4 flex items-center gap-4"
          >
            <strong className="w-40 capitalize">{key.replace("_", " ")}</strong>

            <select
              value={section.area}
              onChange={(e) => updateSection(key, "area", e.target.value)}
              className="border rounded px-2 py-1"
            >
              {AREAS.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>

            <input
              type="number"
              value={section.order}
              onChange={(e) => updateSection(key, "order", +e.target.value)}
              className="w-20 border rounded px-2 py-1"
            />

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={section.visible}
                onChange={(e) =>
                  updateSection(key, "visible", e.target.checked)
                }
              />
              Visible
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
