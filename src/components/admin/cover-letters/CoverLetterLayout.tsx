"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { apiFetch } from "@/lib/apiClient";

import CoverLetterLayout from "./CoverLetterLayout";
import CoverLetterStyle from "./CoverLetterStyle";
import CoverLetterSections from "./CoverLetterSections";
import CoverLetterPreview from "./CoverLetterPreview";

export default function CoverLetterForm({ initialData }: { initialData?: any }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        id: initialData?.id || "",
        name: initialData?.name || "",
        slug: initialData?.slug || "",
        description: initialData?.description || "",
        category: initialData?.category || "professional",
        is_premium: initialData?.is_premium || false,
        is_active: initialData?.is_active ?? true,
        preview_image_url: initialData?.preview_image_url || "",
        layout: initialData?.definition?.layout || {},
        style: initialData?.definition?.style || {},
        sections: initialData?.definition?.sections || {},
        schema_version: initialData?.definition?.schema_version || 1,
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
                schema_version: formData.schema_version,
                layout: formData.layout,
                style: formData.style,
                sections: formData.sections,
            },
        };

        try {
            const url = initialData
                ? `/api/admin/cover-letter-templates/${initialData.id}/`
                : "/api/admin/cover-letter-templates/";
            const method = initialData ? "PATCH" : "POST";

            const res = await apiFetch(url, { method, body: JSON.stringify(payload) });
            if (!res.ok) throw new Error("Failed to save cover letter template");

            toast.success(`Cover letter template ${initialData ? "updated" : "created"} successfully`);
            router.push("/admin/cover-letters");
            router.refresh();
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Info Inputs */}
                    <div className="space-y-2">
                        <input
                            className="w-full border p-2 rounded"
                            placeholder="Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        <input
                            className="w-full border p-2 rounded"
                            placeholder="Slug"
                            value={formData.slug}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        />
                        <textarea
                            className="w-full border p-2 rounded"
                            placeholder="Description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    {/* Layout / Style / Sections */}
                    <CoverLetterLayout formData={formData} setFormData={setFormData} />
                    <CoverLetterStyle formData={formData} setFormData={setFormData} />
                    <CoverLetterSections formData={formData} setFormData={setFormData} />
                </div>

                {/* Preview */}
                <CoverLetterPreview formData={formData} />
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 disabled:opacity-50"
                >
                    {loading ? "Saving..." : "Save Cover Letter Template"}
                </button>
            </div>
        </form>
    );
}
