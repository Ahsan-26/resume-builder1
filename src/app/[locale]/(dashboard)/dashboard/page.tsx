import { getTranslations } from "next-intl/server";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DocumentsSection from "@/components/dashboard/DocumentsSection";


export default async function DashboardPage() {
    // Fetch translations on the server
    const t = await getTranslations("dashboard");

    return (
        <div className="space-y-8">
            {/* Header */}
            <DashboardHeader />

            {/* Documents Section */}
            <DocumentsSection />


        </div>
    );
}
