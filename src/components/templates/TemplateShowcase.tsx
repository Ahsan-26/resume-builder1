'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import CreateResumeButton from '../ui/CreateResumeButton';
import Image from 'next/image';

export default function TemplateShowcase() {
    const t = useTranslations('templateShowcase');

    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Side: Content */}
                    <div className="space-y-8 order-2 lg:order-1">
                        <div className="space-y-4">
                            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight heading-font">
                                {t('heading')}
                                <span className="block text-brand-primary mt-2">{t('subHeading')}</span>
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                                {t('description')}
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-x-4 gap-y-6">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-secondary/30 flex items-center justify-center text-brand-primary">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    {t(`feature${i}`)}
                                </div>
                            ))}
                        </div>

                        <div className="pt-4">
                            <CreateResumeButton className="w-full sm:w-auto text-lg px-8 py-4 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300" />
                        </div>
                    </div>

                    {/* Right Side: Visuals */}
                    <div className="relative order-1 lg:order-2 h-[500px] lg:h-[600px] flex items-center justify-center">
                        {/* Decorative Background */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-brand-secondary/20 to-transparent rounded-full blur-3xl opacity-60 transform translate-x-10"></div>

                        {/* Floating Cards Animation */}
                        <div className="relative w-full h-full">
                            {/* Main Template Card */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 md:w-80 h-auto bg-white rounded-xl shadow-2xl border border-gray-100 z-20 animate-slideDown" style={{ animationDuration: '3s', animationIterationCount: 'infinite', animationDirection: 'alternate' }}>
                                <div className="p-2">
                                    <div className="w-full h-96 bg-gray-100 rounded-lg overflow-hidden relative">
                                        {/* Placeholder for Resume Template */}
                                        <div className="absolute inset-0 flex items-center justify-center text-gray-300 font-bold text-xl">
                                            TEMPLATE
                                        </div>
                                        {/* Simulated content lines */}
                                        <div className="p-4 space-y-3 opacity-50">
                                            <div className="w-1/3 h-4 bg-gray-300 rounded"></div>
                                            <div className="w-full h-2 bg-gray-200 rounded"></div>
                                            <div className="w-full h-2 bg-gray-200 rounded"></div>
                                            <div className="w-2/3 h-2 bg-gray-200 rounded"></div>
                                            <div className="mt-8 w-1/4 h-3 bg-gray-300 rounded"></div>
                                            <div className="w-full h-2 bg-gray-200 rounded"></div>
                                            <div className="w-full h-2 bg-gray-200 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Elements */}
                            <div className="absolute top-20 right-10 w-40 h-56 bg-white rounded-lg shadow-xl border border-gray-100 z-10 transform rotate-6 opacity-80 animate-pulse" style={{ animationDuration: '4s' }}></div>
                            <div className="absolute bottom-20 left-10 w-40 h-56 bg-white rounded-lg shadow-xl border border-gray-100 z-10 transform -rotate-6 opacity-80 animate-pulse" style={{ animationDuration: '5s' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
