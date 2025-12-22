import { apiFetch } from "../apiClient";
import {
    PersonalInfo, WorkExperience, Education,
    SkillCategory, SkillItem, Strength, Hobby,
    CustomSection, CustomSectionItem
} from "../../types/resume";

// Helper to clean data before sending to API
function cleanPayload(data: any, excludeKeys: string[] = [], defaults: Record<string, any> = {}) {
    const { id, created_at, updated_at, user, user_id, ...rest } = data;
    const cleaned = { ...rest };
    excludeKeys.forEach(key => delete cleaned[key]);

    // Apply defaults for empty strings ONLY if the key exists in the payload
    Object.entries(defaults).forEach(([key, value]) => {
        if (Object.prototype.hasOwnProperty.call(cleaned, key)) {
            if (!cleaned[key] || (typeof cleaned[key] === 'string' && cleaned[key].trim() === "")) {
                cleaned[key] = value;
            }
        }
    });

    return cleaned;
}

// Helper to handle API errors
async function handleResponse<T>(res: Response, errorMessage: string): Promise<T> {
    if (!res.ok) {
        let errorBody;
        try {
            errorBody = await res.text();
        } catch (e) {
            errorBody = "No response body";
        }
        console.error(`${errorMessage}: ${res.status} ${res.statusText}`, errorBody);
        throw new Error(`${errorMessage}: ${res.status} ${res.statusText} - ${errorBody}`);
    }
    return res.json();
}

// Personal Info
export async function updatePersonalInfo(resumeId: string, data: Partial<PersonalInfo>): Promise<PersonalInfo> {
    const payload = cleanPayload(data);
    const res = await apiFetch(`/resumes/${resumeId}/personal-info/`, {
        method: "PATCH",
        body: JSON.stringify(payload),
    });
    return handleResponse(res, "Failed to update personal info");
}

// Work Experience
export async function createWorkExperience(resumeId: string, data: Partial<WorkExperience>): Promise<WorkExperience> {
    const payload = cleanPayload(data, [], { position_title: "Title", company_name: "Company", start_date: "2024" });
    const res = await apiFetch(`/resumes/${resumeId}/work-experiences/`, {
        method: "POST",
        body: JSON.stringify(payload),
    });
    return handleResponse(res, "Failed to create work experience");
}

export async function updateWorkExperience(resumeId: string, id: string, data: Partial<WorkExperience>): Promise<WorkExperience> {
    const payload = cleanPayload(data, [], { position_title: "Title", company_name: "Company", start_date: "2024" });
    const res = await apiFetch(`/resumes/${resumeId}/work-experiences/${id}/`, {
        method: "PATCH",
        body: JSON.stringify(payload),
    });
    return handleResponse(res, "Failed to update work experience");
}

export async function deleteWorkExperience(resumeId: string, id: string): Promise<void> {
    const res = await apiFetch(`/resumes/${resumeId}/work-experiences/${id}/`, {
        method: "DELETE",
    });
    if (!res.ok) {
        await handleResponse(res, "Failed to delete work experience");
    }
}

// Education
export async function createEducation(resumeId: string, data: Partial<Education>): Promise<Education> {
    const payload = cleanPayload(data, [], { school_name: "School", degree: "Degree" });
    const res = await apiFetch(`/resumes/${resumeId}/educations/`, {
        method: "POST",
        body: JSON.stringify(payload),
    });
    return handleResponse(res, "Failed to create education");
}

export async function updateEducation(resumeId: string, id: string, data: Partial<Education>): Promise<Education> {
    const payload = cleanPayload(data, [], { school_name: "School", degree: "Degree" });
    const res = await apiFetch(`/resumes/${resumeId}/educations/${id}/`, {
        method: "PATCH",
        body: JSON.stringify(payload),
    });
    return handleResponse(res, "Failed to update education");
}

export async function deleteEducation(resumeId: string, id: string): Promise<void> {
    const res = await apiFetch(`/resumes/${resumeId}/educations/${id}/`, {
        method: "DELETE",
    });
    if (!res.ok) {
        await handleResponse(res, "Failed to delete education");
    }
}

// Skill Categories
export async function createSkillCategory(resumeId: string, data: Partial<SkillCategory>): Promise<SkillCategory> {
    const payload = cleanPayload(data, ['items'], { name: "Category" }); // Strip items
    const res = await apiFetch(`/resumes/${resumeId}/skill-categories/`, {
        method: "POST",
        body: JSON.stringify(payload),
    });
    return handleResponse(res, "Failed to create skill category");
}

export async function updateSkillCategory(resumeId: string, id: string, data: Partial<SkillCategory>): Promise<SkillCategory> {
    const payload = cleanPayload(data, ['items'], { name: "Category" }); // Strip items
    const res = await apiFetch(`/resumes/${resumeId}/skill-categories/${id}/`, {
        method: "PATCH",
        body: JSON.stringify(payload),
    });
    return handleResponse(res, "Failed to update skill category");
}

export async function deleteSkillCategory(resumeId: string, id: string): Promise<void> {
    const res = await apiFetch(`/resumes/${resumeId}/skill-categories/${id}/`, {
        method: "DELETE",
    });
    if (!res.ok) {
        await handleResponse(res, "Failed to delete skill category");
    }
}

// Skill Items
export async function createSkillItem(resumeId: string, categoryId: string, data: Partial<SkillItem>): Promise<SkillItem> {
    const payload = cleanPayload(data, [], { name: "Skill" });
    const res = await apiFetch(`/resumes/${resumeId}/skill-categories/${categoryId}/items/`, {
        method: "POST",
        body: JSON.stringify(payload),
    });
    return handleResponse(res, "Failed to create skill item");
}

export async function updateSkillItem(resumeId: string, categoryId: string, id: string, data: Partial<SkillItem>): Promise<SkillItem> {
    const payload = cleanPayload(data, [], { name: "Skill" });
    const res = await apiFetch(`/resumes/${resumeId}/skill-categories/${categoryId}/items/${id}/`, {
        method: "PATCH",
        body: JSON.stringify(payload),
    });
    return handleResponse(res, "Failed to update skill item");
}

export async function deleteSkillItem(resumeId: string, categoryId: string, id: string): Promise<void> {
    const res = await apiFetch(`/resumes/${resumeId}/skill-categories/${categoryId}/items/${id}/`, {
        method: "DELETE",
    });
    if (!res.ok) {
        await handleResponse(res, "Failed to delete skill item");
    }
}

// Strengths
export async function createStrength(resumeId: string, data: Partial<Strength>): Promise<Strength> {
    const payload = cleanPayload(data, [], { label: "Strength" });
    const res = await apiFetch(`/resumes/${resumeId}/strengths/`, {
        method: "POST",
        body: JSON.stringify(payload),
    });
    return handleResponse(res, "Failed to create strength");
}

export async function updateStrength(resumeId: string, id: string, data: Partial<Strength>): Promise<Strength> {
    const payload = cleanPayload(data, [], { label: "Strength" });
    const res = await apiFetch(`/resumes/${resumeId}/strengths/${id}/`, {
        method: "PATCH",
        body: JSON.stringify(payload),
    });
    return handleResponse(res, "Failed to update strength");
}

export async function deleteStrength(resumeId: string, id: string): Promise<void> {
    const res = await apiFetch(`/resumes/${resumeId}/strengths/${id}/`, {
        method: "DELETE",
    });
    if (!res.ok) {
        await handleResponse(res, "Failed to delete strength");
    }
}

// Hobbies
export async function createHobby(resumeId: string, data: Partial<Hobby>): Promise<Hobby> {
    const payload = cleanPayload(data, [], { label: "Hobby" });
    const res = await apiFetch(`/resumes/${resumeId}/hobbies/`, {
        method: "POST",
        body: JSON.stringify(payload),
    });
    return handleResponse(res, "Failed to create hobby");
}

export async function updateHobby(resumeId: string, id: string, data: Partial<Hobby>): Promise<Hobby> {
    const payload = cleanPayload(data, [], { label: "Hobby" });
    const res = await apiFetch(`/resumes/${resumeId}/hobbies/${id}/`, {
        method: "PATCH",
        body: JSON.stringify(payload),
    });
    return handleResponse(res, "Failed to update hobby");
}

export async function deleteHobby(resumeId: string, id: string): Promise<void> {
    const res = await apiFetch(`/resumes/${resumeId}/hobbies/${id}/`, {
        method: "DELETE",
    });
    if (!res.ok) {
        await handleResponse(res, "Failed to delete hobby");
    }
}

// Custom Sections
export async function createCustomSection(resumeId: string, data: Partial<CustomSection>): Promise<CustomSection> {
    const payload = cleanPayload(data, ['items'], { title: "Section" }); // Strip items
    const res = await apiFetch(`/resumes/${resumeId}/custom-sections/`, {
        method: "POST",
        body: JSON.stringify(payload),
    });
    return handleResponse(res, "Failed to create custom section");
}

export async function updateCustomSection(resumeId: string, id: string, data: Partial<CustomSection>): Promise<CustomSection> {
    const payload = cleanPayload(data, ['items'], { title: "Section" }); // Strip items
    const res = await apiFetch(`/resumes/${resumeId}/custom-sections/${id}/`, {
        method: "PATCH",
        body: JSON.stringify(payload),
    });
    return handleResponse(res, "Failed to update custom section");
}

export async function deleteCustomSection(resumeId: string, id: string): Promise<void> {
    const res = await apiFetch(`/resumes/${resumeId}/custom-sections/${id}/`, {
        method: "DELETE",
    });
    if (!res.ok) {
        await handleResponse(res, "Failed to delete custom section");
    }
}

// Custom Items
export async function createCustomItem(resumeId: string, sectionId: string, data: Partial<CustomSectionItem>): Promise<CustomSectionItem> {
    const payload = cleanPayload(data, [], { title: "Item" });
    const res = await apiFetch(`/resumes/${resumeId}/custom-sections/${sectionId}/items/`, {
        method: "POST",
        body: JSON.stringify(payload),
    });
    return handleResponse(res, "Failed to create custom item");
}

export async function updateCustomItem(resumeId: string, sectionId: string, id: string, data: Partial<CustomSectionItem>): Promise<CustomSectionItem> {
    const payload = cleanPayload(data, [], { title: "Item" });
    const res = await apiFetch(`/resumes/${resumeId}/custom-sections/${sectionId}/items/${id}/`, {
        method: "PATCH",
        body: JSON.stringify(payload),
    });
    return handleResponse(res, "Failed to update custom item");
}

export async function deleteCustomItem(resumeId: string, sectionId: string, id: string): Promise<void> {
    const res = await apiFetch(`/resumes/${resumeId}/custom-sections/${sectionId}/items/${id}/`, {
        method: "DELETE",
    });
    if (!res.ok) {
        await handleResponse(res, "Failed to delete custom item");
    }
}
