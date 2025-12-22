"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Filter, Edit2, Trash2, ExternalLink, MoreVertical, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import { apiFetch } from "@/lib/apiClient";
import toast from "react-hot-toast";

export default function CoverLetterTemplatesPage() {
    const [templates, setTemplates] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchTemplates = async () => {
        try {
            const res = await apiFetch("/admin/cover-letter-templates/");
            if (res.ok) {
                const data = await res.json();
                setTemplates(data.results || data);
            }
        } catch (err) {
            console.error("Failed to fetch templates", err);
            toast.error("Failed to load templates");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTemplates();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this template?")) return;

        try {
            const res = await apiFetch(`/admin/cover-letter-templates/${id}/`, { method: "DELETE" });
            if (res.ok) {
                toast.success("Template deleted");
                fetchTemplates();
            } else {
                toast.error("Failed to delete template");
            }
        } catch (err) {
            toast.error("Error deleting template");
        }
    };

    const filteredTemplates = templates.filter(t =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-[#00004d]">Cover Letter Templates</h1>
                    <p className="text-gray-500 mt-2">Manage and create cover letter templates for your users.</p>
                </div>
                <Link
                    href="/admin/cover-letters/new"
                    className="bg-[#00004d] text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-[#002366] transition-all shadow-lg shadow-blue-900/20 active:scale-95"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add New Template</span>
                </Link>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search templates by name or ID..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00004d]/20 focus:border-[#00004d] transition-all"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-all">
                        <Filter className="w-5 h-5" />
                        <span>Filter</span>
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left border-b border-gray-100">
                                <th className="pb-4 font-semibold text-gray-600 pl-4">Template</th>
                                <th className="pb-4 font-semibold text-gray-600">Category</th>
                                <th className="pb-4 font-semibold text-gray-600">Status</th>
                                <th className="pb-4 font-semibold text-gray-600">Type</th>
                                <th className="pb-4 font-semibold text-gray-600 text-right pr-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="py-8 text-center text-gray-500">Loading templates...</td>
                                </tr>
                            ) : filteredTemplates.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-8 text-center text-gray-500">No templates found.</td>
                                </tr>
                            ) : filteredTemplates.map((template) => (
                                <tr key={template.id} className="group hover:bg-gray-50/50 transition-colors">
                                    <td className="py-4 pl-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-16 bg-gray-100 rounded-lg border border-gray-200 overflow-hidden shrink-0">
                                                {template.preview_image_url ? (
                                                    <img src={template.preview_image_url} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                        <Plus className="w-6 h-6" />
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">{template.name}</p>
                                                <p className="text-xs text-gray-500 font-mono">{template.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4">
                                        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium capitalize">
                                            {template.category}
                                        </span>
                                    </td>
                                    <td className="py-4">
                                        {template.is_active ? (
                                            <div className="flex items-center gap-1.5 text-green-600">
                                                <CheckCircle2 className="w-4 h-4" />
                                                <span className="text-sm font-medium">Active</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1.5 text-gray-400">
                                                <XCircle className="w-4 h-4" />
                                                <span className="text-sm font-medium">Inactive</span>
                                            </div>
                                        )}
                                    </td>
                                    <td className="py-4">
                                        {template.is_premium ? (
                                            <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-medium border border-amber-100">
                                                Premium
                                            </span>
                                        ) : (
                                            <span className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-xs font-medium border border-gray-100">
                                                Free
                                            </span>
                                        )}
                                    </td>
                                    <td className="py-4 pr-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/admin/cover-letters/${template.id}/edit`}
                                                className="p-2 text-gray-400 hover:text-[#00004d] hover:bg-blue-50 rounded-lg transition-all"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(template.id)}
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
