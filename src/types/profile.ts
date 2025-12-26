// src/types/profile.ts

/**
 * User profile data structure based on backend /api/auth/me/ endpoint
 */
export interface UserProfile {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar_url: string | null;
    role: "user" | "admin";
    is_staff: boolean;
    is_active: boolean;
    is_blocked: boolean;
    auth_provider: "email" | "google" | "facebook";
}

/**
 * Profile update payload - only fields that can be updated
 */
export interface ProfileUpdateData {
    first_name?: string;
    last_name?: string;
    avatar_url?: string | null;
}

/**
 * Account settings for email notifications
 * Note: These will be stored in localStorage until backend support is added
 */
export interface AccountSettings {
    marketing_emails: boolean;
    product_updates: boolean;
}

/**
 * Job preferences data
 * Note: These will be stored in localStorage until backend support is added
 */
export interface JobPreferences {
    industry?: string;
    seniority?: "internship" | "junior" | "mid" | "senior" | "lead";
    area_of_residence?: string;
    employment_types: string[];
    minimum_salary?: number;
}

/**
 * Extended profile data combining all profile sections
 * This includes both backend data and localStorage data
 */
export interface ExtendedProfile {
    user: UserProfile;
    preferences: JobPreferences;
    settings: AccountSettings;
}

/**
 * API error response structure
 */
export interface ApiError {
    detail?: string;
    [key: string]: any;
}

/**
 * Form validation error
 */
export interface ValidationError {
    field: string;
    message: string;
}
