"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import LoginForm from "@/components/auth/LoginForm";
import { Shield } from "lucide-react";

export default function AdminLoginPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // If already logged in as admin/staff, redirect to admin dashboard
        if (!loading && user) {
            if (user.is_staff || user.role === "admin") {
                router.push("/admin");
            }
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00004d]"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#00004d] via-[#002366] to-[#00004d] flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Admin Badge */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-[#FFF4BC] rounded-full mb-4 shadow-lg">
                        <Shield className="w-10 h-10 text-[#00004d]" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
                    <p className="text-gray-300">Authorized Access Only</p>
                </div>

                {/* Login Form Card */}
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    <LoginForm isAdmin={true} />
                </div>

                {/* Security Notice */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-300">
                        🔒 This is a secure area. All access attempts are logged.
                    </p>
                </div>
            </div>
        </div>
    );
}
