import { apiFetch } from "../apiClient";
import { Template } from "../../types/resume";

export async function fetchTemplates(type?: string): Promise<Template[]> {
    // If type is 'cover_letter', use the dedicated endpoint from cover_letters app
    const url = type === 'cover_letter' ? "/cover-letters/templates/" : "/templates/";
    const res = await apiFetch(url);
    if (!res.ok) throw new Error("Failed to fetch templates");
    return res.json();
}

export async function fetchTemplate(id: string): Promise<Template> {
    const res = await apiFetch(`/templates/${id}/`);
    if (!res.ok) throw new Error("Failed to fetch template");
    return res.json();
}
