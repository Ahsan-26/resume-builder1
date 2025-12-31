"use client";

interface Props {
    formData: any;
    setFormData: (data: any) => void;
}

export default function CoverLetterLayout({ formData, setFormData }: Props) {
    const layout = formData.definition.layout;

    const handleChange = (key: string, value: any) => {
        setFormData({
            ...formData,
            definition: {
                ...formData.definition,
                layout: { ...layout, [key]: value },
            },
        });
    };

    return (
        <div className="bg-white p-4 rounded shadow-sm space-y-4">
            <h3 className="font-bold text-lg text-[#2f6a46]">Layout</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                    <label className="block text-sm font-medium">Type</label>
                    <select
                        value={layout.type || ""}
                        onChange={(e) => handleChange("type", e.target.value)}
                        className="w-full border rounded px-2 py-1"
                    >
                        <option value="single-column">Single Column</option>
                        <option value="two-column">Two Column</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium">Spacing</label>
                    <input
                        type="text"
                        value={layout.spacing || ""}
                        onChange={(e) => handleChange("spacing", e.target.value)}
                        placeholder="normal, tight, wide"
                        className="w-full border rounded px-2 py-1"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Margins</label>
                    <input
                        type="text"
                        value={layout.margins || ""}
                        onChange={(e) => handleChange("margins", e.target.value)}
                        placeholder="1in"
                        className="w-full border rounded px-2 py-1"
                    />
                </div>
            </div>
        </div>
    );
}
