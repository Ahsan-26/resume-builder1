"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Save } from "lucide-react";

import { apiFetch } from "@/lib/apiClient";
import AdminCard from "@/components/admin/shared/AdminCard";
import AdminButton from "@/components/admin/shared/AdminButton";
import AdminFormField from "@/components/admin/shared/AdminFormField";
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
        id: initialData?.id || "",
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

            const url = initialData
                ? `/admin/cover-letter-templates/${initialData.id}/`
                : "/admin/cover-letter-templates/";
            const method = initialData ? "PUT" : "POST";

            const res = await apiFetch(url, { method, body: JSON.stringify(payload) });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || data.detail || JSON.stringify(data) || "Failed to save template");
            }

            toast.success(`Cover letter template ${initialData ? "updated" : "created"} successfully`);
            router.push("/admin/cover-letters");
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-[#00004d]">
                        {initialData ? "Edit Cover Letter Template" : "Create Cover Letter Template"}
                    </h1>
                    <p className="text-gray-500 mt-2">Configure template settings and styling options.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Info */}
                    <AdminCard>
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Basic Information</h2>
                        <div className="space-y-4">
                            <AdminFormField
                                label="Template ID"
                                required
                                helpText={initialData ? "ID cannot be changed after creation" : "Unique identifier (e.g., standard-1)"}
                                htmlFor="template-id"
                            >
                                <input
                                    id="template-id"
                                    type="text"
                                    placeholder="standard-1"
                                    value={formData.id}
                                    onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#00004d]/20 focus:border-[#00004d] transition-all disabled:bg-gray-50 disabled:text-gray-500"
                                    required
                                    disabled={!!initialData}
                                />
                            </AdminFormField>

                            <AdminFormField label="Template Name" required htmlFor="template-name">
                                <input
                                    id="template-name"
                                    type="text"
                                    placeholder="Professional Cover Letter"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#00004d]/20 focus:border-[#00004d] transition-all"
                                    required
                                />
                            </AdminFormField>

                            <AdminFormField label="Slug" helpText="Auto-generated from name if left empty" htmlFor="template-slug">
                                <input
                                    id="template-slug"
                                    type="text"
                                    placeholder="professional-cover-letter"
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#00004d]/20 focus:border-[#00004d] transition-all"
                                />
                            </AdminFormField>

                            <AdminFormField label="Description" htmlFor="template-description">
                                <textarea
                                    id="template-description"
                                    placeholder="A professional cover letter template suitable for corporate positions..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#00004d]/20 focus:border-[#00004d] transition-all resize-none"
                                    rows={3}
                                />
                            </AdminFormField>

                            <AdminFormField label="Category" required htmlFor="template-category">
                                <select
                                    id="template-category"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#00004d]/20 focus:border-[#00004d] transition-all"
                                >
                                    <option value="professional">Professional</option>
                                    <option value="creative">Creative</option>
                                    <option value="modern">Modern</option>
                                </select>
                            </AdminFormField>

                            <div className="flex items-center gap-6">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.is_premium}
                                        onChange={(e) => setFormData({ ...formData, is_premium: e.target.checked })}
                                        className="w-4 h-4 rounded border-gray-300 text-[#00004d] focus:ring-[#00004d]/20"
                                    />
                                    <span className="text-sm font-medium text-gray-700">Premium Template</span>
                                </label>

                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.is_active}
                                        onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                        className="w-4 h-4 rounded border-gray-300 text-[#00004d] focus:ring-[#00004d]/20"
                                    />
                                    <span className="text-sm font-medium text-gray-700">Active</span>
                                </label>
                            </div>
                        </div>
                    </AdminCard>

                    {/* Layout, Style, Sections */}
                    <CoverLetterLayout formData={formData} setFormData={setFormData} />
                    <CoverLetterStyle formData={formData} setFormData={setFormData} />
                    <CoverLetterSections formData={formData} setFormData={setFormData} />
                </div>

                {/* Preview */}
                <div className="lg:col-span-1">
                    <div className="sticky top-6">
                        <CoverLetterPreview formData={formData} />
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-3">
                <AdminButton
                    type="button"
                    variant="secondary"
                    onClick={() => router.push("/admin/cover-letters")}
                >
                    Cancel
                </AdminButton>
                <AdminButton
                    type="submit"
                    variant="primary"
                    loading={loading}
                    icon={<Save className="w-5 h-5" />}
                >
                    {initialData ? "Update" : "Create"} Template
                </AdminButton>
            </div>
        </form>
    );
}
