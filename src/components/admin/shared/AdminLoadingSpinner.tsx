import React from "react";

export default function AdminLoadingSpinner() {
    return (
        <div className="flex items-center justify-center min-h-[400px]" role="status" aria-live="polite">
            <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00004d]"></div>
                <p className="text-gray-500 text-sm">Loading...</p>
            </div>
        </div>
    );
}
