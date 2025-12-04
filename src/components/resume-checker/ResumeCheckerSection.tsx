"use client";

import { useTranslations } from "next-intl";
import { FaCheckCircle, FaChartLine, FaFileAlt, FaSearch } from "react-icons/fa";
import Link from "next/link";

export default function ResumeCheckerSection() {
    const t = useTranslations("resumeCheckerSection");

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

                        <Link href="/resume-checker" className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--color-brand-gradient)] text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                            <FaSearch />
                            {t("cta")}
                        </Link>

                        <div className="pt-8 border-t border-gray-100">
                            <p className="text-sm text-gray-500 mb-4 font-medium">
                                {t("trustedBy")}
                            </p>
                            <div className="flex items-center gap-2 text-green-500 font-bold">
                                <FaCheckCircle />
                                <span>{t("accuracy")}</span>
                            </div>
                        </div>
                    </div>

                    {/* Animated Visual */}
                    <div className="lg:w-1/2 w-full relative">
                        <div className="relative z-10 bg-white rounded-xl shadow-2xl p-8 border border-gray-100 transform rotate-1 hover:rotate-0 transition-transform duration-500 max-w-md mx-auto">
                            {/* Score Circle */}
                            <div className="flex justify-center mb-8">
                                <div className="relative w-32 h-32">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle
                                            cx="64"
                                            cy="64"
                                            r="60"
                                            fill="none"
                                            stroke="#e5e7eb"
                                            strokeWidth="8"
                                        />
                                        <circle
                                            cx="64"
                                            cy="64"
                                            r="60"
                                            fill="none"
                                            stroke="var(--color-brand-primary)"
                                            strokeWidth="8"
                                            strokeDasharray="377"
                                            strokeDashoffset="94"
                                            className="animate-progress"
                                        />
                                    </svg>
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                                        <span className="text-3xl font-bold text-[var(--color-brand-primary)]">75</span>
                                        <span className="block text-xs text-gray-500">{t("score")}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Analysis Items */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg border border-green-100">
                                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                        <FaCheckCircle />
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-800">{t("impact")}</div>
                                        <div className="text-xs text-gray-500">{t("impactDesc")}</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                                    <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                                        <FaFileAlt />
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-800">{t("wordChoice")}</div>
                                        <div className="text-xs text-gray-500">{t("wordChoiceDesc")}</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                        <FaChartLine />
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-800">{t("ats")}</div>
                                        <div className="text-xs text-gray-500">{t("atsDesc")}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Badge */}
                            <div className="absolute -right-4 -top-4 bg-[var(--color-brand-secondary)] text-white px-4 py-2 rounded-full shadow-lg font-bold animate-bounce-slow">
                                {t("freeCheck")}
                            </div>
                        </div>

                        {/* Background Decor */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-50 rounded-full blur-3xl -z-10" />
                    </div>
                </div>
            </div>
        </section>
    );
}
