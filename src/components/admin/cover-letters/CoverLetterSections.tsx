"use client";

export default function CoverLetterStyle({ formData, setFormData }: any) {
    const style = formData.style || {};

    return (
        <div className="border p-4 rounded space-y-3">
            <h3 className="font-bold">Style</h3>

            {style.font_family !== undefined && (
                <label className="flex flex-col">
                    Font Family
                    <input
                        type="text"
                        value={style.font_family || style.fonts?.body || ""}
                        onChange={(e) => setFormData({ ...formData, style: { ...style, font_family: e.target.value } })}
                        className="border p-2 rounded"
                    />
                </label>
            )}

            {style.font_size !== undefined && (
                <label className="flex flex-col">
                    Font Size
                    <input
                        type="text"
                        value={style.font_size || ""}
                        onChange={(e) => setFormData({ ...formData, style: { ...style, font_size: e.target.value } })}
                        className="border p-2 rounded"
                    />
                </label>
            )}

            {style.color !== undefined && (
                <label className="flex flex-col">
                    Color
                    <input
                        type="color"
                        value={style.color || "#000000"}
                        onChange={(e) => setFormData({ ...formData, style: { ...style, color: e.target.value } })}
                        className="w-16 h-8"
                    />
                </label>
            )}
        </div>
    );
}
