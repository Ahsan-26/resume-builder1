import { create } from 'zustand';
import { Resume, PersonalInfo, WorkExperience, Education, SkillCategory, CustomSection, Template } from '../types/resume';
import { fetchResume, updateResume, autosaveResume as bulkAutosaveResume, downloadResumePdf } from '../lib/api/resumes';
import * as sectionApi from '../lib/api/sections';

// Module-level variables to track autosave timeouts
let autosaveTimeout: NodeJS.Timeout | null = null;
const sectionTimeouts: Record<string, NodeJS.Timeout> = {};

const debounceSync = (key: string, fn: () => Promise<void>, delay = 1500) => {
    if (sectionTimeouts[key]) {
        clearTimeout(sectionTimeouts[key]);
    }
    sectionTimeouts[key] = setTimeout(fn, delay);
};

interface ResumeState {
    resume: Resume | null;
    originalResume: Resume | null;
    isLoading: boolean;
    isSaving: boolean;
    isAutosaving: boolean;
    lastSaved: Date | null;
    error: string | null;
    isPreviewMode: boolean;
    activeSection: string;

    // Actions
    fetchResume: (id: string) => Promise<void>;
    setResume: (resume: Resume) => void;
    setIsPreviewMode: (isPreview: boolean) => void;
    setActiveSection: (section: string) => void;
    updateResumeData: (data: Partial<Resume>) => void;
    updateTitle: (title: string) => void;
    updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
    updateSectionOrder: (sectionSettings: Record<string, { order: number; visible: boolean; area?: string }>) => void;
    updateSectionSettings: (sectionId: string, settings: Partial<Resume['section_settings'][string]>) => void;
    reorderItems: (sectionId: string, itemIds: string[]) => void;

    // Experience
    addExperience: (experience: WorkExperience) => void;
    updateExperience: (id: string, experience: Partial<WorkExperience>) => void;
    removeExperience: (id: string) => Promise<void>;

    // Education
    addEducation: (education: Education) => void;
    updateEducation: (id: string, education: Partial<Education>) => void;
    removeEducation: (id: string) => Promise<void>;

    // Skills
    updateSkillCategories: (categories: SkillCategory[]) => void;

    // Strengths & Hobbies
    updateStrengths: (strengths: any[]) => void;
    updateHobbies: (hobbies: any[]) => void;

    // Custom Sections
    updateCustomSections: (sections: CustomSection[]) => void;
    updateTemplate: (template: Template) => void;

    // General Save
    saveResume: () => Promise<void>;
    autosaveResume: () => Promise<void>;

    // Granular Sync Actions
    syncPersonalInfo: () => Promise<void>;
    syncExperience: (id: string) => Promise<void>;
    syncEducation: (id: string) => Promise<void>;
    syncSkillCategories: () => Promise<void>;
    syncStrengths: () => Promise<void>;
    syncHobbies: () => Promise<void>;
    syncCustomSections: () => Promise<void>;
    syncMetadata: () => Promise<void>;

    rollbackState: (errorMsg: string) => Promise<void>;
    downloadResume: () => Promise<void>;
}

export const useResumeStore = create<ResumeState>((set, get) => ({
    resume: null,
    originalResume: null,
    isLoading: false,
    isSaving: false,
    isAutosaving: false,
    lastSaved: null,
    error: null,
    isPreviewMode: false,
    activeSection: "personal",

    rollbackState: async (errorMsg: string) => {
        const { originalResume } = get();
        if (originalResume) {
            set({ resume: JSON.parse(JSON.stringify(originalResume)), error: errorMsg });
            const toast = (await import("react-hot-toast")).default;
            toast.error(errorMsg);
        }
    },

    fetchResume: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
            const resume = await fetchResume(id);
            set({ resume, originalResume: JSON.parse(JSON.stringify(resume)), isLoading: false });
        } catch (err) {
            set({ error: (err as Error).message, isLoading: false });
        }
    },

    setResume: (resume) => set({ resume }),

    setIsPreviewMode: (isPreview) => set({ isPreviewMode: isPreview }),

    setActiveSection: (section) => set({ activeSection: section }),

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
            const currentSettings = state.resume.section_settings || {};
            const newSettings = { ...currentSettings };
            const newCustomSections = [...(state.resume.custom_sections || [])];
            let customChanged = false;

            Object.entries(sectionSettings).forEach(([key, value]) => {
                // 1. Update global section settings (frontend state)
                newSettings[key] = {
                    ...currentSettings[key],
                    order: value.order,
                    visible: value.visible,
                    area: (value.area as any) || currentSettings[key]?.area
                };

                // 2. If it's a custom section, also update its internal order AND area
                const customIdx = newCustomSections.findIndex(s => s.id === key);
                if (customIdx !== -1) {
                    newCustomSections[customIdx] = {
                        ...newCustomSections[customIdx],
                        order: value.order,
                        area: (value.area as any) || newCustomSections[customIdx].area
                    };
                    customChanged = true;
                }
            });

            return {
                resume: {
                    ...state.resume,
                    section_settings: newSettings,
                    custom_sections: newCustomSections
                },
            };
        });

        const { resume, originalResume } = get();
        debounceSync('metadata', get().syncMetadata);

        // Check if custom sections actually changed compared to original
        const customChanged = JSON.stringify(resume?.custom_sections) !== JSON.stringify(originalResume?.custom_sections);
        if (customChanged) {
            debounceSync('custom_sections', get().syncCustomSections);
        }
    },

    updateSectionSettings: (sectionId, settings) => {
        set((state) => {
            if (!state.resume) return {};
            const currentSettings = state.resume.section_settings || {};
            return {
                resume: {
                    ...state.resume,
                    section_settings: {
                        ...currentSettings,
                        [sectionId]: {
                            ...currentSettings[sectionId],
                            ...settings
                        }
                    },
                },
            };
        });
        debounceSync('metadata', get().syncMetadata);
    },

    reorderItems: (sectionId, itemIds) => {
        set((state) => {
            if (!state.resume) return {};
            const resume = state.resume;

            const updateItems = (items: any[]) => {
                return [...items].sort((a, b) => {
                    const indexA = itemIds.indexOf(a.id);
                    const indexB = itemIds.indexOf(b.id);
                    return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
                }).map((item, index) => ({ ...item, order: index }));
            };

            const updates: Partial<Resume> = {};
            if (sectionId === 'work_experiences') updates.work_experiences = updateItems(resume.work_experiences || []);
            else if (sectionId === 'educations') updates.educations = updateItems(resume.educations || []);
            else if (sectionId === 'skill_categories') updates.skill_categories = updateItems(resume.skill_categories || []);
            else if (sectionId === 'strengths') updates.strengths = updateItems(resume.strengths || []);
            else if (sectionId === 'hobbies') updates.hobbies = updateItems(resume.hobbies || []);

            return {
                resume: {
                    ...resume,
                    ...updates
                }
            };
        });
        const { resume } = get();
        if (sectionId === 'work_experiences') resume?.work_experiences.forEach(exp => get().syncExperience(exp.id));
        else if (sectionId === 'educations') resume?.educations.forEach(edu => get().syncEducation(edu.id));
        else if (sectionId === 'skill_categories') get().syncSkillCategories();
        else if (sectionId === 'strengths') get().syncStrengths();
        else if (sectionId === 'hobbies') get().syncHobbies();
    },

    updateTitle: (title) => {
        set((state) => {
            if (!state.resume) return {};
            return { resume: { ...state.resume, title } };
        });
        debounceSync('metadata', get().syncMetadata);
    },

    updatePersonalInfo: (info) => {
        set((state) => {
            if (!state.resume) return {};
            return { resume: { ...state.resume, personal_info: { ...state.resume.personal_info, ...info } } };
        });
        debounceSync('personal_info', get().syncPersonalInfo);
    },

    addExperience: async (experience) => {
        const { resume } = get();
        if (!resume) return;
        set((state) => {
            if (!state.resume) return {};
            return { resume: { ...state.resume, work_experiences: [...(state.resume.work_experiences || []), experience] } };
        });
        try {
            const newExp = await sectionApi.createWorkExperience(resume.id, experience);
            set((state) => {
                if (!state.resume) return {};
                return {
                    resume: {
                        ...state.resume,
                        work_experiences: (state.resume.work_experiences || []).map(exp => exp.id === experience.id ? newExp : exp),
                    },
                };
            });
        } catch (error) {
            console.error('Failed to add experience:', error);
            set((state) => {
                if (!state.resume) return {};
                return { resume: { ...state.resume, work_experiences: (state.resume.work_experiences || []).filter(exp => exp.id !== experience.id) } };
            });
        }
    },

    updateExperience: (id, experience) => {
        set((state) => {
            if (!state.resume) return {};
            return {
                resume: {
                    ...state.resume,
                    work_experiences: (state.resume.work_experiences || []).map((exp) => exp.id === id ? { ...exp, ...experience } : exp),
                },
            };
        });
        debounceSync(`experience-${id}`, () => get().syncExperience(id));
    },

    removeExperience: async (id) => {
        const { resume } = get();
        if (!resume) return;
        const originalExperiences = resume.work_experiences || [];
        set((state) => {
            if (!state.resume) return {};
            return { resume: { ...state.resume, work_experiences: originalExperiences.filter((exp) => exp.id !== id) } };
        });
        try {
            await sectionApi.deleteWorkExperience(resume.id, id);
        } catch (error) {
            console.error('Failed to delete experience:', error);
            set((state) => {
                if (!state.resume) return {};
                return { resume: { ...state.resume, work_experiences: originalExperiences } };
            });
            const toast = (await import("react-hot-toast")).default;
            toast.error('Failed to delete experience');
        }
    },

    addEducation: async (education) => {
        const { resume } = get();
        if (!resume) return;
        set((state) => {
            if (!state.resume) return {};
            return { resume: { ...state.resume, educations: [...(state.resume.educations || []), education] } };
        });
        try {
            const newEdu = await sectionApi.createEducation(resume.id, education);
            set((state) => {
                if (!state.resume) return {};
                return {
                    resume: {
                        ...state.resume,
                        educations: (state.resume.educations || []).map(edu => edu.id === education.id ? newEdu : edu),
                    },
                };
            });
        } catch (error) {
            console.error('Failed to add education:', error);
            set((state) => {
                if (!state.resume) return {};
                return { resume: { ...state.resume, educations: (state.resume.educations || []).filter(edu => edu.id !== education.id) } };
            });
        }
    },

    updateEducation: (id, education) => {
        set((state) => {
            if (!state.resume) return {};
            return {
                resume: {
                    ...state.resume,
                    educations: (state.resume.educations || []).map((edu) => edu.id === id ? { ...edu, ...education } : edu),
                },
            };
        });
        debounceSync(`education-${id}`, () => get().syncEducation(id));
    },

    removeEducation: async (id) => {
        const { resume } = get();
        if (!resume) return;
        const originalEducations = resume.educations || [];
        set((state) => {
            if (!state.resume) return {};
            return { resume: { ...state.resume, educations: originalEducations.filter((edu) => edu.id !== id) } };
        });
        try {
            await sectionApi.deleteEducation(resume.id, id);
        } catch (error) {
            console.error('Failed to delete education:', error);
            set((state) => {
                if (!state.resume) return {};
                return { resume: { ...state.resume, educations: originalEducations } };
            });
            const toast = (await import("react-hot-toast")).default;
            toast.error('Failed to delete education');
        }
    },

    updateSkillCategories: (categories) => {
        set((state) => {
            if (!state.resume) return {};
            return { resume: { ...state.resume, skill_categories: categories } };
        });
        debounceSync('skills', get().syncSkillCategories);
    },

    updateStrengths: (strengths) => {
        set((state) => {
            if (!state.resume) return {};
            return { resume: { ...state.resume, strengths } };
        });
        debounceSync('strengths', get().syncStrengths);
    },

    updateHobbies: (hobbies) => {
        set((state) => {
            if (!state.resume) return {};
            return { resume: { ...state.resume, hobbies } };
        });
        debounceSync('hobbies', get().syncHobbies);
    },

    updateCustomSections: (sections) => {
        set((state) => {
            if (!state.resume) return {};
            return { resume: { ...state.resume, custom_sections: sections } };
        });
        debounceSync('custom_sections', get().syncCustomSections);
    },

    updateTemplate: (template) => {
        set((state) => {
            if (!state.resume) return {};
            return { resume: { ...state.resume, template, template_id: template.id } };
        });
    },

    // Sync Implementations with FIX for Stale State
    syncPersonalInfo: async () => {
        const { resume } = get();
        if (!resume || !resume.id) return;
        try {
            await sectionApi.updatePersonalInfo(resume.id, resume.personal_info);
            set({ originalResume: JSON.parse(JSON.stringify(resume)) });
        } catch (error) {
            get().rollbackState("Failed to sync personal info");
        }
    },

    syncExperience: async (id: string) => {
        const { resume } = get();
        if (!resume || !resume.id) return;
        const experience = resume.work_experiences?.find(exp => exp.id === id);
        if (!experience) return;
        try {
            await sectionApi.updateWorkExperience(resume.id, id, experience);
            set({ originalResume: JSON.parse(JSON.stringify(resume)) });
        } catch (error) {
            get().rollbackState("Failed to sync experience");
        }
    },

    syncEducation: async (id: string) => {
        const { resume } = get();
        if (!resume || !resume.id) return;
        const education = resume.educations?.find(edu => edu.id === id);
        if (!education) return;
        try {
            await sectionApi.updateEducation(resume.id, id, education);
            set({ originalResume: JSON.parse(JSON.stringify(resume)) });
        } catch (error) {
            get().rollbackState("Failed to sync education");
        }
    },

    syncSkillCategories: async () => {
        const { resume, originalResume } = get();
        if (!resume || !resume.id) return;
        const categories = resume.skill_categories || [];
        const originalCategories = originalResume?.skill_categories || [];

        try {
            const deletedCategories = originalCategories.filter(oc => !categories.find(c => c.id === oc.id));
            for (const cat of deletedCategories) await sectionApi.deleteSkillCategory(resume.id, cat.id);

            for (const cat of categories) {
                const originalCat = originalCategories.find(oc => oc.id === cat.id);
                let currentCatId = cat.id;

                if (!originalCat) {
                    const newCat = await sectionApi.createSkillCategory(resume.id, cat);
                    currentCatId = newCat.id;
                    set(state => ({
                        resume: state.resume ? {
                            ...state.resume,
                            skill_categories: (state.resume.skill_categories || []).map(c => c.id === cat.id ? newCat : c)
                        } : null
                    }));
                } else {
                    await sectionApi.updateSkillCategory(resume.id, cat.id, cat);
                }

                // Handle items
                const currentRes = get().resume;
                if (!currentRes) continue;
                // Need to re-fetch category from latest state to get correct ID reference if it was just created? 
                // Using currentCatId from above is safer.

                const updatedCat = (currentRes.skill_categories || []).find(c => c.id === currentCatId);
                const currentItems = updatedCat?.items || [];
                const originalItems = originalCat?.items || [];

                const deletedItems = originalItems.filter(oi => !currentItems.find(i => i.id === oi.id));
                for (const item of deletedItems) await sectionApi.deleteSkillItem(resume.id, currentCatId, item.id);

                for (const item of currentItems) {
                    const originalItem = originalItems.find(oi => oi.id === item.id);
                    if (!originalItem) {
                        const newItem = await sectionApi.createSkillItem(resume.id, currentCatId, item);
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
            set({ originalResume: JSON.parse(JSON.stringify(get().resume)) }); // FIX APPLIED
        } catch (error) {
            get().rollbackState("Failed to sync skills");
        }
    },

    syncStrengths: async () => {
        const { resume, originalResume } = get();
        if (!resume || !resume.id) return;

        const strengths = resume.strengths || [];
        const originalStrengths = originalResume?.strengths || [];

        try {
            const toDelete = originalStrengths.filter(os => !strengths.find(s => s.id === os.id));
            const toUpdate = strengths.filter(s => {
                const os = originalStrengths.find(os => os.id === s.id);
                return os && JSON.stringify(os) !== JSON.stringify(s);
            });
            const toCreate = strengths.filter(s => !originalStrengths.find(os => os.id === s.id));

            for (const s of toDelete) await sectionApi.deleteStrength(resume.id, s.id);
            for (const s of toUpdate) await sectionApi.updateStrength(resume.id, s.id, s);
            for (const s of toCreate) {
                const newS = await sectionApi.createStrength(resume.id, s);
                set(state => ({
                    resume: state.resume ? {
                        ...state.resume,
                        strengths: (state.resume.strengths || []).map(str => str.id === s.id ? newS : str)
                    } : null
                }));
            }
            set({ originalResume: JSON.parse(JSON.stringify(get().resume)) }); // FIX APPLIED
        } catch (error) {
            get().rollbackState("Failed to sync strengths");
        }
    },

    syncHobbies: async () => {
        const { resume, originalResume } = get();
        if (!resume || !resume.id) return;
        const hobbies = resume.hobbies || [];
        const originalHobbies = originalResume?.hobbies || [];

        try {
            const toDelete = originalHobbies.filter(oh => !hobbies.find(h => h.id === oh.id));
            const toUpdate = hobbies.filter(h => {
                const oh = originalHobbies.find(oh => oh.id === h.id);
                return oh && JSON.stringify(oh) !== JSON.stringify(h);
            });
            const toCreate = hobbies.filter(h => !originalHobbies.find(oh => oh.id === h.id));

            for (const h of toDelete) await sectionApi.deleteHobby(resume.id, h.id);
            for (const h of toUpdate) await sectionApi.updateHobby(resume.id, h.id, h);
            for (const h of toCreate) {
                const newH = await sectionApi.createHobby(resume.id, h);
                set(state => ({
                    resume: state.resume ? {
                        ...state.resume,
                        hobbies: (state.resume.hobbies || []).map(hb => hb.id === h.id ? newH : hb)
                    } : null
                }));
            }
            set({ originalResume: JSON.parse(JSON.stringify(get().resume)) }); // FIX APPLIED
        } catch (error) {
            get().rollbackState("Failed to sync hobbies");
        }
    },

    syncCustomSections: async () => {
        const { resume, originalResume } = get();
        if (!resume || !resume.id) return;
        const sections = resume.custom_sections || [];
        const originalSections = originalResume?.custom_sections || [];

        try {
            const deletedSections = originalSections.filter(os => !sections.find(s => s.id === os.id));
            for (const sec of deletedSections) await sectionApi.deleteCustomSection(resume.id, sec.id);

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

                // Handle Items
                const currentRes = get().resume;
                if (!currentRes) continue;
                const updatedSec = (currentRes.custom_sections || []).find(s => s.id === currentSecId);
                const currentItems = updatedSec?.items || [];
                const originalItems = originalSec?.items || [];

                const deletedItems = originalItems.filter(oi => !currentItems.find(i => i.id === oi.id));
                for (const item of deletedItems) await sectionApi.deleteCustomItem(resume.id, currentSecId, item.id);

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
            set({ originalResume: JSON.parse(JSON.stringify(get().resume)) }); // FIX APPLIED
        } catch (error) {
            get().rollbackState("Failed to sync custom sections");
        }
    },

    saveResume: async () => {
        // Implementation for manual save if needed, although we are auto-saving
    },

    autosaveResume: async () => {
        // ... bulk autosave logic if exists ...
    },

    syncMetadata: async () => {
        const { resume } = get();
        if (!resume || !resume.id) return;
        try {
            await updateResume(resume.id, {
                title: resume.title,
                section_settings: resume.section_settings
            });
            set({ originalResume: JSON.parse(JSON.stringify(resume)) });
        } catch (error) {
            console.error('Failed to sync metadata:', error);
            get().rollbackState("Failed to sync resume settings");
        }
    },

    downloadResume: async () => {
        const { resume } = get();
        if (!resume) return;
        try {
            await downloadResumePdf(resume.id);
        } catch (e) {
            console.error(e);
        }
    }
}));
