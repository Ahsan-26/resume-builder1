"use client";

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
        <div className="bg-white p-4 rounded shadow-sm space-y-4">
            <h3 className="font-bold text-lg text-[#2f6a46]">Style</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                    <label className="block text-sm font-medium">Font Family</label>
                    <input
                        type="text"
                        value={style.font_family || ""}
                        onChange={(e) => handleChange("font_family", e.target.value)}
                        className="w-full border rounded px-2 py-1"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Font Size</label>
                    <input
                        type="text"
                        value={style.font_size || ""}
                        onChange={(e) => handleChange("font_size", e.target.value)}
                        placeholder="11pt"
                        className="w-full border rounded px-2 py-1"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Color</label>
                    <input
                        type="color"
                        value={style.color || "#333333"}
                        onChange={(e) => handleChange("color", e.target.value)}
                        className="w-full h-10 p-1 border rounded"
                    />
                </div>
            </div>
        </div>
    );
}
