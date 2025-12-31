"use client";

import { useTranslations, useLocale } from "next-intl";
import { Plus, FileText, Loader2, MoreVertical, Edit, Trash2, Eye, Download, Calendar, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchResumes, deleteResume, downloadResumePdf } from "@/lib/api/resumes";
import { Resume } from "@/types/resume";
import toast from "react-hot-toast";
import { CreateResumeDialog } from "./CreateResumeDialog";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import { AIWizardDialog } from "./ai/AIWizardDialog";
import { Sparkles } from "lucide-react";

interface DocumentsSectionProps {
    filter?: "resume" | "coverLetter";
}

export default function DocumentsSection({ filter }: DocumentsSectionProps) {
    const t = useTranslations("dashboard");
    const locale = useLocale();
    const router = useRouter();
    const [documents, setDocuments] = useState<Resume[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; resume: Resume | null }>({
        isOpen: false,
        resume: null,
    });
    const [isAIWizardOpen, setIsAIWizardOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isDownloading, setIsDownloading] = useState<string | null>(null);
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
        router.push(`/${locale}/dashboard/templates?name=${encodeURIComponent(name)}`);
    };

    const handleDeleteResume = async () => {
        if (!deleteDialog.resume) return;

        setIsDeleting(true);
        try {
            await deleteResume(deleteDialog.resume.id);
            toast.success("Resume deleted successfully");
            setDeleteDialog({ isOpen: false, resume: null });
            await loadDocuments();
        } catch (error) {
            console.error("Failed to delete resume", error);
            toast.error("Failed to delete resume");
        } finally {
            setIsDeleting(false);
        }
    };

    const handleDownloadPdf = async (e: React.MouseEvent, resume: Resume) => {
        e.stopPropagation();
        setIsDownloading(resume.id);
        try {
            const blob = await downloadResumePdf(resume.id);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${resume.title || 'resume'}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
            toast.success("Resume downloaded successfully");
        } catch (error: any) {
            console.error("Failed to download PDF", error);
            toast.error(error.message || "Failed to download PDF");
        } finally {
            setIsDownloading(null);
            setActiveMenuId(null);
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
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-800">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h2 className="text-2xl font-black text-[#00004d] dark:text-white mb-1 tracking-tight">
                            {t("documents")}
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
                    <button
                        onClick={() => setIsAIWizardOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-purple-900/20"
                    >
                        <Sparkles className="w-5 h-5" />
                        <span>Create with AI</span>
                    </button>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-12 h-12 animate-spin text-[#00004d]" />
                    </div>
                ) : (
                    <div className="space-y-4">
                        {documents.length === 0 ? (
                            <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-700">
                                <FileText className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No resumes yet</h3>
                                <p className="text-gray-500 dark:text-gray-400 mb-6">Create your first professional resume in minutes.</p>
                                <button
                                    onClick={() => setIsCreateDialogOpen(true)}
                                    className="px-6 py-2 bg-[#FFF4BC] text-[#00004d] rounded-xl font-bold hover:bg-[#ffe880] transition-colors"
                                >
                                    Get Started
                                </button>
                            </div>
                        ) : (
                            documents.map((doc) => (
                                <div
                                    key={doc.id}
                                    onClick={() => router.push(`/${locale}/dashboard/resumes/${doc.id}/edit`)}
                                    className="group relative bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 hover:border-[#00004d] dark:hover:border-[#FFF4BC] hover:shadow-xl transition-all cursor-pointer flex items-center gap-6"
                                >
                                    {/* Thumbnail */}
                                    <div className="w-16 h-20 sm:w-20 sm:h-24 bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100 dark:border-gray-600 group-hover:scale-105 transition-transform shadow-sm">
                                        {doc.template?.preview_image_url ? (
                                            <img
                                                src={doc.template.preview_image_url}
                                                alt={doc.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                <FileText className="w-8 h-8" />
                                            </div>
                                        )}
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
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${doc.status === 'published'
                                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                                }`}>
                                                {doc.status}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={(e) => handleDownloadPdf(e, doc)}
                                            disabled={isDownloading === doc.id}
                                            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-bold hover:bg-[#FFF4BC] hover:text-[#00004d] transition-all disabled:opacity-50"
                                            title="Download PDF"
                                        >
                                            {isDownloading === doc.id ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <Download className="w-4 h-4" />
                                            )}
                                            <span className="hidden md:inline">Download</span>
                                        </button>

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
                                                                router.push(`/${locale}/dashboard/resumes/${doc.id}/edit`);
                                                            }}
                                                            className="w-full text-left px-4 py-2.5 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-3 font-medium"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={(e) => handleDownloadPdf(e, doc)}
                                                            className="sm:hidden w-full text-left px-4 py-2.5 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-3 font-medium"
                                                        >
                                                            <Download className="w-4 h-4" />
                                                            Download PDF
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

            <AIWizardDialog
                isOpen={isAIWizardOpen}
                onClose={() => setIsAIWizardOpen(false)}
            />
        </>
    );
}
