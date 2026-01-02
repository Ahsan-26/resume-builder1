import { apiFetch } from "../apiClient";
import { CoverLetter, CreateCoverLetterData, UpdateCoverLetterData } from "../../types/cover-letter";

export async function fetchCoverLetters(): Promise<CoverLetter[]> {
    const res = await apiFetch("/cover-letters/");
    if (!res.ok) {
        throw new Error("Failed to fetch cover letters");
    }
    return res.json();
}

export async function fetchCoverLetter(id: string): Promise<CoverLetter> {
    const res = await apiFetch(`/cover-letters/${id}/`);
    if (!res.ok) {
        if (res.status === 404) throw new Error("Cover letter not found");
        throw new Error("Failed to fetch cover letter");
    }
    return res.json();
}

export async function createCoverLetter(data: CreateCoverLetterData): Promise<CoverLetter> {
    const res = await apiFetch("/cover-letters/", {
        method: "POST",
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        throw new Error("Failed to create cover letter");
    }
    return res.json();
}

export async function updateCoverLetter(id: string, data: UpdateCoverLetterData): Promise<CoverLetter> {
    const res = await apiFetch(`/cover-letters/${id}/`, {
        method: "PATCH",
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        throw new Error("Failed to update cover letter");
    }
    return res.json();
}

export async function deleteCoverLetter(id: string): Promise<void> {
    const res = await apiFetch(`/cover-letters/${id}/`, {
        method: "DELETE",
    });
    if (!res.ok) {
        throw new Error("Failed to delete cover letter");
    }
}
