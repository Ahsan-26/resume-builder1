export interface TemplateLayout {
    type: 'two_column' | 'single_column';
    header: 'top' | 'left' | 'right';
    columns?: {
        left: number;
        right: number;
    };
}

export interface TemplateStyle {
    font_family: string;
    heading_scale: number;
    body_scale: number;
    primary_color: string;
    accent_color: string;
    section_gap: number;
    line_height: number;
}

export interface SectionConfig {
    area: 'header' | 'left' | 'right' | 'full';
    order: number;
    visible: boolean;
    display?: string;
    default_area?: 'header' | 'left' | 'right' | 'full';
    allowed_areas?: ('header' | 'left' | 'right' | 'full')[];
    min_width?: number;
    max_width?: number;
}

export interface TemplateSections {
    personal_info: SectionConfig;
    work_experiences: SectionConfig;
    educations: SectionConfig;
    skill_categories: SectionConfig;
    strengths: SectionConfig;
    hobbies: SectionConfig;
    custom_sections: SectionConfig;
}

export interface PageConfig {
    size: 'A4' | 'LETTER' | 'CUSTOM';
    orientation: 'portrait' | 'landscape';
    margins_mm: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
}

export interface TemplateDefinition {
    schema_version: number;
    layout: TemplateLayout;
    style: TemplateStyle;
    page: PageConfig;
    sections: TemplateSections;
}

export interface Template {
    id: string;
    name: string;
    slug: string;
    description: string;
    category: string;
    is_premium: boolean;
    preview_image_url: string;
    is_active: boolean;
    definition: TemplateDefinition;
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
    bullets: string[];
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
    area?: 'header' | 'left' | 'right' | 'full';
    items: CustomSectionItem[];
}

export interface Resume {
    id: string;
    user: number;
    title: string;
    slug: string;
    template: Template;
    template_id?: string; // Added for robustness when nested template is missing
    language: string;
    target_role: string;
    is_ai_generated: boolean;
    ai_model?: string;
    ai_prompt?: Record<string, any>;
    status: string; // "draft", "published", etc.
    created_at: string;
    updated_at: string;
    last_edited_at: string;
    section_settings: Record<string, {
        order: number;
        visible: boolean;
        area?: 'header' | 'left' | 'right' | 'full'; // Client-side only, not persisted
        title?: string; // Client-side only
        fields?: Record<string, boolean>; // Client-side only
        items?: Record<string, {
            hide_date?: boolean;
            fields?: Record<string, boolean>; // Item-specific field visibility
        }>; // Client-side only
    }>;
    personal_info: PersonalInfo;
    work_experiences: WorkExperience[];
    educations: Education[];
    skill_categories: SkillCategory[];
    strengths: Strength[];
    hobbies: Hobby[];
    custom_sections: CustomSection[];
    page: PageConfig;
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
