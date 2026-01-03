"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DocumentsSection from "@/components/dashboard/DocumentsSection";
import CoverLetterList from "@/components/dashboard/CoverLetterList";
import { FileText, File } from "lucide-react";


export default function DashboardPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <DashboardHeader />

            {/* Resumes Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#00004d]/10 rounded-lg">
                        <FileText className="w-6 h-6 text-[#00004d]" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">My Resumes</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Create and manage your professional resumes</p>
                    </div>
                </div>
                <DocumentsSection />
            </div>

            {/* Cover Letters Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#00004d]/10 rounded-lg">
                        <File className="w-6 h-6 text-[#00004d]" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">My Cover Letters</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Create and manage your cover letters</p>
                    </div>
                </div>
                <CoverLetterList />
            </div>
        </div>
    );
}
