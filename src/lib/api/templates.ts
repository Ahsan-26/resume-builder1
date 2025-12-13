import { apiFetch } from "../apiClient";
import { Template } from "../../types/resume";

export async function fetchTemplates(): Promise<Template[]> {
    // Mock data for development until backend is populated
    return [
        {
            id: "modern-1",
            name: "Modern",
            slug: "modern",
            description: "Clean and contemporary design with a touch of color.",
            category: "creative",
            is_premium: false,
            preview_image_url: "https://marketplace.canva.com/EAFRuCp3DcY/1/0/1131w/canva-black-white-minimalist-cv-resume-f5JNR-K5jjw.jpg",
            is_active: true
        },
        {
            id: "creative-1",
            name: "Creative",
            slug: "creative",
            description: "Bold design for designers and artists.",
            category: "creative",
            is_premium: true,
            preview_image_url: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/resume-design-template-766b4e60566c74751965a9522199042b_screen.jpg",
            is_active: true
        },
        {
            id: "classic-1",
            name: "Classic",
            slug: "classic",
            description: "Traditional single-column layout.",
            category: "professional",
            is_premium: false,
            preview_image_url: "https://marketplace.canva.com/EAFRuCp3DcY/1/0/1131w/canva-black-white-minimalist-cv-resume-f5JNR-K5jjw.jpg", // Reusing image for now
            is_active: true
        }
    ];
    // const res = await apiFetch("/templates/");
    // if (!res.ok) throw new Error("Failed to fetch templates");
    // return res.json();
}

export async function fetchTemplate(id: string): Promise<Template> {
    // Mock fetch single
    const templates = await fetchTemplates();
    const template = templates.find(t => t.id === id);
    if (!template) throw new Error("Template not found");
    return template;
    // const res = await apiFetch(`/templates/${id}/`);
    // if (!res.ok) throw new Error("Failed to fetch template");
    // return res.json();
}
