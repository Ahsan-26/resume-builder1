"use client";

import AdminCard from "../shared/AdminCard";
import FontSelector from "../shared/FontSelector";

interface Props {
    formData: any;
    setFormData: (data: any) => void;
}

export default function CoverLetterStyle({ formData, setFormData }: Props) {
    const style = formData.definition.style || {};

    const handleChange = (key: string, value: any) => {
        setFormData({
            ...formData,
            definition: {
                ...formData.definition,
                style: { ...style, [key]: value },
            },
        });
    };

    return (
        <AdminCard>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Style Settings</h2>

            <div className="space-y-6">
                {/* Font Family Selector */}
                <FontSelector
                    label="Font Family"
                    value={style.font_family || ""}
                    onChange={(font) => handleChange("font_family", font)}
                />

                {/* Font Size and Color */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Font Size
                        </label>
                        <input
                            type="text"
                            value={style.font_size || ""}
                            onChange={(e) => handleChange("font_size", e.target.value)}
                            placeholder="11pt"
                            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#00004d]/20 focus:border-[#00004d] transition-all"
                        />
                        <p className="text-xs text-gray-500 mt-1">Base font size (e.g., 11pt, 14px)</p>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Text Color
                        </label>
                        <div className="flex gap-3 items-center">
                            <input
                                type="color"
                                value={style.color || "#333333"}
                                onChange={(e) => handleChange("color", e.target.value)}
                                className="h-12 w-16 rounded-lg border border-gray-200 cursor-pointer"
                            />
                            <input
                                type="text"
                                value={style.color || "#333333"}
                                onChange={(e) => handleChange("color", e.target.value)}
                                className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#00004d]/20 focus:border-[#00004d] transition-all font-mono text-sm"
                                placeholder="#333333"
                            />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Main text color</p>
                    </div>
                </div>
            </div>
        </AdminCard>
    );
}
