import ResumeBuilderSection from "@/components/resumes/ResumeBuilderSection";
import ResumeTemplatesList from "@/components/resumes/ResumeTemplatesList";

export default function ResumeBuilderPage() {
    return (
        <div className="pt-20">
            <ResumeBuilderSection />
            <ResumeTemplatesList />
        </div>
    );
}
