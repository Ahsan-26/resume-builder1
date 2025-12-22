import { create } from 'zustand';
import { Resume, PersonalInfo, WorkExperience, Education, SkillCategory, CustomSection } from '../types/resume';
import { fetchResume, updateResume, autosaveResume as bulkAutosaveResume, downloadResumePdf } from '../lib/api/resumes';
import * as sectionApi from '../lib/api/sections';

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
    downloadResume: () => Promise<void>;
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

    updateSectionOrder: (sectionSettings) => {
        set((state) => {
            if (!state.resume) return {};
            return {
                resume: {
                    ...state.resume,
                    section_settings: sectionSettings,
                },
            };
        });
        get().autosaveResume();
    },

    updateTitle: (title) => {
        set((state) => {
            if (!state.resume) return {};
            return {
                resume: {
                    ...state.resume,
                    title,
                },
            };
        });
        get().autosaveResume();
    },

    updatePersonalInfo: (info) => {
        set((state) => {
            if (!state.resume) return {};
            return {
                resume: {
                    ...state.resume,
                    personal_info: { ...state.resume.personal_info, ...info },
                },
            };
        });
        get().autosaveResume();
    },

    addExperience: async (experience) => {
        const { resume } = get();
        if (!resume) return;

        // Optimistic update
        set((state) => {
            if (!state.resume) return {};
            return {
                resume: {
                    ...state.resume,
                    work_experiences: [...(state.resume.work_experiences || []), experience],
                },
            };
        });

        // Sync with backend
        try {
            const newExp = await sectionApi.createWorkExperience(resume.id, experience);
            // Update the item with the real backend ID
            set((state) => {
                if (!state.resume) return {};
                return {
                    resume: {
                        ...state.resume,
                        work_experiences: (state.resume.work_experiences || []).map(exp =>
                            exp.id === experience.id ? newExp : exp
                        ),
                    },
                };
            });
        } catch (error) {
            console.error('Failed to add experience:', error);
            // Rollback
            set((state) => {
                if (!state.resume) return {};
                return {
                    resume: {
                        ...state.resume,
                        work_experiences: (state.resume.work_experiences || []).filter(exp => exp.id !== experience.id),
                    },
                };
            });
        }
    },

    updateExperience: (id, experience) => {
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
        });
        get().autosaveResume();
    },

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
            await sectionApi.deleteWorkExperience(resume.id, id);
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

    addEducation: async (education) => {
        const { resume } = get();
        if (!resume) return;

        // Optimistic update
        set((state) => {
            if (!state.resume) return {};
            return {
                resume: {
                    ...state.resume,
                    educations: [...(state.resume.educations || []), education],
                },
            };
        });

        // Sync with backend
        try {
            const newEdu = await sectionApi.createEducation(resume.id, education);
            // Update the item with the real backend ID
            set((state) => {
                if (!state.resume) return {};
                return {
                    resume: {
                        ...state.resume,
                        educations: (state.resume.educations || []).map(edu =>
                            edu.id === education.id ? newEdu : edu
                        ),
                    },
                };
            });
        } catch (error) {
            console.error('Failed to add education:', error);
            // Rollback
            set((state) => {
                if (!state.resume) return {};
                return {
                    resume: {
                        ...state.resume,
                        educations: (state.resume.educations || []).filter(edu => edu.id !== education.id),
                    },
                };
            });
        }
    },

    updateEducation: (id, education) => {
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
        });
        get().autosaveResume();
    },

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
            await sectionApi.deleteEducation(resume.id, id);
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
            // 1. Handle Deleted Categories
            const deletedCategories = originalCategories.filter(oc => !categories.find(c => c.id === oc.id));
            for (const cat of deletedCategories) {
                await sectionApi.deleteSkillCategory(resume.id, cat.id);
            }

            // 2. Handle New or Updated Categories
            for (const cat of categories) {
                const originalCat = originalCategories.find(oc => oc.id === cat.id);
                let currentCatId = cat.id;

                if (!originalCat) {
                    // New Category
                    const newCat = await sectionApi.createSkillCategory(resume.id, cat);
                    currentCatId = newCat.id;
                    // Update state with real ID
                    set(state => ({
                        resume: state.resume ? {
                            ...state.resume,
                            skill_categories: (state.resume.skill_categories || []).map(c => c.id === cat.id ? newCat : c)
                        } : null
                    }));
                } else {
                    // Updated Category
                    await sectionApi.updateSkillCategory(resume.id, cat.id, cat);
                }

                // 3. Handle Items within Category
                const originalItems = originalCat?.items || [];
                const currentItems = cat.items || [];

                // Delete removed items
                const deletedItems = originalItems.filter(oi => !currentItems.find(i => i.id === oi.id));
                for (const item of deletedItems) {
                    await sectionApi.deleteSkillItem(resume.id, currentCatId, item.id);
                }

                // Create or Update items
                for (const item of currentItems) {
                    const originalItem = originalItems.find(oi => oi.id === item.id);
                    if (!originalItem) {
                        const newItem = await sectionApi.createSkillItem(resume.id, currentCatId, item);
                        // Update state with real ID
                        set(state => ({
                            resume: state.resume ? {
                                ...state.resume,
                                skill_categories: (state.resume.skill_categories || []).map(c =>
                                    c.id === currentCatId ? { ...c, items: (c.items || []).map(i => i.id === item.id ? newItem : i) } : c
                                )
                            } : null
                        }));
                    } else {
                        await sectionApi.updateSkillItem(resume.id, currentCatId, item.id, item);
                    }
                }
            }
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
        const newStrengths = strengths.filter(s => !originalStrengths.find(os => os.id === s.id));
        const deletedStrengths = originalStrengths.filter(os => !strengths.find(s => s.id === os.id));

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
            for (const s of newStrengths) {
                await sectionApi.createStrength(resume.id, s);
            }
            for (const s of deletedStrengths) {
                await sectionApi.deleteStrength(resume.id, s.id);
            }
            // Handle updates for existing strengths
            const existingStrengths = strengths.filter(s => originalStrengths.find(os => os.id === s.id));
            for (const s of existingStrengths) {
                const original = originalStrengths.find(os => os.id === s.id);
                if (JSON.stringify(original) !== JSON.stringify(s)) {
                    await sectionApi.updateStrength(resume.id, s.id, s);
                }
            }
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
        const newHobbies = hobbies.filter(h => !originalHobbies.find(oh => oh.id === h.id));
        const deletedHobbies = originalHobbies.filter(oh => !hobbies.find(h => h.id === oh.id));

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
            for (const h of newHobbies) {
                await sectionApi.createHobby(resume.id, h);
            }
            for (const h of deletedHobbies) {
                await sectionApi.deleteHobby(resume.id, h.id);
            }
            // Handle updates for existing hobbies
            const existingHobbies = hobbies.filter(h => originalHobbies.find(oh => oh.id === h.id));
            for (const h of existingHobbies) {
                const original = originalHobbies.find(oh => oh.id === h.id);
                if (JSON.stringify(original) !== JSON.stringify(h)) {
                    await sectionApi.updateHobby(resume.id, h.id, h);
                }
            }
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
            // 1. Handle Deleted Sections
            const deletedSections = originalSections.filter(os => !sections.find(s => s.id === os.id));
            for (const sec of deletedSections) {
                await sectionApi.deleteCustomSection(resume.id, sec.id);
            }

            // 2. Handle New or Updated Sections
            for (const sec of sections) {
                const originalSec = originalSections.find(os => os.id === sec.id);
                let currentSecId = sec.id;

                if (!originalSec) {
                    const newSec = await sectionApi.createCustomSection(resume.id, sec);
                    currentSecId = newSec.id;
                    set(state => ({
                        resume: state.resume ? {
                            ...state.resume,
                            custom_sections: (state.resume.custom_sections || []).map(s => s.id === sec.id ? newSec : s)
                        } : null
                    }));
                } else {
                    await sectionApi.updateCustomSection(resume.id, sec.id, sec);
                }

                // 3. Handle Items
                const originalItems = originalSec?.items || [];
                const currentItems = sec.items || [];

                const deletedItems = originalItems.filter(oi => !currentItems.find(i => i.id === oi.id));
                for (const item of deletedItems) {
                    await sectionApi.deleteCustomItem(resume.id, currentSecId, item.id);
                }

                for (const item of currentItems) {
                    const originalItem = originalItems.find(oi => oi.id === item.id);
                    if (!originalItem) {
                        const newItem = await sectionApi.createCustomItem(resume.id, currentSecId, item);
                        set(state => ({
                            resume: state.resume ? {
                                ...state.resume,
                                custom_sections: (state.resume.custom_sections || []).map(s =>
                                    s.id === currentSecId ? { ...s, items: (s.items || []).map(i => i.id === item.id ? newItem : i) } : s
                                )
                            } : null
                        }));
                    } else {
                        await sectionApi.updateCustomItem(resume.id, currentSecId, item.id, item);
                    }
                }
            }
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

        // Clear any pending autosave since we're doing a manual save now
        if (autosaveTimeout) {
            clearTimeout(autosaveTimeout);
            autosaveTimeout = null;
        }

        set({ isSaving: true });
        try {
            // 1. Sync Metadata (Title, Settings, Status)
            const updateData = {
                title: resume.title,
                section_settings: resume.section_settings || {},
                status: resume.status,
            };
            const updatedResume = await updateResume(resume.id, updateData);

            // 2. Granular Sync of all sections
            await sectionApi.updatePersonalInfo(resume.id, resume.personal_info);

            for (const exp of (resume.work_experiences || [])) {
                await sectionApi.updateWorkExperience(resume.id, exp.id, exp);
            }

            for (const edu of (resume.educations || [])) {
                await sectionApi.updateEducation(resume.id, edu.id, edu);
            }

            for (const cat of (resume.skill_categories || [])) {
                await sectionApi.updateSkillCategory(resume.id, cat.id, cat);
                for (const item of (cat.items || [])) {
                    await sectionApi.updateSkillItem(resume.id, cat.id, item.id, item);
                }
            }

            for (const s of (resume.strengths || [])) {
                await sectionApi.updateStrength(resume.id, s.id, s);
            }

            for (const h of (resume.hobbies || [])) {
                await sectionApi.updateHobby(resume.id, h.id, h);
            }

            for (const sec of (resume.custom_sections || [])) {
                await sectionApi.updateCustomSection(resume.id, sec.id, sec);
                for (const item of (sec.items || [])) {
                    await sectionApi.updateCustomItem(resume.id, sec.id, item.id, item);
                }
            }

            console.log("Manual save completed with full granular sync");

            // 3. Update state non-destructively
            set({
                resume: {
                    ...resume,
                    title: updatedResume.title,
                    section_settings: updatedResume.section_settings,
                    status: updatedResume.status,
                    updated_at: updatedResume.updated_at,
                    last_edited_at: updatedResume.last_edited_at
                },
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
                // Sync metadata
                const updateData = {
                    title: resume.title,
                    section_settings: resume.section_settings || {},
                    status: resume.status,
                };
                const updatedResume = await bulkAutosaveResume(resume.id, updateData);

                // Sync Personal Info
                console.log("Syncing personal info:", resume.personal_info);
                await sectionApi.updatePersonalInfo(resume.id, resume.personal_info);

                // Sync Experiences
                for (const exp of (resume.work_experiences || [])) {
                    await sectionApi.updateWorkExperience(resume.id, exp.id, exp);
                }

                // Sync Educations
                for (const edu of (resume.educations || [])) {
                    await sectionApi.updateEducation(resume.id, edu.id, edu);
                }

                // Sync Skills
                for (const cat of (resume.skill_categories || [])) {
                    await sectionApi.updateSkillCategory(resume.id, cat.id, cat);
                    for (const item of (cat.items || [])) {
                        await sectionApi.updateSkillItem(resume.id, cat.id, item.id, item);
                    }
                }

                // Sync Strengths
                for (const s of (resume.strengths || [])) {
                    await sectionApi.updateStrength(resume.id, s.id, s);
                }

                // Sync Hobbies
                for (const h of (resume.hobbies || [])) {
                    await sectionApi.updateHobby(resume.id, h.id, h);
                }

                // Sync Custom Sections
                for (const sec of (resume.custom_sections || [])) {
                    await sectionApi.updateCustomSection(resume.id, sec.id, sec);
                    for (const item of (sec.items || [])) {
                        await sectionApi.updateCustomItem(resume.id, sec.id, item.id, item);
                    }
                }

                console.log("Autosave completed with granular sync");

                set({
                    resume: {
                        ...resume,
                        title: updatedResume.title,
                        section_settings: updatedResume.section_settings,
                        status: updatedResume.status,
                        updated_at: updatedResume.updated_at,
                        last_edited_at: updatedResume.last_edited_at
                    },
                    isAutosaving: false,
                    lastSaved: new Date()
                });
            } catch (err) {
                console.error("Failed to autosave resume", err);
                set({ isAutosaving: false });
            }
        }, 1500); // 1.5 second debounce
    },

    downloadResume: async () => {
        const { resume } = get();
        if (!resume || !resume.id) return;

        const toast = (await import("react-hot-toast")).default;
        const loadingToast = toast.loading("Generating PDF...");

        try {
            const blob = await downloadResumePdf(resume.id);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${resume.title || 'resume'}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
            toast.success("Resume downloaded successfully!", { id: loadingToast });
        } catch (err) {
            console.error("Failed to download resume", err);
            toast.error((err as Error).message || "Failed to download resume", { id: loadingToast });
        }
    },
})
);
