"use client";

import Link from "next/link";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFoundPage() {
    return (
        <div className="flex items-center justify-center bg-gradient-to-br from-brand-secondary/20 via-white to-brand-primary/10 relative overflow-hidden py-20 min-h-[80vh]">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 right-20 w-72 h-72 bg-brand-secondary/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-brand-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }}></div>
            </div>

            <div className="relative max-w-4xl mx-auto px-6 text-center">
                {/* 404 Number */}
                <div className="mb-8 animate-fadeInUp">
                    <h1 className="text-[150px] md:text-[200px] font-bold text-brand-primary/20 leading-none heading-font select-none">
                        404
                    </h1>
                </div>

                {/* Icon */}
                <div className="mb-8 flex justify-center animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-secondary/30 to-brand-primary/20 flex items-center justify-center animate-float">
                        <Search className="w-12 h-12 text-brand-primary" />
                    </div>
                </div>

                {/* Message */}
                <div className="mb-12 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 heading-font">
                        Oops! Page Not Found
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        The page you're looking for doesn't exist or has been moved.
                        Don't worry, let's get you back on track!
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                    <Link
                        href="/"
                        className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-primary to-brand-gradient text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                    >
                        <Home className="w-5 h-5 group-hover:animate-bounce" />
                        Return to Home
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="group flex items-center gap-2 px-8 py-4 bg-white border-2 border-brand-primary text-brand-primary rounded-xl font-bold text-lg hover:bg-brand-primary hover:text-white transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Go Back
                    </button>
                </div>

                {/* Helpful Links */}
                <div className="mt-16 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                    <p className="text-sm text-gray-500 mb-4">You might be looking for:</p>
                    <div className="flex flex-wrap gap-3 justify-center">
                        <Link href="/resume-builder" className="px-4 py-2 bg-brand-secondary/30 text-brand-primary rounded-lg hover:bg-brand-secondary/50 transition-colors text-sm font-medium">
                            Resume Builder
                        </Link>
                        <Link href="/templates" className="px-4 py-2 bg-brand-secondary/30 text-brand-primary rounded-lg hover:bg-brand-secondary/50 transition-colors text-sm font-medium">
                            Templates
                        </Link>
                        <Link href="/pricing" className="px-4 py-2 bg-brand-secondary/30 text-brand-primary rounded-lg hover:bg-brand-secondary/50 transition-colors text-sm font-medium">
                            Pricing
                        </Link>
                        <Link href="/contact" className="px-4 py-2 bg-brand-secondary/30 text-brand-primary rounded-lg hover:bg-brand-secondary/50 transition-colors text-sm font-medium">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
