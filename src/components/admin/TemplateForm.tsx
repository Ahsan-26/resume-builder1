"use client";

import { useState, useEffect } from "react";
import { Save, X, Upload, Image as ImageIcon, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/apiClient";
import toast from "react-hot-toast";

interface TemplateFormProps {
    type: "resume" | "cover-letter";
    initialData?: any;
}

export default function TemplateForm({ type, initialData }: TemplateFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        id: initialData?.id || "",
        name: initialData?.name || "",
        slug: initialData?.slug || "",
        description: initialData?.description || "",
        category: initialData?.category || "professional",
        is_premium: initialData?.is_premium || false,
        is_active: initialData?.is_active ?? true,
        preview_image_url: initialData?.preview_image_url || "",
        definition: initialData?.definition ? JSON.stringify(initialData.definition, null, 2) : JSON.stringify({
            schema_version: 1,
            layout: { type: "single-column" },
            style: {
                colors: { primary: "#000000", secondary: "#666666" },
                fonts: { heading: "Inter", body: "Roboto" }
            },
            sections: {
                personal_info: { visible: true, order: 0, area: "header" }
            }
        }, null, 2)
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type: inputType } = e.target;
        const val = inputType === "checkbox" ? (e.target as HTMLInputElement).checked : value;
        setFormData(prev => ({ ...prev, [name]: val }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            let parsedDefinition;
            try {
                parsedDefinition = JSON.parse(formData.definition);
            } catch (err) {
                throw new Error("Invalid JSON in definition field");
            }

            const payload = {
                ...formData,
                definition: parsedDefinition
            };

            const endpoint = type === "resume"
                ? "/admin/templates/"
                : "/admin/cover-letter-templates/";

            const method = initialData ? "PUT" : "POST";
            const url = initialData ? `${endpoint}${initialData.id}/` : endpoint;

            const res = await apiFetch(url, {
                method,
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.detail || JSON.stringify(data) || "Failed to save template");
            }

            toast.success(`Template ${initialData ? "updated" : "created"} successfully!`);
            router.push(type === "resume" ? "/admin/resumes" : "/admin/cover-letters");
            router.refresh();
        } catch (err: any) {
            setError(err.message);
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
                        {initialData ? "Edit" : "Add New"} {type === "resume" ? "Resume" : "Cover Letter"} Template
                    </h1>
                    <p className="text-gray-500 mt-2">Fill in the details to {initialData ? "update" : "create"} a template.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        href={type === "resume" ? "/admin/resumes" : "/admin/cover-letters"}
                        className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#00004d] text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-[#002366] transition-colors shadow-lg shadow-blue-900/20 disabled:opacity-70"
                    >
                        <Save className="w-5 h-5" />
                        <span>{loading ? "Saving..." : "Save Template"}</span>
                    </button>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
                    <div className="text-sm">{error}</div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Basic Info */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Basic Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Template ID (Unique String)</label>
                                <input
                                    name="id"
                                    value={formData.id}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="e.g. classic-1"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00004d]/20 focus:border-[#00004d]"
                                    required
                                    disabled={!!initialData}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Template Name</label>
                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="e.g. Modern Professional"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00004d]/20 focus:border-[#00004d]"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Slug (Optional)</label>
                                <input
                                    name="slug"
                                    value={formData.slug}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="e.g. modern-professional"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00004d]/20 focus:border-[#00004d]"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00004d]/20 focus:border-[#00004d]"
                                >
                                    <option value="professional">Professional</option>
                                    <option value="creative">Creative</option>
                                    <option value="academic">Academic</option>
                                    <option value="simple">Simple</option>
                                </select>
                            </div>
                            <div className="col-span-full space-y-2">
                                <label className="text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={3}
                                    placeholder="Brief description of the template..."
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00004d]/20 focus:border-[#00004d]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Configuration */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Template Definition (JSON)</h2>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <p className="text-xs text-gray-500">Define layout, styles, and section settings.</p>
                                <textarea
                                    name="definition"
                                    value={formData.definition}
                                    onChange={handleChange}
                                    rows={15}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 font-mono text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#00004d]/20 focus:border-[#00004d]"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Status & Options */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Options</h2>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <input
                                    name="is_active"
                                    checked={formData.is_active}
                                    onChange={handleChange}
                                    type="checkbox"
                                    id="is_active"
                                    className="w-4 h-4 text-[#00004d] rounded border-gray-300 focus:ring-[#00004d]"
                                />
                                <label htmlFor="is_active" className="text-sm font-medium text-gray-700">Active (Visible to users)</label>
                            </div>
                            <div className="flex items-center gap-3">
                                <input
                                    name="is_premium"
                                    checked={formData.is_premium}
                                    onChange={handleChange}
                                    type="checkbox"
                                    id="is_premium"
                                    className="w-4 h-4 text-[#00004d] rounded border-gray-300 focus:ring-[#00004d]"
                                />
                                <label htmlFor="is_premium" className="text-sm font-medium text-gray-700">Premium Template</label>
                            </div>
                        </div>
                    </div>

                    {/* Preview Image */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Preview</h2>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Preview Image URL</label>
                                <input
                                    name="preview_image_url"
                                    value={formData.preview_image_url}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="https://example.com/image.png"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00004d]/20 focus:border-[#00004d]"
                                />
                            </div>

                            <div>
                                <p className="text-sm font-medium text-gray-700 mb-2">Image Preview</p>
                                <div className="aspect-[210/297] bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden">
                                    {formData.preview_image_url ? (
                                        <img src={formData.preview_image_url} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <ImageIcon className="w-12 h-12 text-gray-300" />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
