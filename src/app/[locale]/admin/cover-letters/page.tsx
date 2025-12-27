"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/apiClient";
import toast from "react-hot-toast";
import CoverLetterForm from "@/components/admin/cover-letters/CoverLetterForm";

export default function CoverLettersPage() {
    const [templates, setTemplates] = useState<any[]>([]);
    const [selected, setSelected] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const fetchTemplates = async () => {
        setLoading(true);
        try {
            const res = await apiFetch("/api/admin/cover-letter-templates/");
            const data = await res.json();
            setTemplates(data);
        } catch (err: any) {
            toast.error("Failed to load templates");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTemplates();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Cover Letter Templates</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                {templates.map((t) => (
                    <div key={t.id} className="border rounded p-3">
                        <h3 className="font-bold">{t.name}</h3>
                        <p className="text-sm text-gray-500">{t.description}</p>
                        <button
                            onClick={() => setSelected(t)}
                            className="mt-2 px-3 py-1 rounded bg-blue-700 text-white hover:bg-blue-800"
                        >
                            Edit
                        </button>
                    </div>
                ))}
                <button
                    onClick={() => setSelected(null)}
                    className="mt-2 px-3 py-1 rounded bg-green-700 text-white hover:bg-green-800 col-span-full"
                >
                    Create New Template
                </button>
            </div>

            <div className="mt-6">
                <CoverLetterForm initialData={selected || undefined} />
            </div>
        </div>
    );
}
