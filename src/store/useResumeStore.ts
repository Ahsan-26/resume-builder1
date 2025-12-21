import { create } from 'zustand';
import { Resume, PersonalInfo, WorkExperience, Education, SkillCategory, CustomSection } from '../types/resume';
import { fetchResume, updateResume, autosaveResume } from '../lib/api/resumes';

// Module-level variable to track autosave timeout
let autosaveTimeout: NodeJS.Timeout | null = null;

interface ResumeState {
    resume: Resume | null;
    isLoading: boolean;
    isSaving: boolean;
    isAutosaving: boolean;
    lastSaved: Date | null;
    error: string | null;
    isPreviewMode: boolean;

    // Actions
    fetchResume: (id: string) => Promise<void>;
    setResume: (resume: Resume) => void;
    setIsPreviewMode: (isPreview: boolean) => void;
    updateResumeData: (data: Partial<Resume>) => void;
    updateTitle: (title: string) => void;
    updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
    updateSectionOrder: (sectionSettings: Record<string, { order: number; visible: boolean }>) => void;

    // Experience
    addExperience: (experience: WorkExperience) => void;
    updateExperience: (id: string, experience: Partial<WorkExperience>) => void;
    removeExperience: (id: string) => Promise<void>;

    // Education
    addEducation: (education: Education) => void;
    updateEducation: (id: string, education: Partial<Education>) => void;
    removeEducation: (id: string) => Promise<void>;

    // Skills
    updateSkillCategories: (categories: SkillCategory[]) => Promise<void>;

    // Strengths & Hobbies
    updateStrengths: (strengths: any[]) => Promise<void>;
    updateHobbies: (hobbies: any[]) => Promise<void>;

    // Custom Sections
    updateCustomSections: (sections: CustomSection[]) => Promise<void>;

    // General Save
    saveResume: () => Promise<void>;
    autosaveResume: () => Promise<void>;
}

export const useResumeStore = create<ResumeState>((set, get) => ({
    resume: null,
    isLoading: false,
    isSaving: false,
    isAutosaving: false,
    lastSaved: null,
    error: null,
    isPreviewMode: false,

    fetchResume: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
            const resume = await fetchResume(id);
            console.log("Fetched resume:", resume);
            console.log("Personal Info from backend:", resume.personal_info);
            if (!resume.id) {
                console.error("Fetched resume is missing ID:", resume);
            }
            set({ resume, isLoading: false });
        } catch (err) {
            set({ error: (err as Error).message, isLoading: false });
        }
    },

    setResume: (resume) => set({ resume }),

    setIsPreviewMode: (isPreview) => set({ isPreviewMode: isPreview }),

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

    updateSectionOrder: (sectionSettings) =>
        set((state) => {
            if (!state.resume) return {};
            return {
                resume: {
                    ...state.resume,
                    section_settings: sectionSettings,
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

    removeExperience: async (id) => {
        const { resume } = get();
        if (!resume) return;

        // Store original state for rollback
        const originalExperiences = resume.work_experiences || [];

        // Optimistic update - remove immediately from UI
        set((state) => {
            if (!state.resume) return {};
            return {
                resume: {
                    ...state.resume,
                    work_experiences: originalExperiences.filter((exp) => exp.id !== id),
                },
            };
        });

        // Sync with backend
        try {
            await get().autosaveResume();
            console.log('Experience deleted successfully');
        } catch (error) {
            // Rollback on error
            console.error('Failed to delete experience:', error);
            set((state) => {
                if (!state.resume) return {};
                return {
                    resume: {
                        ...state.resume,
                        work_experiences: originalExperiences,
                    },
                };
            });
            const toast = (await import("react-hot-toast")).default;
            toast.error('Failed to delete experience');
        }
    },

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

    removeEducation: async (id) => {
        const { resume } = get();
        if (!resume) return;

        // Store original state for rollback
        const originalEducations = resume.educations || [];

        // Optimistic update - remove immediately from UI
        set((state) => {
            if (!state.resume) return {};
            return {
                resume: {
                    ...state.resume,
                    educations: originalEducations.filter((edu) => edu.id !== id),
                },
            };
        });

        // Sync with backend
        try {
            await get().autosaveResume();
            console.log('Education deleted successfully');
        } catch (error) {
            // Rollback on error
            console.error('Failed to delete education:', error);
            set((state) => {
                if (!state.resume) return {};
                return {
                    resume: {
                        ...state.resume,
                        educations: originalEducations,
                    },
                };
            });
            const toast = (await import("react-hot-toast")).default;
            toast.error('Failed to delete education');
        }
    },

    updateSkillCategories: async (categories) => {
        const { resume } = get();
        if (!resume) return;

        const originalCategories = resume.skill_categories || [];

        // Optimistic update
        set((state) => {
            if (!state.resume) return {};
            return {
                resume: {
                    ...state.resume,
                    skill_categories: categories,
                },
            };
        });

        // Sync with backend
        try {
            await get().autosaveResume();
        } catch (error) {
            console.error('Failed to update skills:', error);
            set((state) => {
                if (!state.resume) return {};
                return {
                    resume: {
                        ...state.resume,
                        skill_categories: originalCategories,
                    },
                };
            });
        }
    },

    updateStrengths: async (strengths) => {
        const { resume } = get();
        if (!resume) return;

        const originalStrengths = resume.strengths || [];

        // Optimistic update
        set((state) => {
            if (!state.resume) return {};
            return {
                resume: {
                    ...state.resume,
                    strengths,
                },
            };
        });

        // Sync with backend
        try {
            await get().autosaveResume();
        } catch (error) {
            console.error('Failed to update strengths:', error);
            set((state) => {
                if (!state.resume) return {};
                return {
                    resume: {
                        ...state.resume,
                        strengths: originalStrengths,
                    },
                };
            });
        }
    },

    updateHobbies: async (hobbies) => {
        const { resume } = get();
        if (!resume) return;

        const originalHobbies = resume.hobbies || [];

        // Optimistic update
        set((state) => {
            if (!state.resume) return {};
            return {
                resume: {
                    ...state.resume,
                    hobbies,
                },
            };
        });

        // Sync with backend
        try {
            await get().autosaveResume();
        } catch (error) {
            console.error('Failed to update hobbies:', error);
            set((state) => {
                if (!state.resume) return {};
                return {
                    resume: {
                        ...state.resume,
                        hobbies: originalHobbies,
                    },
                };
            });
        }
    },

    updateCustomSections: async (sections) => {
        const { resume } = get();
        if (!resume) return;

        const originalSections = resume.custom_sections || [];

        // Optimistic update
        set((state) => {
            if (!state.resume) return {};
            return {
                resume: {
                    ...state.resume,
                    custom_sections: sections,
                },
            };
        });

        // Sync with backend
        try {
            await get().autosaveResume();
        } catch (error) {
            console.error('Failed to update custom sections:', error);
            set((state) => {
                if (!state.resume) return {};
                return {
                    resume: {
                        ...state.resume,
                        custom_sections: originalSections,
                    },
                };
            });
        }
    },

    saveResume: async () => {
        const { resume, isSaving, isAutosaving } = get();
        if (!resume || !resume.id || isSaving || isAutosaving) return;

        set({ isSaving: true });
        try {
            const updateData = {
                title: resume.title,
                personal_info: resume.personal_info,
                section_settings: resume.section_settings || {},
                work_experiences: resume.work_experiences || [],
                educations: resume.educations || [],
                skill_categories: resume.skill_categories || [],
                strengths: resume.strengths || [],
                hobbies: resume.hobbies || [],
                custom_sections: resume.custom_sections || [],
            };

            const updatedResume = await updateResume(resume.id, updateData);
            console.log("Save response from backend:", updatedResume);

            set({
                resume: { ...resume, ...updatedResume },
                isSaving: false,
                lastSaved: new Date()
            });

            const toast = (await import("react-hot-toast")).default;
            toast.success("Resume saved successfully!");
        } catch (err) {
            console.error("Failed to save resume", err);
            const errorMessage = (err as Error).message || "Failed to save changes";
            set({ isSaving: false, error: errorMessage });
            const toast = (await import("react-hot-toast")).default;
            toast.error(errorMessage);
        }
    },

    autosaveResume: async () => {
        // Clear any existing timeout
        if (autosaveTimeout) {
            clearTimeout(autosaveTimeout);
        }

        // Set a new timeout to debounce the autosave
        autosaveTimeout = setTimeout(async () => {
            const { resume, isSaving, isAutosaving } = get();

            // If we're already saving or autosaving, we'll try again in a moment
            if (!resume || !resume.id || isSaving || isAutosaving) {
                // If it's still autosaving, reschedule the check
                if (isAutosaving) {
                    get().autosaveResume();
                }
                return;
            }

            set({ isAutosaving: true });
            try {
                const updateData = {
                    title: resume.title,
                    personal_info: resume.personal_info,
                    section_settings: resume.section_settings || {},
                    work_experiences: resume.work_experiences || [],
                    educations: resume.educations || [],
                    skill_categories: resume.skill_categories || [],
                    strengths: resume.strengths || [],
                    hobbies: resume.hobbies || [],
                    custom_sections: resume.custom_sections || [],
                };

                const updatedResume = await autosaveResume(resume.id, updateData);
                console.log("Autosave response from backend:", updatedResume);

                set({
                    resume: { ...resume, ...updatedResume },
                    isAutosaving: false,
                    lastSaved: new Date()
                });
            } catch (err) {
                console.error("Failed to autosave resume", err);
                set({ isAutosaving: false });
            }
        }, 1500); // 1.5 second debounce
    },
}));
