// components/home/AiWriterSection.tsx
'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import CreateResumeButton from '../ui/CreateResumeButton';
import { useTypewriter } from '@/hooks/useTypewriter';

export default function AiWriterSection() {
    const t = useTranslations('aiSection');
    const messages = t.raw('descriptionValues') as string[];
    const displayedText = useTypewriter(messages, 30);

    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Side: AI Writer Visual */}
                    <div className="relative order-2 lg:order-1">
                        {/* Background decorative elements */}
                        <div className="absolute -top-10 -left-10 w-72 h-72 bg-brand-secondary/20 rounded-full blur-3xl opacity-50"></div>
                        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-brand-primary/10 rounded-full blur-3xl opacity-50"></div>

                        {/* The Card */}
                        <div className="relative bg-[#FFFBF2] rounded-2xl p-8 shadow-xl border border-gray-100 max-w-md mx-auto lg:mx-0 transform hover:scale-[1.02] transition-transform duration-500">
                            <div className="space-y-6">
                                {/* Job Title Input */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
                                        {t('jobTitleLabel')}
                                    </label>
                                    <div className="bg-white p-3 rounded-lg border border-gray-200 text-gray-800 font-medium shadow-sm">
                                        {t('jobTitleValue')}
                                    </div>
                                </div>

                                {/* Description Input */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
                                        {t('descriptionLabel')}
                                    </label>
                                    <div className="bg-white p-4 rounded-lg border border-gray-200 text-gray-600 shadow-sm min-h-[120px] relative">
                                        <p className="typing-effect">
                                            {displayedText}
                                            <span className="inline-block w-1 h-4 ml-1 bg-brand-secondary animate-pulse align-middle"></span>
                                        </p>
                                    </div>
                                </div>

                                {/* AI Button */}
                                <div>
                                    <button className="flex items-center gap-2 bg-[#8B5CF6] text-white px-4 py-2 rounded-lg font-bold text-sm shadow-md hover:bg-[#7C3AED] transition-colors">
                                        <span>✨</span> {t('aiWriterBtn')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Content */}
                    <div className="order-1 lg:order-2 space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-brand-primary font-bold text-lg uppercase tracking-wide">
                                {t('subheading')}
                            </h3>
                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight heading-font">
                                {t('heading')}
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                {t('body')}
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex items-center gap-2 text-gray-700 font-medium">
                                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    {t(`feature${i}`)}
                                </div>
                            ))}
                        </div>

                        <div className="pt-4">
                            <CreateResumeButton className="w-full sm:w-auto text-lg px-8 py-4" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
