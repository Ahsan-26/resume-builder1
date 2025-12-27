"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { apiFetch } from "@/lib/apiClient";

import TemplateLayout from "@/components/admin/templates/TemplateLayout";
import TemplateStyle from "@/components/admin/templates/TemplateStyle";
import TemplateSections from "@/components/admin/templates/TemplateSections";
import TemplatePreview from "@/components/admin/templates/TemplatePreview";

interface TemplateFormProps {
    type: "resume" | "cover";
    initialData?: any;
}

export default function TemplateForm({ type, initialData }: TemplateFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        // Basic fields
        id: initialData?.id || "",
        name: initialData?.name || "",
        slug: initialData?.slug || "",
        description: initialData?.description || "",
        category: initialData?.category || "professional",
        is_premium: initialData?.is_premium || false,
        is_active: initialData?.is_active ?? true,
        preview_image_url: initialData?.preview_image_url || "",

        // Layout
        layoutType: initialData?.definition?.layout?.type || "single_column",
        layoutHeader: initialData?.definition?.layout?.header || "top",

        // Style
        fontFamily: initialData?.definition?.style?.font_family || "Inter",
        headingScale: initialData?.definition?.style?.heading_scale || 1.2,
        bodyScale: initialData?.definition?.style?.body_scale || 1,
        primaryColor: initialData?.definition?.style?.primary_color || "#00004d",
        accentColor: initialData?.definition?.style?.accent_color || "#FFF4BC",
        sectionGap: initialData?.definition?.style?.section_gap || 20,
        lineHeight: initialData?.definition?.style?.line_height || 1.5,

        // Sections
        sections: initialData?.definition?.sections || {
            personal_info: { area: "header", order: 0, visible: true },
            work_experiences: { area: "full", order: 1, visible: true },
            educations: { area: "full", order: 2, visible: true },
            skill_categories: { area: "full", order: 3, visible: true },
            strengths: { area: "full", order: 4, visible: true },
            hobbies: { area: "full", order: 5, visible: true },
            custom_sections: { area: "full", order: 6, visible: true },
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            id: formData.id,
            name: formData.name,
            slug: formData.slug,
            description: formData.description,
            category: formData.category,
            is_active: formData.is_active,
            is_premium: formData.is_premium,
            preview_image_url: formData.preview_image_url,
            definition: {
                schema_version: 1,
                layout: { type: formData.layoutType, header: formData.layoutHeader },
                style: {
                    font_family: formData.fontFamily,
                    heading_scale: formData.headingScale,
                    body_scale: formData.bodyScale,
                    primary_color: formData.primaryColor,
                    accent_color: formData.accentColor,
                    section_gap: formData.sectionGap,
                    line_height: formData.lineHeight,
                },
                sections: formData.sections,
            },
        };

        try {
            const endpoint = type === "resume" ? "/admin/templates/" : "/admin/cover-letter-templates/";
            const method = initialData ? "PUT" : "POST";
            const url = initialData ? `${endpoint}${initialData.id}/` : endpoint;

            const res = await apiFetch(url, { method, body: JSON.stringify(payload) });
            if (!res.ok) throw new Error("Failed to save template");

            toast.success(`Template ${initialData ? "updated" : "created"} successfully!`);
            router.push(type === "resume" ? "/admin/resumes" : "/admin/cover-letters");
            router.refresh();
        } catch (err: any) {
            toast.error(err.message || "Error saving template");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Template ID"
                            value={formData.id}
                            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                            className="border rounded px-3 py-2 w-full"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Template Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="border rounded px-3 py-2 w-full"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Slug"
                            value={formData.slug}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                            className="border rounded px-3 py-2 w-full"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="border rounded px-3 py-2 w-full"
                        />
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="border rounded px-3 py-2 w-full"
                        >
                            <option value="professional">Professional</option>
                            <option value="creative">Creative</option>
                            <option value="modern">Modern</option>
                        </select>
                    </div>

                    {/* Layout, Style, Sections */}
                    <TemplateLayout formData={formData} setFormData={setFormData} />
                    <TemplateStyle formData={formData} setFormData={setFormData} />
                    <TemplateSections formData={formData} setFormData={setFormData} />
                </div>

                {/* Live Preview */}
                <TemplatePreview formData={formData} />
            </div>

            {/* Submit */}
            <div className="flex justify-end mt-4">
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#00004d] text-white px-6 py-2 rounded-lg hover:bg-[#002366] flex items-center gap-2"
                >
                    <Save className="w-5 h-5" />
                    {loading ? "Saving..." : "Save Template"}
                </button>
            </div>
        </form>
    );
}
