import { apiFetch } from "../apiClient";
import { Resume, CreateResumeData, UpdateResumeData } from "../../types/resume";

export async function fetchResumes(): Promise<Resume[]> {
    const res = await apiFetch("/resumes/");
    if (!res.ok) {
        if (res.status === 429) {
            throw new Error("Too many requests. Please wait a moment and try again.");
        }
        throw new Error("Failed to fetch resumes");
    }
    return res.json();
}

export async function fetchTemplates(): Promise<any[]> {
    const res = await apiFetch("/templates/");
    if (!res.ok) {
        throw new Error("Failed to fetch templates");
    }
    return res.json();
}

export async function fetchResume(id: string): Promise<Resume> {
    const res = await apiFetch(`/resumes/${id}/`);
    if (!res.ok) {
        if (res.status === 429) {
            throw new Error("Too many requests. Please wait a moment and try again.");
        }
        if (res.status === 404) {
            throw new Error("Resume not found");
        }
        throw new Error("Failed to fetch resume");
    }
    return res.json();
}

export async function createResume(data: CreateResumeData): Promise<Resume> {
    const res = await apiFetch("/resumes/", {
        method: "POST",
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        if (res.status === 429) {
            throw new Error("Too many requests. Please wait a moment and try again.");
        }
        const errorData = await res.json().catch(() => ({}));
        console.error("Create Resume Error Details:", errorData);
        throw new Error(errorData.detail || "Failed to create resume");
    }
    return res.json();
}

// Helper to clean section_settings before sending to backend
function cleanSectionSettings(settings: Record<string, any> | undefined) {
    if (!settings) return settings;

    const cleaned: Record<string, any> = {};
    const validKeys = ['order', 'visible'];

    Object.keys(settings).forEach(key => {
        const section = settings[key];
        if (section && typeof section === 'object') {
            cleaned[key] = {};
            validKeys.forEach(validKey => {
                if (validKey in section) {
                    cleaned[key][validKey] = section[validKey];
                }
            });
        }
    });
    return cleaned;
}

export async function updateResume(id: string, data: UpdateResumeData): Promise<Resume> {
    console.log("Updating resume:", id, "with data:", data);

    // Clean section_settings if present
    const payload = { ...data };
    if (payload.section_settings) {
        payload.section_settings = cleanSectionSettings(payload.section_settings);
    }

    const res = await apiFetch(`/resumes/${id}/`, {
        method: "PATCH",
        body: JSON.stringify(payload),
    });
    if (!res.ok) {
        if (res.status === 429) {
            throw new Error("Too many requests. Please wait a moment and try again.");
        }
        if (res.status === 404) {
            throw new Error("Resume not found");
        }
        const errorData = await res.json().catch(() => ({}));
        console.error("Update Resume Error Details:", errorData);
        throw new Error(errorData.detail || "Failed to update resume");
    }
    return res.json();
}

export async function autosaveResume(id: string, data: UpdateResumeData): Promise<Resume> {
    console.log("Autosaving resume:", id, "with data:", data);

    // Clean section_settings if present
    const payload = { ...data };
    if (payload.section_settings) {
        payload.section_settings = cleanSectionSettings(payload.section_settings);
    }

    const res = await apiFetch(`/resumes/${id}/autosave/`, {
        method: "POST",
        body: JSON.stringify(payload),
    });
    if (!res.ok) {
        if (res.status === 429) {
            throw new Error("Too many requests. Please wait a moment and try again.");
        }
        const errorData = await res.json().catch(() => ({}));
        console.error("Autosave Resume Error Details:", errorData);
        throw new Error(errorData.detail || `Failed to autosave resume (Error ${res.status})`);
    }
    return res.json();
}

export async function deleteResume(id: string): Promise<void> {
    const res = await apiFetch(`/resumes/${id}/`, {
        method: "DELETE",
    });
    if (!res.ok) {
        if (res.status === 429) {
            throw new Error("Too many requests. Please wait a moment and try again.");
        }
        if (res.status === 404) {
            throw new Error("Resume not found");
        }
        throw new Error("Failed to delete resume");
    }
}

export async function downloadResumePdf(id: string): Promise<Blob> {
    const res = await apiFetch(`/resumes/${id}/pdf/`);
    if (!res.ok) {
        if (res.status === 429) {
            throw new Error("Too many requests. Please wait a moment and try again.");
        }
        if (res.status === 503) {
            throw new Error("PDF generation service is currently unavailable. Please try again later.");
        }
        throw new Error("Failed to download resume PDF");
    }
    return res.blob();
}
