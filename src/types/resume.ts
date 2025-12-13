export interface Template {
    id: string;
    name: string;
    slug: string;
    description: string;
    category: string;
    is_premium: boolean;
    preview_image_url: string;
    is_active: boolean;
}

export interface PersonalInfo {
    first_name: string;
    last_name: string;
    headline: string;
    summary: string;
    email: string;
    phone: string;
    city: string;
    country: string;
    website: string;
    linkedin_url: string;
    github_url: string;
    portfolio_url: string;
    photo_url: string;
}

export interface WorkExperience {
    id: string;
    position_title: string;
    company_name: string;
    city: string;
    country: string;
    start_date: string;
    end_date: string;
    is_current: boolean;
    description: string;
    bullets: string; // Assuming this is a string based on API response, potentially HTML or markdown
    order: number;
}

export interface Education {
    id: string;
    degree: string;
    field_of_study: string;
    school_name: string;
    city: string;
    country: string;
    start_date: string;
    end_date: string;
    is_current: boolean;
    description: string;
    order: number;
}

export interface SkillItem {
    id: string;
    name: string;
    level: string; // e.g., "beginner", "intermediate", "expert"
    order: number;
}

export interface SkillCategory {
    id: string;
    name: string;
    order: number;
    items: SkillItem[];
}

export interface Strength {
    id: string;
    label: string;
    order: number;
}

export interface Hobby {
    id: string;
    label: string;
    order: number;
}

export interface CustomSectionItem {
    id: string;
    title: string;
    subtitle: string;
    meta: string;
    description: string;
    start_date: string;
    end_date: string;
    is_current: boolean;
    order: number;
}

export interface CustomSection {
    id: string;
    type: string; // e.g., "achievements", "volunteering"
    title: string;
    order: number;
    items: CustomSectionItem[];
}

export interface Resume {
    id: string;
    user: number;
    title: string;
    slug: string;
    template: Template;
    language: string;
    target_role: string;
    is_ai_generated: boolean;
    ai_model?: string;
    ai_prompt?: string;
    status: string; // "draft", "published", etc.
    created_at: string;
    updated_at: string;
    last_edited_at: string;
    personal_info: PersonalInfo;
    work_experiences: WorkExperience[];
    educations: Education[];
    skill_categories: SkillCategory[];
    strengths: Strength[];
    hobbies: Hobby[];
    custom_sections: CustomSection[];
}

export interface CreateResumeData {
    title: string;
    template_id: string;
    language: string;
    target_role: string;
}

export interface UpdateResumeData extends Partial<Omit<Resume, "id" | "user" | "created_at" | "updated_at" | "template">> {
    template_id?: string;
}
