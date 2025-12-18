import { apiFetch } from "../apiClient";
import { Template } from "../../types/resume";

export async function fetchTemplates(): Promise<Template[]> {
    const res = await fetch("/api/templates");
    if (!res.ok) throw new Error("Failed to fetch templates");
    return res.json();
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
