import { apiFetch } from "../apiClient";
import {
    PersonalInfo, WorkExperience, Education,
    SkillCategory, SkillItem, Strength, Hobby,
    CustomSection, CustomSectionItem
} from "../../types/resume";

// Personal Info
export async function updatePersonalInfo(resumeId: string, data: Partial<PersonalInfo>): Promise<PersonalInfo> {
    const res = await apiFetch(`/resumes/${resumeId}/personal-info/`, {
        method: "PATCH",
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update personal info");
    return res.json();
}

// Work Experience
export async function createWorkExperience(resumeId: string, data: Partial<WorkExperience>): Promise<WorkExperience> {
    const res = await apiFetch(`/resumes/${resumeId}/work-experiences/`, {
        method: "POST",
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create work experience");
    return res.json();
}

export async function updateWorkExperience(resumeId: string, id: string, data: Partial<WorkExperience>): Promise<WorkExperience> {
    const res = await apiFetch(`/resumes/${resumeId}/work-experiences/${id}/`, {
        method: "PATCH",
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update work experience");
    return res.json();
}

export async function deleteWorkExperience(resumeId: string, id: string): Promise<void> {
    const res = await apiFetch(`/resumes/${resumeId}/work-experiences/${id}/`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete work experience");
}

// Education
export async function createEducation(resumeId: string, data: Partial<Education>): Promise<Education> {
    const res = await apiFetch(`/resumes/${resumeId}/educations/`, {
        method: "POST",
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create education");
    return res.json();
}

export async function updateEducation(resumeId: string, id: string, data: Partial<Education>): Promise<Education> {
    const res = await apiFetch(`/resumes/${resumeId}/educations/${id}/`, {
        method: "PATCH",
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update education");
    return res.json();
}

export async function deleteEducation(resumeId: string, id: string): Promise<void> {
    const res = await apiFetch(`/resumes/${resumeId}/educations/${id}/`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete education");
}

// Skill Categories
export async function createSkillCategory(resumeId: string, data: Partial<SkillCategory>): Promise<SkillCategory> {
    const res = await apiFetch(`/resumes/${resumeId}/skill-categories/`, {
        method: "POST",
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create skill category");
    return res.json();
}

export async function updateSkillCategory(resumeId: string, id: string, data: Partial<SkillCategory>): Promise<SkillCategory> {
    const res = await apiFetch(`/resumes/${resumeId}/skill-categories/${id}/`, {
        method: "PATCH",
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update skill category");
    return res.json();
}

export async function deleteSkillCategory(resumeId: string, id: string): Promise<void> {
    const res = await apiFetch(`/resumes/${resumeId}/skill-categories/${id}/`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete skill category");
}

// Skill Items
export async function createSkillItem(resumeId: string, categoryId: string, data: Partial<SkillItem>): Promise<SkillItem> {
    const res = await apiFetch(`/resumes/${resumeId}/skill-categories/${categoryId}/items/`, {
        method: "POST",
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create skill item");
    return res.json();
}

export async function updateSkillItem(resumeId: string, categoryId: string, id: string, data: Partial<SkillItem>): Promise<SkillItem> {
    const res = await apiFetch(`/resumes/${resumeId}/skill-categories/${categoryId}/items/${id}/`, {
        method: "PATCH",
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update skill item");
    return res.json();
}

export async function deleteSkillItem(resumeId: string, categoryId: string, id: string): Promise<void> {
    const res = await apiFetch(`/resumes/${resumeId}/skill-categories/${categoryId}/items/${id}/`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete skill item");
}

// Strengths
export async function createStrength(resumeId: string, data: Partial<Strength>): Promise<Strength> {
    const res = await apiFetch(`/resumes/${resumeId}/strengths/`, {
        method: "POST",
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create strength");
    return res.json();
}

export async function updateStrength(resumeId: string, id: string, data: Partial<Strength>): Promise<Strength> {
    const res = await apiFetch(`/resumes/${resumeId}/strengths/${id}/`, {
        method: "PATCH",
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update strength");
    return res.json();
}

export async function deleteStrength(resumeId: string, id: string): Promise<void> {
    const res = await apiFetch(`/resumes/${resumeId}/strengths/${id}/`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete strength");
}

// Hobbies
export async function createHobby(resumeId: string, data: Partial<Hobby>): Promise<Hobby> {
    const res = await apiFetch(`/resumes/${resumeId}/hobbies/`, {
        method: "POST",
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create hobby");
    return res.json();
}

export async function updateHobby(resumeId: string, id: string, data: Partial<Hobby>): Promise<Hobby> {
    const res = await apiFetch(`/resumes/${resumeId}/hobbies/${id}/`, {
        method: "PATCH",
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update hobby");
    return res.json();
}

export async function deleteHobby(resumeId: string, id: string): Promise<void> {
    const res = await apiFetch(`/resumes/${resumeId}/hobbies/${id}/`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete hobby");
}

// Custom Sections
export async function createCustomSection(resumeId: string, data: Partial<CustomSection>): Promise<CustomSection> {
    const res = await apiFetch(`/resumes/${resumeId}/custom-sections/`, {
        method: "POST",
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create custom section");
    return res.json();
}

export async function updateCustomSection(resumeId: string, id: string, data: Partial<CustomSection>): Promise<CustomSection> {
    const res = await apiFetch(`/resumes/${resumeId}/custom-sections/${id}/`, {
        method: "PATCH",
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update custom section");
    return res.json();
}

export async function deleteCustomSection(resumeId: string, id: string): Promise<void> {
    const res = await apiFetch(`/resumes/${resumeId}/custom-sections/${id}/`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete custom section");
}

// Custom Items
export async function createCustomItem(resumeId: string, sectionId: string, data: Partial<CustomSectionItem>): Promise<CustomSectionItem> {
    const res = await apiFetch(`/resumes/${resumeId}/custom-sections/${sectionId}/items/`, {
        method: "POST",
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create custom item");
    return res.json();
}

export async function updateCustomItem(resumeId: string, sectionId: string, id: string, data: Partial<CustomSectionItem>): Promise<CustomSectionItem> {
    const res = await apiFetch(`/resumes/${resumeId}/custom-sections/${sectionId}/items/${id}/`, {
        method: "PATCH",
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update custom item");
    return res.json();
}

export async function deleteCustomItem(resumeId: string, sectionId: string, id: string): Promise<void> {
    const res = await apiFetch(`/resumes/${resumeId}/custom-sections/${sectionId}/items/${id}/`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete custom item");
}
