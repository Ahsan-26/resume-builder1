'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function FeatureCardsSection() {
    const t = useTranslations('featureCards');

    const cards = [
        {
            id: 'card1',
            href: '/ai-cover-letter',
            icon: (
                <svg className="w-12 h-12 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
            ),
            bg: 'bg-blue-50',
        },
        {
            id: 'card2',
            href: '/resume-checker',
            icon: (
                <svg className="w-12 h-12 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            ),
            bg: 'bg-orange-50',
        },
        {
            id: 'card3',
            href: '/ai-resume-writer',
            icon: (
                <svg className="w-12 h-12 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                </svg>
            ),
            bg: 'bg-green-50',
        },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid md:grid-cols-3 gap-8">
                    {cards.map((card, index) => (
                        <div
                            key={card.id}
                            className="group p-8 rounded-2xl bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className={`w-20 h-20 rounded-2xl ${card.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                {card.icon}
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900 mb-4 heading-font">
                                {t(`${card.id}Title`)}
                            </h3>

                            <p className="text-gray-600 mb-6 leading-relaxed">
                                {t(`${card.id}Desc`)}
                            </p>

                            <Link
                                href={card.href}
                                className="inline-flex items-center text-brand-primary font-bold hover:text-brand-hover transition-colors group/link"
                            >
                                <span className="border-b-2 border-brand-secondary/50 group-hover/link:border-brand-secondary transition-all">
                                    {t(`${card.id}Link`)}
                                </span>
                                <svg className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                </svg>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
