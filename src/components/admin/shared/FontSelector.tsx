"use client";

import { useEffect } from "react";

interface FontSelectorProps {
    value: string;
    onChange: (fontFamily: string) => void;
    label?: string;
    className?: string;
}

// Popular Google Fonts and web-safe fonts
const FONT_FAMILIES = [
    // Web-safe fonts
    { name: "Arial", value: "Arial, sans-serif", category: "Sans-serif" },
    { name: "Helvetica", value: "Helvetica, sans-serif", category: "Sans-serif" },
    { name: "Times New Roman", value: "Times New Roman, serif", category: "Serif" },
    { name: "Georgia", value: "Georgia, serif", category: "Serif" },
    { name: "Courier New", value: "Courier New, monospace", category: "Monospace" },
    { name: "Verdana", value: "Verdana, sans-serif", category: "Sans-serif" },

    // Popular Google Fonts
    { name: "Inter", value: "Inter, sans-serif", google: true, category: "Sans-serif" },
    { name: "Roboto", value: "Roboto, sans-serif", google: true, category: "Sans-serif" },
    { name: "Open Sans", value: "Open Sans, sans-serif", google: true, category: "Sans-serif" },
    { name: "Lato", value: "Lato, sans-serif", google: true, category: "Sans-serif" },
    { name: "Montserrat", value: "Montserrat, sans-serif", google: true, category: "Sans-serif" },
    { name: "Poppins", value: "Poppins, sans-serif", google: true, category: "Sans-serif" },
    { name: "Source Sans Pro", value: "Source Sans Pro, sans-serif", google: true, category: "Sans-serif" },
    { name: "Raleway", value: "Raleway, sans-serif", google: true, category: "Sans-serif" },
    { name: "Nunito", value: "Nunito, sans-serif", google: true, category: "Sans-serif" },
    { name: "Playfair Display", value: "Playfair Display, serif", google: true, category: "Serif" },
    { name: "Merriweather", value: "Merriweather, serif", google: true, category: "Serif" },
    { name: "PT Serif", value: "PT Serif, serif", google: true, category: "Serif" },
    { name: "Lora", value: "Lora, serif", google: true, category: "Serif" },
    { name: "Crimson Text", value: "Crimson Text, serif", google: true, category: "Serif" },
    { name: "IBM Plex Sans", value: "IBM Plex Sans, sans-serif", google: true, category: "Sans-serif" },
    { name: "Work Sans", value: "Work Sans, sans-serif", google: true, category: "Sans-serif" },
    { name: "Oswald", value: "Oswald, sans-serif", google: true, category: "Sans-serif" },
    { name: "Rubik", value: "Rubik, sans-serif", google: true, category: "Sans-serif" },
];

// Load Google Fonts dynamically
const loadGoogleFont = (fontName: string) => {
    const fontUrl = `https://fonts.googleapis.com/css2?family=${fontName.replace(/ /g, '+')}:wght@400;500;600;700&display=swap`;

    // Check if font is already loaded
    const existingLink = document.querySelector(`link[href="${fontUrl}"]`);
    if (existingLink) return;

    // Create and append link element
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = fontUrl;
    document.head.appendChild(link);
};

export default function FontSelector({ value, onChange, label, className = "" }: FontSelectorProps) {
    // Load Google Fonts on component mount
    useEffect(() => {
        FONT_FAMILIES.forEach(font => {
            if (font.google) {
                loadGoogleFont(font.name);
            }
        });
    }, []);

    // Load selected font if not already loaded
    useEffect(() => {
        const selectedFont = FONT_FAMILIES.find(f => f.value === value);
        if (selectedFont?.google) {
            loadGoogleFont(selectedFont.name);
        }
    }, [value]);

    // Group fonts by category
    const groupedFonts = FONT_FAMILIES.reduce((acc, font) => {
        if (!acc[font.category]) {
            acc[font.category] = [];
        }
        acc[font.category].push(font);
        return acc;
    }, {} as Record<string, typeof FONT_FAMILIES>);

    return (
        <div className={className}>
            {label && (
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {label}
                </label>
            )}
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#00004d]/20 focus:border-[#00004d] transition-all"
                style={{ fontFamily: value }}
            >
                <option value="">Select a font...</option>
                {Object.entries(groupedFonts).map(([category, fonts]) => (
                    <optgroup key={category} label={category}>
                        {fonts.map((font) => (
                            <option
                                key={font.value}
                                value={font.value}
                                style={{ fontFamily: font.value }}
                            >
                                {font.name} {font.google ? '(Google)' : ''}
                            </option>
                        ))}
                    </optgroup>
                ))}
            </select>

            {/* Font preview */}
            <div className="mt-3 p-3 border border-gray-100 rounded-lg bg-gray-50">
                <p className="text-xs text-gray-500 mb-2">Preview:</p>
                <p style={{ fontFamily: value }} className="text-base text-gray-900">
                    The quick brown fox jumps over the lazy dog
                </p>
                <p style={{ fontFamily: value }} className="text-sm text-gray-700 mt-1">
                    ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789
                </p>
            </div>
        </div>
    );
}
