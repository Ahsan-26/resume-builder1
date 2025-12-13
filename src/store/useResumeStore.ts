import { create } from 'zustand';
import { Resume, PersonalInfo, WorkExperience, Education, SkillCategory, CustomSection } from '../types/resume';
import { fetchResume, updateResume } from '../lib/api/resumes';

interface ResumeState {
    resume: Resume | null;
    isLoading: boolean;
    isSaving: boolean;
    error: string | null;

    // Actions
    fetchResume: (id: string) => Promise<void>;
    setResume: (resume: Resume) => void;
    updateResumeData: (data: Partial<Resume>) => void;
    updateTitle: (title: string) => void;

    // Experience
    addExperience: (experience: WorkExperience) => void;
    updateExperience: (id: string, experience: Partial<WorkExperience>) => void;
    removeExperience: (id: string) => void;

    // Education
    addEducation: (education: Education) => void;
    updateEducation: (id: string, education: Partial<Education>) => void;
    removeEducation: (id: string) => void;

    // Skills
    updateSkillCategories: (categories: SkillCategory[]) => void;

    // Strengths & Hobbies
    updateStrengths: (strengths: any[]) => void;
    updateHobbies: (hobbies: any[]) => void;

    // Custom Sections
    updateCustomSections: (sections: CustomSection[]) => void;

    // General Save
    saveResume: () => Promise<void>;
}

export const useResumeStore = create<ResumeState>((set, get) => ({
    resume: null,
    isLoading: false,
    isSaving: false,
    error: null,

    fetchResume: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
            const resume = await fetchResume(id);
            console.log("Fetched resume:", resume);
            if (!resume.id) {
                console.error("Fetched resume is missing ID:", resume);
            }
            set({ resume, isLoading: false });
        } catch (err) {
            set({ error: (err as Error).message, isLoading: false });
        }
    },

    setResume: (resume) => set({ resume }),

    updateResumeData: (data) =>
        set((state) => {
            if (!state.resume) return {};
            return {
                resume: {
                    ...state.resume,
                    ...data,
                },
            };
        }),

    updateTitle: (title) =>
        set((state) => {
            if (!state.resume) return {};
            return {
                resume: {
                    ...state.resume,
                    title,
                },
            };
        }),

    updatePersonalInfo: (info) =>
        set((state) => {
            if (!state.resume) return {};
            return {
                resume: {
                    ...state.resume,
                    personal_info: { ...state.resume.personal_info, ...info },
                },
            };
        }),

    addExperience: (experience) =>
        set((state) => {
            if (!state.resume) return {};
            return {
                resume: {
                    ...state.resume,
                    work_experiences: [...(state.resume.work_experiences || []), experience],
                },
            };
        }),

    updateExperience: (id, experience) =>
        set((state) => {
            if (!state.resume) return {};
            return {
                resume: {
                    ...state.resume,
                    work_experiences: (state.resume.work_experiences || []).map((exp) =>
                        exp.id === id ? { ...exp, ...experience } : exp
                    ),
                },
            };
        }),

    removeExperience: (id) =>
        set((state) => {
            if (!state.resume) return {};
            return {
                resume: {
                    ...state.resume,
                    work_experiences: (state.resume.work_experiences || []).filter((exp) => exp.id !== id),
                },
            };
        }),

    addEducation: (education) =>
        set((state) => {
            if (!state.resume) return {};
            return {
                resume: {
                    ...state.resume,
                    educations: [...(state.resume.educations || []), education],
                },
            };
        }),

    updateEducation: (id, education) =>
        set((state) => {
            if (!state.resume) return {};
            return {
                resume: {
                    ...state.resume,
                    educations: (state.resume.educations || []).map((edu) =>
                        edu.id === id ? { ...edu, ...education } : edu
                    ),
                },
            };
        }),

    removeEducation: (id) =>
        set((state) => {
            if (!state.resume) return {};
            return {
                resume: {
                    ...state.resume,
                    educations: (state.resume.educations || []).filter((edu) => edu.id !== id),
                },
            };
        }),

    updateSkillCategories: (categories) =>
        set((state) => {
            if (!state.resume) return {};
            return {
                resume: {
                    ...state.resume,
                    skill_categories: categories,
                },
            };
        }),

    updateStrengths: (strengths) =>
        set((state) => {
            if (!state.resume) return {};
            return {
                resume: {
                    ...state.resume,
                    strengths,
                },
            };
        }),

    updateHobbies: (hobbies) =>
        set((state) => {
            if (!state.resume) return {};
            return {
                resume: {
                    ...state.resume,
                    hobbies,
                },
            };
        }),

    updateCustomSections: (sections) =>
        set((state) => {
            if (!state.resume) return {};
            return {
                resume: {
                    ...state.resume,
                    custom_sections: sections,
                },
            };
        }),

    saveResume: async () => {
        const { resume } = get();
        if (!resume) {
            console.error("Cannot save: resume is null");
            return;
        }
        if (!resume.id) {
            console.error("Cannot save resume: ID is missing from resume object", resume);
            // Show user-friendly error
            const toast = (await import("react-hot-toast")).default;
            toast.error("Cannot save: Resume ID is missing. Please refresh the page.");
            return;
        }

        set({ isSaving: true });
        try {
            // Ensure personal_info is initialized
            const personal_info = resume.personal_info || {
                first_name: "",
                last_name: "",
                headline: "",
                summary: "",
                email: "",
                phone: "",
                city: "",
                country: "",
                website: "",
                linkedin_url: "",
                github_url: "",
                portfolio_url: "",
                photo_url: "",
            };

            // We only send the fields that are editable.
            const updateData = {
                title: resume.title,
                personal_info,
                work_experiences: resume.work_experiences || [],
                educations: resume.educations || [],
                skill_categories: resume.skill_categories || [],
                strengths: resume.strengths || [],
                hobbies: resume.hobbies || [],
                custom_sections: resume.custom_sections || [],
            };

            console.log("Saving resume with ID:", resume.id, "Data:", updateData);

            const updatedResume = await updateResume(resume.id, updateData);
            set({ resume: updatedResume, isSaving: false });
            
            // Show success message
            const toast = (await import("react-hot-toast")).default;
            toast.success("Resume saved successfully!");
        } catch (err) {
            console.error("Failed to save resume", err);
            set({ isSaving: false, error: "Failed to save changes" });
            
            // Show error message
            const toast = (await import("react-hot-toast")).default;
            const errorMessage = err instanceof Error ? err.message : "Failed to save changes";
            toast.error(errorMessage);
        }
    },
}));
