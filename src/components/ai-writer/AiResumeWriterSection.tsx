"use client";

import { useTranslations } from "next-intl";
import { FaRobot, FaMagic, FaPenFancy, FaCheck } from "react-icons/fa";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function AiResumeWriterSection() {
    const t = useTranslations("aiResumeWriterSection");
    const [restartKey, setRestartKey] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setRestartKey(prev => prev + 1);
        }, 12000); // 12 seconds loop matches CSS duration
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-12 md:py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Text Content */}
                    <div className="lg:w-1/2 space-y-8 animate-slideInLeft">
                        <div className="space-y-4">
                            <span className="text-[var(--color-brand-secondary)] font-bold tracking-wider uppercase text-sm flex items-center gap-2">
                                <FaRobot className="text-lg" />
                                {t("tagline")}
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-brand-primary)] heading-font leading-tight">
                                {t("heading")}
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                                {t("description")}
                            </p>
                        </div>

                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-3 text-gray-700">
                                    <div className="w-6 h-6 rounded-full bg-[var(--color-brand-secondary)]/10 flex items-center justify-center text-[var(--color-brand-secondary)] text-sm">
                                        <FaCheck />
                                    </div>
                                    <span className="font-medium">{t(`feature${i}`)}</span>
                                </div>
                            ))}
                        </div>

                        <Link href="/ai-resume-writer" className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--color-brand-gradient)] text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                            <FaMagic className="group-hover:rotate-12 transition-transform" />
                            {t("cta")}
                        </Link>

                        <div className="pt-6 border-t border-gray-200">
                            <p className="text-sm text-gray-500 font-medium">
                                {t("trustedBy")}
                            </p>
                        </div>
                    </div>

                    {/* Animated Visual */}
                    <div className="lg:w-1/2 w-full relative perspective-1000">
                        <div className="relative z-10 bg-white rounded-xl shadow-2xl p-6 md:p-8 border border-gray-100 transform rotate-y-12 hover:rotate-y-0 transition-transform duration-700 max-w-md mx-auto min-h-[600px] text-xs md:text-sm overflow-hidden">

                            {/* Resume Content Container - Animates opacity for the loop effect */}
                            <div className="animate-resume-loop" key={restartKey}>
                                {/* Resume Header */}
                                <div className="flex gap-4 mb-6 border-b border-gray-100 pb-6 animate-section-fade-in" style={{ animationDelay: '0.5s' }}>
                                    <div className="w-16 h-16 rounded-lg bg-gray-200 overflow-hidden shrink-0">
                                        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Profile" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="space-y-1 flex-1">
                                        <h3 className="text-xl font-bold text-gray-900">{t("mockResume.name")}</h3>
                                        <p className="text-gray-500 text-[10px] leading-relaxed">
                                            {t("mockResume.info")}
                                            <br />
                                            Address: Lima 99999, Peru • Phone: +999999999
                                            <br />
                                            Email: hello@kickresume.com
                                        </p>
                                    </div>
                                </div>

                                {/* Resume Body */}
                                <div className="space-y-6">
                                    {/* Profile Section */}
                                    <div className="animate-section-fade-in" style={{ animationDelay: '1.5s' }}>
                                        <div className="flex items-center gap-2 mb-2 text-[var(--color-brand-primary)] font-bold uppercase tracking-wider text-[10px]">
                                            <div className="w-4 h-4 rounded-full bg-[var(--color-brand-primary)]/10 flex items-center justify-center">
                                                <FaPenFancy className="w-2 h-2" />
                                            </div>
                                            {t("mockResume.profile")}
                                        </div>
                                        <div className="relative">
                                            <p className="text-gray-700 leading-relaxed animate-typewriter-text" style={{ animationDelay: '2s' }}>
                                                {t("mockResume.profileText")}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Work Experience Section */}
                                    <div className="animate-section-fade-in" style={{ animationDelay: '4s' }}>
                                        <div className="flex items-center gap-2 mb-3 text-[var(--color-brand-primary)] font-bold uppercase tracking-wider text-[10px]">
                                            <div className="w-4 h-4 rounded-full bg-[var(--color-brand-primary)]/10 flex items-center justify-center">
                                                <FaPenFancy className="w-2 h-2" />
                                            </div>
                                            {t("mockResume.experience")}
                                        </div>

                                        <div className="space-y-4">
                                            {/* Job 1 */}
                                            <div className="relative">
                                                <div className="flex justify-between mb-1 animate-section-fade-in" style={{ animationDelay: '4.5s' }}>
                                                    <span className="font-bold text-gray-800">{t("mockResume.job1")}</span>
                                                    <span className="text-gray-500 text-[10px]">08/2025 - present</span>
                                                </div>
                                                <div className="text-[var(--color-brand-primary)] font-medium text-[10px] mb-1 animate-section-fade-in" style={{ animationDelay: '4.7s' }}>{t("mockResume.job1Company")}</div>
                                                <p className="text-gray-600 pl-2 border-l-2 border-gray-100 animate-typewriter-text" style={{ animationDelay: '5s' }}>
                                                    {t("mockResume.job1Desc")}
                                                </p>
                                            </div>

                                            {/* Job 2 */}
                                            <div className="relative">
                                                <div className="flex justify-between mb-1 animate-section-fade-in" style={{ animationDelay: '7s' }}>
                                                    <span className="font-bold text-gray-800">{t("mockResume.job2")}</span>
                                                    <span className="text-gray-500 text-[10px]">01/2015 - 07/2025</span>
                                                </div>
                                                <div className="text-[var(--color-brand-primary)] font-medium text-[10px] animate-section-fade-in" style={{ animationDelay: '7.2s' }}>{t("mockResume.job2Company")}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* AI Badge - Moves with the writing */}
                            <div className="absolute bottom-6 right-6 bg-white p-2 rounded-lg shadow-lg border border-[var(--color-brand-secondary)]/20 flex items-center gap-2 animate-ai-badge z-20">
                                <div className="w-6 h-6 rounded-full bg-[var(--color-brand-secondary)] flex items-center justify-center text-white">
                                    <FaMagic className="w-3 h-3" />
                                </div>
                                <div className="text-[10px]">
                                    <div className="font-bold text-gray-800">AI Writing...</div>
                                </div>
                            </div>
                        </div>

                        {/* Background Elements */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[var(--color-brand-secondary)]/5 rounded-full blur-3xl -z-10" />
                    </div>
                </div>
            </div>

            <style jsx global>{`
                /* Master loop duration */
                :root {
                    --loop-duration: 12s;
                }

                /* Container Loop: Clears the canvas at the end */
                @keyframes resume-loop {
                    0%, 90% { opacity: 1; }
                    95%, 100% { opacity: 0; }
                }
                .animate-resume-loop {
                    animation: resume-loop 12s linear forwards;
                }

                /* Fade In Animation for Sections */
                @keyframes section-fade-in {
                    0% { opacity: 0; transform: translateY(10px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .animate-section-fade-in {
                    opacity: 0;
                    animation: section-fade-in 0.5s ease-out forwards;
                    /* Animation delay is set inline */
                }

                /* Typewriter Effect for Text Blocks */
                @keyframes typewriter-text {
                    0% { clip-path: inset(0 100% 0 0); opacity: 1; }
                    100% { clip-path: inset(0 0 0 0); opacity: 1; }
                }
                .animate-typewriter-text {
                    opacity: 0; /* Hidden initially */
                    clip-path: inset(0 100% 0 0);
                    animation: typewriter-text 2s steps(40) forwards;
                    /* Animation delay is set inline */
                }

                /* AI Badge Animation: Bobs and fades */
                @keyframes ai-badge {
                    0%, 100% { transform: translateY(0); opacity: 1; }
                    50% { transform: translateY(-5px); opacity: 1; }
                    95% { opacity: 0; }
                }
                .animate-ai-badge {
                    animation: ai-badge 2s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
}
