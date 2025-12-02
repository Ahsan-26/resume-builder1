'use client';
import React from 'react';
import { useTranslations } from 'next-intl';

export default function CareerToolboxSection() {
    const t = useTranslations('careerToolbox');

    const features = [
        {
            id: 'feature1',
            icon: (
                <svg className="w-10 h-10 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
            ),
        },
        {
            id: 'feature2',
            icon: (
                <svg className="w-10 h-10 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
            ),
        },
        {
            id: 'feature3',
            icon: (
                <svg className="w-10 h-10 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            ),
        },
        {
            id: 'feature4',
            icon: (
                <svg className="w-10 h-10 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
                </svg>
            ),
        },
        {
            id: 'feature5',
            icon: (
                <svg className="w-10 h-10 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
            ),
        },
        {
            id: 'feature6',
            icon: (
                <svg className="w-10 h-10 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"></path>
                </svg>
            ),
        },
    ];

    return (
        <section className="py-24 bg-brand-secondary relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
                <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-primary rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold text-brand-primary mb-6 heading-font">
                        {t('heading')}
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {features.map((feature, index) => (
                        <div
                            key={feature.id}
                            className="group flex flex-col items-center text-center p-6 rounded-xl hover:bg-white/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-default"
                        >
                            <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                                {feature.icon}
                            </div>

                            <h3 className="text-xl font-bold text-brand-primary mb-3">
                                {t(`${feature.id}Title`)}
                            </h3>

                            <p className="text-gray-700 leading-relaxed">
                                {t(`${feature.id}Desc`)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
