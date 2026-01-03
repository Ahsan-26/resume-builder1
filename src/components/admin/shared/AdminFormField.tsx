import React from "react";

interface AdminFormFieldProps {
    label: string;
    required?: boolean;
    error?: string;
    helpText?: string;
    children: React.ReactNode;
    htmlFor?: string;
}

export default function AdminFormField({
    label,
    required = false,
    error,
    helpText,
    children,
    htmlFor,
}: AdminFormFieldProps) {
    return (
        <div className="space-y-2">
            <label
                htmlFor={htmlFor}
                className="block text-sm font-semibold text-gray-700"
            >
                {label}
                {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
            </label>
            {children}
            {error && (
                <p className="text-sm text-red-600 flex items-center gap-1" role="alert">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                </p>
            )}
            {helpText && !error && (
                <p className="text-sm text-gray-500">{helpText}</p>
            )}
        </div>
    );
}
