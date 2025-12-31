"use client";

import React from "react";

interface Props {
    formData: any;
}

export default function CoverLetterPreview({ formData }: Props) {
    const { layout, style, sections } = formData.definition || {};

    const sortedSections = Object.keys(sections || {}).sort(
        (a, b) => (sections[a].order || 0) - (sections[b].order || 0)
    );

    return (
        <div
            className="bg-white p-6 rounded-xl border shadow-sm"
            style={{
                fontFamily: style?.font_family || "Arial, sans-serif",
                fontSize: style?.font_size || "11pt",
                color: style?.color || "#333",
                columnGap: layout?.type === "two-column" ? "2rem" : undefined,
            }}
        >
            <h2 className="font-bold mb-4 text-[#2f6a46] text-xl">Live Preview</h2>

            <div className={layout?.type === "two-column" ? "grid grid-cols-2 gap-4" : ""}>
                {sortedSections.map((key) => {
                    const section = sections[key];
                    if (!section.visible) return null;

                    return (
                        <div key={key} className="mb-4 p-2 border rounded">
                            <h4 className="font-semibold mb-1 capitalize text-[#2f6a46]">{key}</h4>
                            <div className="text-gray-700">
                                {section.content || `${key} content placeholder`}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
