import { apiFetch } from "../apiClient";
import { Template } from "../../types/resume";

export async function fetchTemplates(): Promise<Template[]> {
    const res = await apiFetch("/templates/");
    if (!res.ok) throw new Error("Failed to fetch templates");
    return res.json();
}

export async function fetchTemplate(id: string): Promise<Template> {
    const res = await apiFetch(`/templates/${id}/`);
    if (!res.ok) throw new Error("Failed to fetch template");
    return res.json();
}
