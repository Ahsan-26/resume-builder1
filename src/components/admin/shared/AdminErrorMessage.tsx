import React from "react";
import { AlertCircle, X } from "lucide-react";

interface AdminErrorMessageProps {
    message: string;
    onDismiss?: () => void;
}

export default function AdminErrorMessage({ message, onDismiss }: AdminErrorMessageProps) {
    return (
        <div
            className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3"
            role="alert"
            aria-live="assertive"
        >
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
                <p className="text-sm text-red-800 font-medium">Error</p>
                <p className="text-sm text-red-700 mt-1">{message}</p>
            </div>
            {onDismiss && (
                <button
                    onClick={onDismiss}
                    className="text-red-400 hover:text-red-600 transition-colors"
                    aria-label="Dismiss error"
                >
                    <X className="w-5 h-5" />
                </button>
            )}
        </div>
    );
}
