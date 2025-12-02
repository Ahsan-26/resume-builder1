'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import CreateResumeButton from '../ui/CreateResumeButton';

export default function FinalCtaSection() {
    const t = useTranslations('finalCta');

    return (
        <section className="py-24 bg-[#FFFBF2] overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Side: Content */}
                    <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
                        <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight heading-font">
                            {t('heading')}
                        </h2>
                        <p className="text-xl text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                            {t('description')}
                        </p>
                        <div className="pt-4 flex justify-center lg:justify-start">
                            <CreateResumeButton className="text-lg px-10 py-4 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300" />
                        </div>
                    </div>

                    {/* Right Side: Visuals */}
                    <div className="relative order-1 lg:order-2 h-[400px] lg:h-[500px] flex items-center justify-center">
                        {/* Decorative Background */}
                        <div className="absolute inset-0 bg-brand-secondary/20 rounded-full blur-3xl opacity-50 transform translate-x-10"></div>

                        {/* Resume Cards Showcase */}
                        <div className="relative w-full h-full flex items-center justify-center perspective-1000">
                            {/* Card 1 (Left, rotated) */}
                            <div className="absolute w-48 md:w-64 h-64 md:h-80 bg-white rounded-lg shadow-xl border border-gray-200 transform -translate-x-16 md:-translate-x-24 rotate-[-10deg] hover:rotate-[-12deg] hover:-translate-y-2 transition-all duration-500 z-10">
                                <div className="p-4 space-y-3 opacity-30">
                                    <div className="w-1/3 h-3 bg-gray-400 rounded"></div>
                                    <div className="w-full h-2 bg-gray-300 rounded"></div>
                                    <div className="w-full h-2 bg-gray-300 rounded"></div>
                                    <div className="mt-6 w-1/4 h-3 bg-gray-400 rounded"></div>
                                    <div className="w-full h-2 bg-gray-300 rounded"></div>
                                </div>
                            </div>

                            {/* Card 2 (Right, rotated) */}
                            <div className="absolute w-48 md:w-64 h-64 md:h-80 bg-white rounded-lg shadow-xl border border-gray-200 transform translate-x-16 md:translate-x-24 rotate-[10deg] hover:rotate-[12deg] hover:-translate-y-2 transition-all duration-500 z-10">
                                <div className="p-4 space-y-3 opacity-30">
                                    <div className="w-1/3 h-3 bg-gray-400 rounded"></div>
                                    <div className="w-full h-2 bg-gray-300 rounded"></div>
                                    <div className="w-full h-2 bg-gray-300 rounded"></div>
                                    <div className="mt-6 w-1/4 h-3 bg-gray-400 rounded"></div>
                                    <div className="w-full h-2 bg-gray-300 rounded"></div>
                                </div>
                            </div>

                            {/* Card 3 (Center, prominent) */}
                            <div className="absolute w-56 md:w-72 h-72 md:h-96 bg-white rounded-xl shadow-2xl border border-gray-100 transform hover:-translate-y-4 transition-all duration-500 z-20">
                                <div className="h-full flex flex-col">
                                    <div className="h-2 bg-brand-primary rounded-t-xl"></div>
                                    <div className="p-6 space-y-4 flex-1">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                                            <div className="space-y-2 flex-1">
                                                <div className="w-3/4 h-4 bg-gray-800 rounded"></div>
                                                <div className="w-1/2 h-3 bg-brand-primary/60 rounded"></div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="w-full h-2 bg-gray-200 rounded"></div>
                                            <div className="w-full h-2 bg-gray-200 rounded"></div>
                                            <div className="w-2/3 h-2 bg-gray-200 rounded"></div>
                                        </div>
                                        <div className="mt-4 space-y-2">
                                            <div className="w-1/3 h-3 bg-gray-400 rounded"></div>
                                            <div className="w-full h-2 bg-gray-200 rounded"></div>
                                            <div className="w-full h-2 bg-gray-200 rounded"></div>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-b-xl border-t border-gray-100 flex justify-between items-center">
                                        <div className="w-16 h-2 bg-gray-300 rounded"></div>
                                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
