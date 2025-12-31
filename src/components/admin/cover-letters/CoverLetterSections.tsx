"use client";

interface Props {
    formData: any;
    setFormData: (data: any) => void;
}

export default function CoverLetterSections({ formData, setFormData }: Props) {
    const sections = formData.definition.sections || {};

    const toggleVisibility = (key: string) => {
        setFormData({
            ...formData,
            definition: {
                ...formData.definition,
                sections: {
                    ...sections,
                    [key]: { ...sections[key], visible: !sections[key].visible },
                },
            },
        });
    };

    const handleOrderChange = (key: string, value: number) => {
        setFormData({
            ...formData,
            definition: {
                ...formData.definition,
                sections: {
                    ...sections,
                    [key]: { ...sections[key], order: value },
                },
            },
        });
    };

    return (
        <div className="bg-white p-4 rounded shadow-sm space-y-4">
            <h3 className="font-bold text-lg text-[#2f6a46]">Sections</h3>
            <div className="grid gap-3">
                {Object.keys(sections).map((key) => (
                    <div key={key} className="flex items-center justify-between gap-3">
                        <span className="font-medium">{key}</span>
                        <div className="flex gap-2">
                            <input
                                type="number"
                                value={sections[key].order || 0}
                                onChange={(e) => handleOrderChange(key, parseInt(e.target.value))}
                                className="w-16 border rounded px-2 py-1"
                            />
                            <label className="flex items-center gap-1">
                                <input
                                    type="checkbox"
                                    checked={sections[key].visible}
                                    onChange={() => toggleVisibility(key)}
                                    className="h-4 w-4"
                                />
                                Visible
                            </label>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
