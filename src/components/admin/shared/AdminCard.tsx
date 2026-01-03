import React from "react";

interface AdminCardProps {
    children: React.ReactNode;
    className?: string;
    noPadding?: boolean;
}

export default function AdminCard({ children, className = "", noPadding = false }: AdminCardProps) {
    return (
        <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 ${!noPadding ? "p-6" : ""} ${className}`}>
            {children}
        </div>
    );
}
