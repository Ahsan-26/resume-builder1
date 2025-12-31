"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { apiFetch } from "@/lib/apiClient";

export default function CoverLetterList() {
    const router = useRouter();
    const [templates, setTemplates] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTemplates = async () => {
        setLoading(true);
        try {
            const res = await apiFetch("/admin/cover-letter-templates/");
            const data = await res.json();
            setTemplates(data);
        } catch {
            toast.error("Failed to fetch templates");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchTemplates(); }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this template?")) return;
        try {
            const res = await apiFetch(`/admin/cover-letter-templates/${id}/`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete template");
            toast.success("Template deleted successfully");
            fetchTemplates();
        } catch (err: any) {
            toast.error(err.message);
        }
    };

    const handleToggleActive = async (id: string, active: boolean) => {
        try {
            const res = await apiFetch(`/admin/cover-letter-templates/${id}/toggle-active/`, {
                method: "PATCH",
                body: JSON.stringify({ is_active: !active }),
            });
            if (!res.ok) throw new Error("Failed to update template status");
            toast.success("Template status updated");
            fetchTemplates();
        } catch (err: any) {
            toast.error(err.message);
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-[#2f6a46]">Cover Letter Templates</h1>
            <button
                onClick={() => router.push("/admin/cover-letters/new")}
                className="bg-[#2f6a46] text-white px-4 py-2 rounded hover:bg-[#245436] transition"
            >
                + Add New Template
            </button>

            {loading ? <p>Loading...</p> : (
                <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {templates.map((t) => (
                        <div key={t.id} className="bg-white shadow-md rounded p-4 flex flex-col justify-between">
                            <div>
                                <h2 className="font-bold text-lg">{t.name}</h2>
                                <p className="text-gray-500 text-sm">{t.description}</p>
                                <p className="mt-1 text-gray-400 text-xs">Category: {t.category}</p>
                            </div>
                            <div className="mt-3 flex justify-between items-center">
                                <button
                                    onClick={() => router.push(`/admin/cover-letters/${t.id}/edit`)}
                                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(t.id)}
                                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => handleToggleActive(t.id, t.is_active)}
                                    className={`px-3 py-1 rounded ${t.is_active ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 hover:bg-gray-500'} text-white`}
                                >
                                    {t.is_active ? "Active" : "Inactive"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
