"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Save } from "lucide-react";

import { apiFetch } from "@/lib/apiClient";
import CoverLetterLayout from "./CoverLetterLayout";
import CoverLetterStyle from "./CoverLetterStyle";
import CoverLetterSections from "./CoverLetterSections";
import CoverLetterPreview from "./CoverLetterPreview";

interface Props {
    initialData?: any;
}

export default function CoverLetterForm({ initialData }: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        id: initialData?.id || undefined,
        name: initialData?.name || "",
        slug: initialData?.slug || "",
        description: initialData?.description || "",
        category: initialData?.category || "professional",
        is_premium: initialData?.is_premium || false,
        is_active: initialData?.is_active ?? true,
        preview_image_url: initialData?.preview_image_url || "",
        definition: initialData?.definition || {
            schema_version: 1,
            layout: { type: "single-column", spacing: "normal", margins: "1in" },
            style: { font_family: "Arial, sans-serif", font_size: "11pt", color: "#333333" },
            sections: { header: { visible: true, order: 0 }, body: { visible: true, order: 1 }, signature: { visible: true, order: 2 } },
        },
    });

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = { ...formData };
            if (!initialData) delete payload.id;

            const url = initialData
                ? `/admin/cover-letter-templates/${initialData.id}/`
                : "/admin/cover-letter-templates/";
            const method = initialData ? "PATCH" : "POST";

            const res = await apiFetch(url, { method, body: JSON.stringify(payload) });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || data.detail || "Failed to save template");

            toast.success(`Cover letter template ${initialData ? "updated" : "created"} successfully`);
            router.push("/admin/cover-letters");
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
                    {/* Basic Info */}
                    <div className="space-y-3">
                        <input type="text" placeholder="Template Name" value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full border rounded px-3 py-2" required />
                        <input type="text" placeholder="Slug" value={formData.slug}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                            className="w-full border rounded px-3 py-2" />
                        <textarea placeholder="Description" value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full border rounded px-3 py-2" />
                    </div>

                    {/* Dynamic Sections */}
                    <CoverLetterLayout formData={formData} setFormData={setFormData} />
                    <CoverLetterStyle formData={formData} setFormData={setFormData} />
                    <CoverLetterSections formData={formData} setFormData={setFormData} />
                </div>

                {/* Preview */}
                <CoverLetterPreview formData={formData} />
            </div>

            <div className="flex justify-end gap-3">
                <button type="submit" disabled={loading} className="bg-[#2f6a46] text-white px-6 py-2 rounded hover:bg-[#245436] transition">
                    <Save className="inline w-5 h-5 mr-2" /> {loading ? "Saving..." : "Save Template"}
                </button>
            </div>
        </form>
    );
}
