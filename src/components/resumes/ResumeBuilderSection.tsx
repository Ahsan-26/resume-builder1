"use client";

import { useTranslations } from "next-intl";
import { FaGoogle, FaApple, FaFacebook, FaAws, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

export default function ResumeBuilderSection() {
    const t = useTranslations("resumeBuilderSection");

    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Text Content */}
                    <div className="lg:w-1/2 space-y-8 animate-slideInLeft">
                        <div className="space-y-4">
                            <span className="text-[var(--color-brand-primary)] font-bold tracking-wider uppercase text-sm">
                                {t("tagline")}
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-brand-primary)] heading-font leading-tight">
                                {t("heading")}
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                                {t("description")}
                            </p>
                        </div>

                        <Link href="/resume-builder" className="inline-block px-8 py-4 bg-[var(--color-brand-gradient)] text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                            {t("cta")}
                        </Link>

                        <div className="pt-8 border-t border-gray-100">
                            <p className="text-sm text-gray-500 mb-4 font-medium">
                                {t("trustedBy")}
                            </p>
                            <div className="flex flex-wrap gap-6 text-gray-400 text-2xl">
                                <FaGoogle className="hover:text-gray-600 transition-colors" />
                                <FaApple className="hover:text-gray-600 transition-colors" />
                                <FaFacebook className="hover:text-gray-600 transition-colors" />
                                <FaAws className="hover:text-gray-600 transition-colors" />
                                <FaLinkedin className="hover:text-gray-600 transition-colors" />
                            </div>
                        </div>
                    </div>

                    {/* Animated Visual */}
                    <div className="lg:w-1/2 w-full relative">
                        <div className="relative z-10 bg-white rounded-xl shadow-2xl p-6 md:p-8 border border-gray-100 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                            {/* Mock Resume Header */}
                            <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-6">
                                <div className="w-16 h-16 rounded-full bg-gray-200 animate-pulse" />
                                <div className="space-y-2 flex-1">
                                    <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
                                    <div className="h-4 w-32 bg-gray-100 rounded animate-pulse" />
                                </div>
                            </div>

                            {/* Mock Resume Content */}
                            <div className="space-y-6">
                                {[1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        className="space-y-3 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-300 group cursor-pointer border border-transparent hover:border-gray-100"
                                        style={{ animationDelay: `${i * 0.2}s` }}
                                    >
                                        <div className="flex justify-between items-center">
                                            <div className="h-5 w-32 bg-gray-200 rounded group-hover:bg-[var(--color-brand-secondary)] transition-colors" />
                                            <div className="h-4 w-16 bg-gray-100 rounded" />
                                        </div>
                                        <div className="h-3 w-full bg-gray-100 rounded" />
                                        <div className="h-3 w-3/4 bg-gray-100 rounded" />
                                    </div>
                                ))}
                            </div>

                            {/* Floating Elements */}
                            <div className="absolute -right-12 top-1/4 bg-white p-4 rounded-lg shadow-xl border border-gray-100 animate-float hidden md:block">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                    <span className="text-sm font-bold text-gray-700">ATS Friendly</span>
                                </div>
                            </div>

                            <div className="absolute -left-8 bottom-1/4 bg-white p-4 rounded-lg shadow-xl border border-gray-100 animate-float hidden md:block" style={{ animationDelay: "1s" }}>
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-[var(--color-brand-primary)]" />
                                    <span className="text-sm font-bold text-gray-700">Professional</span>
                                </div>
                            </div>
                        </div>

                        {/* Background Decor */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[var(--color-brand-secondary)]/20 rounded-full blur-3xl -z-10" />
                    </div>
                </div>
            </div>
        </section>
    );
}
