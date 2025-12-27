"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { apiFetch } from "@/lib/apiClient";
import CoverLetterForm from "@/components/admin/cover-letters/CoverLetterForm";

export default function EditCoverLetterPage() {
    const params = useParams();
    const { id } = params;
    const [template, setTemplate] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTemplate = async () => {
            setLoading(true);
            try {
                const res = await apiFetch(`/api/admin/cover-letter-templates/${id}/`);
                if (!res.ok) throw new Error("Failed to fetch template");
                const data = await res.json();
                setTemplate(data);
            } catch (err: any) {
                toast.error(err.message || "Failed to load template");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchTemplate();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!template) return <p>Template not found</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Edit Cover Letter Template</h1>
            <CoverLetterForm initialData={template} />
        </div>
    );
}
