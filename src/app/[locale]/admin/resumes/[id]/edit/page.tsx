"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import TemplateForm from "@/components/admin/templates/TemplateForm";
import { apiFetch } from "@/lib/apiClient";
import toast from "react-hot-toast";
import AdminLoadingSpinner from "@/components/admin/shared/AdminLoadingSpinner";

export default function EditResumeTemplatePage() {
    const { id } = useParams();
    const [template, setTemplate] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTemplate = async () => {
            try {
                const res = await apiFetch(`/admin/templates/${id}/`);
                if (res.ok) {
                    const data = await res.json();
                    setTemplate(data);
                } else {
                    toast.error("Failed to load template");
                }
            } catch (err) {
                toast.error("Error loading template");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchTemplate();
    }, [id]);

    if (loading) {
        return <AdminLoadingSpinner />;
    }

    if (!template) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900">Template not found</h2>
                <p className="text-gray-500 mt-2">The template you are looking for does not exist or has been deleted.</p>
            </div>
        );
    }

    return <TemplateForm type="resume" initialData={template} />;
}
