"use client";

import { useTranslations } from "next-intl";
import { Plus, FileText, Loader2, MoreVertical, Edit, Trash2, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchResumes, deleteResume } from "@/lib/api/resumes";
import { Resume } from "@/types/resume";
import toast from "react-hot-toast";
import { CreateResumeDialog } from "./CreateResumeDialog";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";

interface DocumentsSectionProps {
    filter?: "resume" | "coverLetter";
}

export default function DocumentsSection({ filter }: DocumentsSectionProps) {
    const t = useTranslations("dashboard");
    const router = useRouter();
    const [documents, setDocuments] = useState<Resume[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; resume: Resume | null }>({
        isOpen: false,
        resume: null,
    });
    const [isDeleting, setIsDeleting] = useState(false);
    const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

    const loadDocuments = async () => {
        try {
            setIsLoading(true);
            const data = await fetchResumes();
            setDocuments(data);
        } catch (error) {
            console.error("Failed to load documents", error);
            toast.error("Failed to load resumes");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadDocuments();
    }, []);

    const handleCreateResume = (name: string) => {
        setIsCreateDialogOpen(false);
        // Navigate to templates page with resume name
        router.push(`/dashboard/templates?name=${encodeURIComponent(name)}`);
    };

    const handleDeleteResume = async () => {
        if (!deleteDialog.resume) return;

        setIsDeleting(true);
        try {
            await deleteResume(deleteDialog.resume.id);
            toast.success("Resume deleted successfully");
            setDeleteDialog({ isOpen: false, resume: null });
            // Refresh the list
            await loadDocuments();
        } catch (error) {
            console.error("Failed to delete resume", error);
            toast.error("Failed to delete resume");
        } finally {
            setIsDeleting(false);
        }
    };

    const openDeleteDialog = (resume: Resume) => {
        setDeleteDialog({ isOpen: true, resume });
        setActiveMenuId(null);
    };

    const closeDeleteDialog = () => {
        if (!isDeleting) {
            setDeleteDialog({ isOpen: false, resume: null });
        }
    };

    return (
        <>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{t("documents")}</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{t("lastEdited")}</p>
                    </div>
                    <button
                        onClick={() => setIsCreateDialogOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-[#00004d] hover:bg-[#002366] text-white rounded-lg font-medium transition-colors shadow-sm"
                    >
                        <Plus className="w-4 h-4" />
                        {t("createNew")}
                    </button>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {documents.map((doc) => (
                            <div key={doc.id} className="group relative">
                                {/* Resume Card */}
                                <div
                                    className="cursor-pointer"
                                    onClick={() => router.push(`/resumes/${doc.id}/edit`)}
                                >
                                    <div className="aspect-[210/297] bg-gray-100 dark:bg-gray-700 rounded-lg mb-3 border-2 border-transparent group-hover:border-blue-500 transition-all relative overflow-hidden shadow-sm">
                                        {doc.template?.preview_image_url ? (
                                            <img
                                                src={doc.template.preview_image_url}
                                                alt={doc.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                                <FileText className="w-12 h-12" />
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors truncate">
                                        {doc.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {new Date(doc.updated_at).toLocaleDateString()}
                                    </p>
                                </div>

                                {/* Action Menu */}
                                <div className="absolute top-2 right-2 z-10">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveMenuId(activeMenuId === doc.id ? null : doc.id);
                                        }}
                                        className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors opacity-0 group-hover:opacity-100"
                                    >
                                        <MoreVertical size={16} className="text-gray-600 dark:text-gray-400" />
                                    </button>

                                    {/* Dropdown Menu */}
                                    {activeMenuId === doc.id && (
                                        <>
                                            <div
                                                className="fixed inset-0 z-10"
                                                onClick={() => setActiveMenuId(null)}
                                            />
                                            <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 py-2 z-20">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        router.push(`/resumes/${doc.id}/edit`);
                                                    }}
                                                    className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
                                                >
                                                    <Edit size={16} />
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        openDeleteDialog(doc);
                                                    }}
                                                    className="w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-2"
                                                >
                                                    <Trash2 size={16} />
                                                    Delete
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Add New Placeholder */}
                        <button
                            onClick={() => setIsCreateDialogOpen(true)}
                            className="aspect-[210/297] border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:border-blue-500 hover:text-blue-500 transition-all group"
                        >
                            <div className="w-12 h-12 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center mb-2 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20">
                                <Plus className="w-6 h-6" />
                            </div>
                            <span className="font-medium">{t("createNew")}</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Dialogs */}
            <CreateResumeDialog
                isOpen={isCreateDialogOpen}
                onClose={() => setIsCreateDialogOpen(false)}
                onConfirm={handleCreateResume}
            />

            <DeleteConfirmDialog
                isOpen={deleteDialog.isOpen}
                resumeTitle={deleteDialog.resume?.title || ""}
                onClose={closeDeleteDialog}
                onConfirm={handleDeleteResume}
                isDeleting={isDeleting}
            />
        </>
    );
}
