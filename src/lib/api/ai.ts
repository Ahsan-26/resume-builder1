
import { apiFetch } from "../apiClient";
import { Resume } from "@/types/resume";

export interface AIWizardSession {
    wizard_id: string;
    draft_resume: any;
    expires_at: string;
}

export interface AIPreviewInput {
    name?: string;
    target_role: string;
    job_description?: string;
    experience_years?: number;
    skills?: string[];
    location?: string;
    language?: string;
    seniority?: 'junior' | 'mid' | 'senior' | 'lead' | 'executive';
    use_social_photo?: boolean;
    photo_source?: 'google' | 'facebook' | null;
}

export interface AIConfirmInput {
    wizard_id: string;
    template_id: string;
    title: string;
}

export interface AISectionRewriteInput {
    resume_id: string;
    section_type: 'work_experience' | 'summary' | 'skills' | 'strengths';
    item_id?: string;
    prompt: string;
    tone: 'professional' | 'concise' | 'creative' | 'formal';
}

export interface AISummaryInput {
    current_role: string;
    target_role: string;
    experience_years: number;
    keywords?: string[];
    tone?: string;
}

export interface AIBulletsInput {
    role: string;
    company: string;
    description: string;
    keywords?: string[];
    tone?: string;
    count?: number;
}

export interface AIExperienceInput {
    role: string;
    company: string;
    keywords?: string[];
    tone?: string;
}

export async function previewAIResume(data: AIPreviewInput): Promise<AIWizardSession> {
    const res = await apiFetch("/ai/preview/", {
        method: "POST",
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || "Failed to generate AI preview");
    }
    return res.json();
}

export async function confirmAIResume(data: AIConfirmInput): Promise<{ resume_id: string; redirect_url: string; slug: string }> {
    const res = await apiFetch("/ai/confirm/", {
        method: "POST",
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || "Failed to confirm AI resume");
    }
    return res.json();
}

export async function rewriteSection(data: AISectionRewriteInput): Promise<{ success: boolean; rewritten_text: string }> {
    const res = await apiFetch("/ai/rewrite/", {
        method: "POST",
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || "Failed to rewrite section");
    }
    return res.json();
}

export async function generateSummary(data: AISummaryInput): Promise<{ summary: string }> {
    const res = await apiFetch("/ai/summary/", {
        method: "POST",
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || "Failed to generate summary");
    }
    return res.json();
}

export async function generateBullets(data: AIBulletsInput): Promise<{ bullets: string[] }> {
    const res = await apiFetch("/ai/bullets/", {
        method: "POST",
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || "Failed to generate bullets");
    }
    return res.json();
}

export async function generateExperienceDescription(data: AIExperienceInput): Promise<{ description: string }> {
    const res = await apiFetch("/ai/experience/", {
        method: "POST",
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || "Failed to generate description");
    }
    return res.json();
}
