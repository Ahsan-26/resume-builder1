import { getTranslations } from "next-intl/server";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DocumentsSection from "@/components/dashboard/DocumentsSection";
import JobOpenings from "@/components/dashboard/JobOpenings";
import CareerMap from "@/components/dashboard/CareerMap";
import Interviews from "@/components/dashboard/Interviews";

export default async function DashboardPage() {
    // Fetch translations on the server
    const t = await getTranslations("dashboard");

    return (
        <div className="space-y-8">
            {/* Header */}
            <DashboardHeader />

            {/* Documents Section */}
            <DocumentsSection />

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <JobOpenings />
                <CareerMap />
                <Interviews />
            </div>
        </div>
    );
}
