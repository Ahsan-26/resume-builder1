import React from "react";
import { Loader2 } from "lucide-react";

interface AdminButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "danger" | "ghost";
    loading?: boolean;
    icon?: React.ReactNode;
    children: React.ReactNode;
}

export default function AdminButton({
    variant = "primary",
    loading = false,
    icon,
    children,
    className = "",
    disabled,
    ...props
}: AdminButtonProps) {
    const baseStyles = "px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variants = {
        primary: "bg-[#00004d] text-white hover:bg-[#002366] focus:ring-[#00004d]/50 active:scale-95 shadow-sm",
        secondary: "border-2 border-[#00004d] text-[#00004d] hover:bg-[#00004d]/5 focus:ring-[#00004d]/50",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500/50 active:scale-95",
        ghost: "text-gray-600 hover:bg-gray-100 focus:ring-gray-400/50",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Loading...</span>
                </>
            ) : (
                <>
                    {icon && <span className="w-5 h-5">{icon}</span>}
                    {children}
                </>
            )}
        </button>
    );
}
