// src/lib/api/profile.ts
import { apiFetch } from "../apiClient";
import type {
    UserProfile,
    ProfileUpdateData,
    JobPreferences,
    AccountSettings,
} from "@/types/profile";

/**
 * Fetch current user profile from backend
 * GET /api/auth/me/
 */
export async function fetchUserProfile(): Promise<UserProfile> {
    const res = await apiFetch("/auth/me/");

    if (!res.ok) {
        const error = await res.json().catch(() => ({ detail: "Failed to fetch profile" }));
        throw new Error(error.detail || "Failed to fetch profile");
    }

    return res.json();
}

/**
 * Update user profile
 * PATCH /api/auth/me/
 * 
 * Note: Currently only first_name and last_name can be updated via this endpoint
 */
export async function updateUserProfile(data: ProfileUpdateData): Promise<UserProfile> {
    const res = await apiFetch("/auth/me/", {
        method: "PATCH",
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({ detail: "Failed to update profile" }));
        throw new Error(error.detail || "Failed to update profile");
    }

    return res.json();
}

/**
 * Upload profile photo
 * Note: This endpoint may not exist yet - will need backend implementation
 * For now, we'll handle photo upload via base64 in avatar_url
 */
export async function uploadProfilePhoto(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64String = reader.result as string;
            resolve(base64String);
        };

        reader.onerror = () => {
            reject(new Error("Failed to read image file"));
        };

        reader.readAsDataURL(file);
    });
}

/**
 * Load job preferences from localStorage
 * These will be persisted locally until backend support is added
 */
export function loadJobPreferences(): JobPreferences {
    if (typeof window === "undefined") {
        return { employment_types: [] };
    }

    const stored = localStorage.getItem("sr_job_preferences");
    if (!stored) {
        return { employment_types: [] };
    }

    try {
        return JSON.parse(stored);
    } catch {
        return { employment_types: [] };
    }
}

/**
 * Save job preferences to localStorage
 */
export function saveJobPreferences(preferences: JobPreferences): void {
    if (typeof window === "undefined") return;
    localStorage.setItem("sr_job_preferences", JSON.stringify(preferences));
}

/**
 * Load account settings from localStorage
 */
export function loadAccountSettings(): AccountSettings {
    if (typeof window === "undefined") {
        return { marketing_emails: false, product_updates: true };
    }

    const stored = localStorage.getItem("sr_account_settings");
    if (!stored) {
        return { marketing_emails: false, product_updates: true };
    }

    try {
        return JSON.parse(stored);
    } catch {
        return { marketing_emails: false, product_updates: true };
    }
}

/**
 * Save account settings to localStorage
 */
export function saveAccountSettings(settings: AccountSettings): void {
    if (typeof window === "undefined") return;
    localStorage.setItem("sr_account_settings", JSON.stringify(settings));
}

/**
 * Validate email format
 */
export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate phone number format (basic validation)
 */
export function validatePhone(phone: string): boolean {
    if (!phone) return true; // Optional field
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, "").length >= 10;
}
