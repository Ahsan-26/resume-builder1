import CoverLetterList from "@/components/dashboard/CoverLetterList";

export const metadata = {
    title: "My Cover Letters - Resume Builder",
    description: "Manage your cover letters",
};

export default function CoverLettersPage() {
    return (
        <div className="space-y-8 animate-fadeIn">
            <CoverLetterList />
        </div>
    );
}
