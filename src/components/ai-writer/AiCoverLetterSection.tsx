"use client";

import { useTranslations } from "next-intl";
import { FaRobot, FaMagic, FaPenFancy, FaCheck } from "react-icons/fa";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function AiCoverLetterSection() {
    const t = useTranslations("aiCoverLetterSection");
    const [restartKey, setRestartKey] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setRestartKey(prev => prev + 1);
        }, 14000); // 14 seconds loop for cover letter (slightly longer text)
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

                        <Link href="/ai-cover-letter" className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--color-brand-gradient)] text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group">
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
                        <div className="relative z-10 bg-white rounded-xl shadow-2xl p-8 md:p-10 border border-gray-100 transform rotate-y-12 hover:rotate-y-0 transition-transform duration-700 max-w-md mx-auto min-h-[600px] text-xs md:text-sm overflow-hidden">

                            {/* Cover Letter Content Container - Animates opacity for the loop effect */}
                            <div className="animate-resume-loop" key={restartKey}>
                                {/* Header Info */}
                                <div className="mb-8 animate-section-fade-in" style={{ animationDelay: '0.5s' }}>
                                    <div className="text-gray-500 mb-4">{t("mockCoverLetter.date")}</div>
                                    <div className="text-gray-800 font-medium whitespace-pre-line">
                                        {t("mockCoverLetter.recipient")}
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="space-y-4">
                                    <div className="font-bold text-gray-900 animate-section-fade-in" style={{ animationDelay: '1s' }}>
                                        {t("mockCoverLetter.salutation")}
                                    </div>

                                    <p className="text-gray-700 leading-relaxed animate-typewriter-text" style={{ animationDelay: '1.5s' }}>
                                        {t("mockCoverLetter.p1")}
                                    </p>

                                    <p className="text-gray-700 leading-relaxed animate-typewriter-text" style={{ animationDelay: '4.5s' }}>
                                        {t("mockCoverLetter.p2")}
                                    </p>

                                    <p className="text-gray-700 leading-relaxed animate-typewriter-text" style={{ animationDelay: '7.5s' }}>
                                        {t("mockCoverLetter.p3")}
                                    </p>

                                    <div className="mt-8 animate-section-fade-in" style={{ animationDelay: '10s' }}>
                                        <div className="text-gray-700 mb-2">{t("mockCoverLetter.closing")}</div>
                                        <div className="font-bold text-gray-900 text-lg font-signature text-[var(--color-brand-primary)]">
                                            {t("mockCoverLetter.name")}
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
                    --loop-duration: 14s;
                }

                /* Container Loop: Clears the canvas at the end */
                @keyframes resume-loop {
                    0%, 90% { opacity: 1; }
                    95%, 100% { opacity: 0; }
                }
                .animate-resume-loop {
                    animation: resume-loop 14s linear forwards;
                }

                /* Fade In Animation for Sections */
                @keyframes section-fade-in {
                    0% { opacity: 0; transform: translateY(10px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .animate-section-fade-in {
                    opacity: 0;
                    animation: section-fade-in 0.5s ease-out forwards;
                }

                /* Typewriter Effect for Text Blocks */
                @keyframes typewriter-text {
                    0% { clip-path: inset(0 100% 0 0); opacity: 1; }
                    100% { clip-path: inset(0 0 0 0); opacity: 1; }
                }
                .animate-typewriter-text {
                    opacity: 0; /* Hidden initially */
                    clip-path: inset(0 100% 0 0);
                    animation: typewriter-text 3s steps(60) forwards;
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
