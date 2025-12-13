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

export async function updateResume(id: string, data: UpdateResumeData): Promise<Resume> {
    console.log("Updating resume:", id, "with data:", data);
    const res = await apiFetch(`/resumes/${id}/`, {
        method: "PATCH",
        body: JSON.stringify(data),
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
