"use client";

import AdminCard from "../shared/AdminCard";
import FontSelector from "../shared/FontSelector";

interface Props {
  formData: any;
  setFormData: (cb: any) => void;
}

export default function TemplateStyle({ formData, setFormData }: Props) {
  return (
    <AdminCard>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Style Settings</h2>

      <div className="space-y-6">
        {/* Font Family Selector */}
        <FontSelector
          label="Font Family"
          value={formData.fontFamily}
          onChange={(font) => setFormData((p: any) => ({ ...p, fontFamily: font }))}
        />

        {/* Typography Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Heading Scale
            </label>
            <input
              type="number"
              step="0.1"
              min="1"
              max="2"
              placeholder="1.2"
              value={formData.headingScale}
              onChange={(e) =>
                setFormData((p: any) => ({ ...p, headingScale: +e.target.value }))
              }
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#00004d]/20 focus:border-[#00004d] transition-all"
            />
            <p className="text-xs text-gray-500 mt-1">Multiplier for heading sizes (e.g., 1.2)</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Body Scale
            </label>
            <input
              type="number"
              step="0.1"
              min="0.8"
              max="1.5"
              placeholder="1"
              value={formData.bodyScale}
              onChange={(e) =>
                setFormData((p: any) => ({ ...p, bodyScale: +e.target.value }))
              }
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#00004d]/20 focus:border-[#00004d] transition-all"
            />
            <p className="text-xs text-gray-500 mt-1">Multiplier for body text size (e.g., 1.0)</p>
          </div>
        </div>

        {/* Spacing Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Section Gap (px)
            </label>
            <input
              type="number"
              min="0"
              max="50"
              placeholder="20"
              value={formData.sectionGap}
              onChange={(e) =>
                setFormData((p: any) => ({ ...p, sectionGap: +e.target.value }))
              }
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#00004d]/20 focus:border-[#00004d] transition-all"
            />
            <p className="text-xs text-gray-500 mt-1">Space between sections in pixels</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Line Height
            </label>
            <input
              type="number"
              step="0.1"
              min="1"
              max="2.5"
              placeholder="1.5"
              value={formData.lineHeight}
              onChange={(e) =>
                setFormData((p: any) => ({ ...p, lineHeight: +e.target.value }))
              }
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#00004d]/20 focus:border-[#00004d] transition-all"
            />
            <p className="text-xs text-gray-500 mt-1">Line spacing multiplier (e.g., 1.5)</p>
          </div>
        </div>

        {/* Color Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Primary Color
            </label>
            <div className="flex gap-3 items-center">
              <input
                type="color"
                value={formData.primaryColor}
                onChange={(e) =>
                  setFormData((p: any) => ({ ...p, primaryColor: e.target.value }))
                }
                className="h-12 w-16 rounded-lg border border-gray-200 cursor-pointer"
              />
              <input
                type="text"
                value={formData.primaryColor}
                onChange={(e) =>
                  setFormData((p: any) => ({ ...p, primaryColor: e.target.value }))
                }
                className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#00004d]/20 focus:border-[#00004d] transition-all font-mono text-sm"
                placeholder="#00004d"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Main brand color for headings</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Accent Color
            </label>
            <div className="flex gap-3 items-center">
              <input
                type="color"
                value={formData.accentColor}
                onChange={(e) =>
                  setFormData((p: any) => ({ ...p, accentColor: e.target.value }))
                }
                className="h-12 w-16 rounded-lg border border-gray-200 cursor-pointer"
              />
              <input
                type="text"
                value={formData.accentColor}
                onChange={(e) =>
                  setFormData((p: any) => ({ ...p, accentColor: e.target.value }))
                }
                className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#00004d]/20 focus:border-[#00004d] transition-all font-mono text-sm"
                placeholder="#FFF4BC"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Secondary color for highlights</p>
          </div>
        </div>
      </div>
    </AdminCard>
  );
}
