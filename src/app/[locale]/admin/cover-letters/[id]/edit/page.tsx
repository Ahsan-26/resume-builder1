import CoverLetterForm from "@/components/admin/cover-letters/CoverLetterForm";

async function fetchTemplate(id: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/admin/cover-letter-templates/${id}/`);
    if (!res.ok) throw new Error("Failed to fetch template");
    return res.json();
}

export default async function Page({ params }: { params: { id: string } }) {
    const initialData = await fetchTemplate(params.id);
    return <CoverLetterForm initialData={initialData} />;
}
