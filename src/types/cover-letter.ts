export interface CoverLetter {
    id: string;
    user: number; // User ID from backend
    title: string;
    template: string; // Template ID
    template_id?: string; // For writing
    template_detail?: CoverLetterTemplate;
    linked_resume?: string; // UUID of linked resume
    company_name: string;
    job_title: string;
    job_description: string;
    body: string;
    status: 'draft' | 'published';
    created_at: string;
    updated_at: string;
}

export interface CoverLetterTemplate {
    id: string;
    name: string;
    slug: string;
    description: string;
    category: string;
    is_premium: boolean;
    preview_image_url: string;
    is_active: boolean;
    definition: any; // Design tokens, layout hints, etc.
}

export interface CreateCoverLetterData {
    title: string;
    template_id: string;
    linked_resume?: string;
}

export interface UpdateCoverLetterData {
    title?: string;
    template_id?: string;
    company_name?: string;
    job_title?: string;
    job_description?: string;
    body?: string;
    status?: 'draft' | 'published';
    linked_resume?: string;
}
