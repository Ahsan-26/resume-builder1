export interface CoverLetter {
    id: string;
    user_id: string;
    title: string;
    template_id: string;
    content: CoverLetterContent;
    created_at: string;
    updated_at: string;
}

export interface CoverLetterContent {
    personal_info: {
        full_name: string;
        email: string;
        phone?: string;
        address?: string;
        job_title?: string; // Target Role
    };
    recipient: {
        company_name: string;
        manager_name?: string;
        address?: string;
    };
    body: string; // HTML or Markdown content
    date: string;
}

export interface CoverLetterTemplate {
    id: string;
    name: string;
    thumbnail?: string;
    data: string; // JSON string or object defining layout/styles
}

export interface CreateCoverLetterData {
    title: string;
    template_id?: string;
}

export interface UpdateCoverLetterData {
    title?: string;
    template_id?: string;
    content?: Partial<CoverLetterContent>;
}
