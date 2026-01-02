"use client";

import { useTranslations, useLocale } from "next-intl";
import { Plus, FileText, Loader2, MoreVertical, Edit, Trash2, Calendar, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCoverLetterStore } from "@/store/useCoverLetterStore";
import { CoverLetter } from "@/types/cover-letter";
import toast from "react-hot-toast";
import { CreateCoverLetterDialog } from "./CreateCoverLetterDialog";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";

export default function CoverLetterList() {
    const t = useTranslations("dashboard");
    const locale = useLocale();
    const router = useRouter();

    const {
        coverLetters,
        fetchCoverLetters,
        createCoverLetter,
        deleteCoverLetter,
        isLoading
    } = useCoverLetterStore();

    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; coverLetter: CoverLetter | null }>({
        isOpen: false,
        coverLetter: null,
    });
    const [isDeleting, setIsDeleting] = useState(false);
    const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

    useEffect(() => {
        fetchCoverLetters();
    }, [fetchCoverLetters]);

    const handleCreate = async (name: string) => {
        setIsCreateDialogOpen(false);
        // Navigate to templates page for cover letters OR direct create?
        // Resume builder goes to templates with name.
        // Assuming we have /dashboard/templates?type=cover_letter or similar.
        // For now, let's just create it directly with default template (if API supports) 
        // OR follow pattern.
        // ResumeBuilder: router.push(`/${locale}/dashboard/templates?name=${encodeURIComponent(name)}`);
        // I will do the same but add a type param if needed, or assume templates page handles logic.
        // Actually, user wants "Template-Driven System".
        // Let's assume we go to template selection.
        router.push(`/${locale}/dashboard/templates?type=cover_letter&name=${encodeURIComponent(name)}`);
    };

    const handleDelete = async () => {
        if (!deleteDialog.coverLetter) return;

        setIsDeleting(true);
        try {
            await deleteCoverLetter(deleteDialog.coverLetter.id);
            toast.success("Cover letter deleted successfully");
            setDeleteDialog({ isOpen: false, coverLetter: null });
        } catch (error) {
            console.error("Failed to delete cover letter", error);
            toast.error("Failed to delete cover letter");
        } finally {
            setIsDeleting(false);
        }
    };

    const openDeleteDialog = (cl: CoverLetter) => {
        setDeleteDialog({ isOpen: true, coverLetter: cl });
        setActiveMenuId(null);
    };

    const closeDeleteDialog = () => {
        if (!isDeleting) {
            setDeleteDialog({ isOpen: false, coverLetter: null });
        }
    };

    return (
        <>
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-800">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h2 className="text-2xl font-black text-[#00004d] dark:text-white mb-1 tracking-tight">
                            {t("coverLetters", { defaultMessage: "Cover Letters" })}
                        </h2>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <Clock className="w-4 h-4" />
                            <span>{t("lastEdited")}</span>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsCreateDialogOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-[#00004d] hover:bg-[#002366] text-white rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-900/20"
                    >
                        <Plus className="w-5 h-5" />
                        {t("createNew")}
                    </button>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-12 h-12 animate-spin text-[#00004d]" />
                    </div>
                ) : (
                    <div className="space-y-4">
                        {coverLetters.length === 0 ? (
                            <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-700">
                                <FileText className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No cover letters yet</h3>
                                <p className="text-gray-500 dark:text-gray-400 mb-6">Create your first professional cover letter in minutes.</p>
                                <button
                                    onClick={() => setIsCreateDialogOpen(true)}
                                    className="px-6 py-2 bg-[#FFF4BC] text-[#00004d] rounded-xl font-bold hover:bg-[#ffe880] transition-colors"
                                >
                                    Get Started
                                </button>
                            </div>
                        ) : (
                            coverLetters.map((doc) => (
                                <div
                                    key={doc.id}
                                    onClick={() => router.push(`/${locale}/dashboard/cover-letters/${doc.id}/edit`)}
                                    className="group relative bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 hover:border-[#00004d] dark:hover:border-[#FFF4BC] hover:shadow-xl transition-all cursor-pointer flex items-center gap-6"
                                >
                                    {/* Thumbnail Placeholder */}
                                    <div className="w-16 h-20 sm:w-20 sm:h-24 bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100 dark:border-gray-600 group-hover:scale-105 transition-transform shadow-sm flex items-center justify-center text-gray-300">
                                        <FileText className="w-8 h-8" />
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate group-hover:text-[#00004d] dark:group-hover:text-[#FFF4BC] transition-colors">
                                            {doc.title}
                                        </h3>
                                        <div className="flex items-center gap-4 mt-1">
                                            <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                                                <Calendar className="w-4 h-4" />
                                                <span>{new Date(doc.updated_at).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2">
                                        <div className="relative">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setActiveMenuId(activeMenuId === doc.id ? null : doc.id);
                                                }}
                                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
                                            >
                                                <MoreVertical className="w-5 h-5 text-gray-400" />
                                            </button>

                                            {activeMenuId === doc.id && (
                                                <>
                                                    <div className="fixed inset-0 z-10" onClick={() => setActiveMenuId(null)} />
                                                    <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 py-2 z-20 animate-slideDown">
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                router.push(`/${locale}/dashboard/cover-letters/${doc.id}/edit`);
                                                            }}
                                                            className="w-full text-left px-4 py-2.5 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-3 font-medium"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                openDeleteDialog(doc);
                                                            }}
                                                            className="w-full text-left px-4 py-2.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-3 font-medium"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                            Delete
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

            <CreateCoverLetterDialog
                isOpen={isCreateDialogOpen}
                onClose={() => setIsCreateDialogOpen(false)}
                onConfirm={handleCreate}
            />

            <DeleteConfirmDialog
                isOpen={deleteDialog.isOpen}
                resumeTitle={deleteDialog.coverLetter?.title || ""}
                onClose={closeDeleteDialog}
                onConfirm={handleDelete}
                isDeleting={isDeleting}
            />
        </>
    );
}
