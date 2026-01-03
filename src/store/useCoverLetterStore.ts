import { create } from 'zustand';
import { CoverLetter, CreateCoverLetterData, UpdateCoverLetterData } from '../types/cover-letter';
import {
    fetchCoverLetters,
    fetchCoverLetter,
    createCoverLetter,
    updateCoverLetter,
    deleteCoverLetter
} from '../lib/api/cover-letters';

interface CoverLetterState {
    coverLetters: CoverLetter[];
    currentCoverLetter: CoverLetter | null;
    isLoading: boolean;
    error: string | null;
    isSaving: boolean;

    // Actions
    fetchCoverLetters: () => Promise<void>;
    fetchCoverLetter: (id: string) => Promise<void>;
    createCoverLetter: (data: CreateCoverLetterData) => Promise<CoverLetter | null>;
    updateCoverLetter: (id: string, data: UpdateCoverLetterData) => Promise<void>;
    deleteCoverLetter: (id: string) => Promise<void>;
    setCurrentCoverLetter: (coverLetter: CoverLetter | null) => void;
}

// Module-level variable to track autosave timeout
let coverLetterAutosaveTimeout: NodeJS.Timeout | null = null;

export const useCoverLetterStore = create<CoverLetterState>((set, get) => ({
    coverLetters: [],
    currentCoverLetter: null,
    isLoading: false,
    error: null,
    isSaving: false,

    fetchCoverLetters: async () => {
        set({ isLoading: true, error: null });
        try {
            const data = await fetchCoverLetters();
            set({ coverLetters: data, isLoading: false });
        } catch (err) {
            set({ error: (err as Error).message, isLoading: false });
        }
    },

    fetchCoverLetter: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
            const data = await fetchCoverLetter(id);
            set({ currentCoverLetter: data, isLoading: false });
        } catch (err) {
            set({ error: (err as Error).message, isLoading: false });
        }
    },

    createCoverLetter: async (data) => {
        set({ isSaving: true, error: null });
        try {
            const newCoverLetter = await createCoverLetter(data);
            set(state => ({
                coverLetters: [newCoverLetter, ...state.coverLetters],
                isSaving: false
            }));
            return newCoverLetter;
        } catch (err) {
            set({ error: (err as Error).message, isSaving: false });
            return null;
        }
    },

    updateCoverLetter: async (id, data) => {
        // 1. Optimistic update (Immediate UI feedback)
        const { currentCoverLetter } = get();
        if (currentCoverLetter && currentCoverLetter.id === id) {
            set({
                currentCoverLetter: {
                    ...currentCoverLetter,
                    ...data as any,
                }
            });
        }

        // 2. Debounced API call
        if (coverLetterAutosaveTimeout) {
            clearTimeout(coverLetterAutosaveTimeout);
        }

        set({ isSaving: true });

        coverLetterAutosaveTimeout = setTimeout(async () => {
            try {
                const updated = await updateCoverLetter(id, data);
                set(state => ({
                    coverLetters: state.coverLetters.map(cl => cl.id === id ? updated : cl),
                    currentCoverLetter: updated,
                    isSaving: false
                }));
            } catch (err) {
                set({ error: (err as Error).message, isSaving: false });
            }
        }, 1000); // 1 second debounce
    },

    deleteCoverLetter: async (id) => {
        set({ isSaving: true, error: null });
        try {
            await deleteCoverLetter(id);
            set(state => ({
                coverLetters: state.coverLetters.filter(cl => cl.id !== id),
                currentCoverLetter: state.currentCoverLetter?.id === id ? null : state.currentCoverLetter,
                isSaving: false
            }));
        } catch (err) {
            set({ error: (err as Error).message, isSaving: false });
        }
    },

    setCurrentCoverLetter: (coverLetter) => set({ currentCoverLetter: coverLetter })
}));
