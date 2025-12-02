// components/navbar/MegaDropdown.tsx
'use client';
import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

type Item = { icon: string; titleKey: string; descKey: string; href?: string };

// Professional icon components
const IconMap: Record<string, React.FC<{ className?: string }>> = {
  resumeBuilder: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
    </svg>
  ),
  coverLetter: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
    </svg>
  ),
  checker: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
  ),
  aiWriter: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
    </svg>
  ),
  examples: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
    </svg>
  ),
  templates: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
    </svg>
  ),
};

export default function MegaDropdown({ title, items = [], onClose }: { title?: string; items?: Item[]; onClose?: () => void }) {
  const t = useTranslations();

  const getIcon = (iconName: string) => {
    const IconComponent = IconMap[iconName];
    return IconComponent ? <IconComponent className="w-6 h-6" /> : null;
  };

  return (
    <div className="absolute left-0 mt-3 w-[650px] bg-white rounded-2xl shadow-2xl ring-1 ring-black/5 overflow-hidden animate-slideDown border border-gray-100">
      <div className="p-6 grid grid-cols-2 gap-3">
        {items.map((it, i) => {
          const IconComponent = IconMap[it.icon];

          return (
            <Link
              href={it.href ?? '#'}
              key={i}
              onClick={() => onClose?.()}
              className="group flex gap-4 p-4 rounded-xl hover:bg-gradient-to-br hover:from-brand-secondary/10 hover:to-brand-primary/5 transition-all duration-300 items-start border border-transparent hover:border-brand-secondary/30 hover:shadow-md animate-fadeInUp"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-brand-primary/10 to-brand-secondary/20 text-brand-primary group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm">
                {IconComponent ? <IconComponent className="w-6 h-6 group-hover:animate-bounce" /> : <span className="text-xl">{it.icon}</span>}
              </div>

              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold text-gray-900 group-hover:text-brand-primary transition-colors mb-1 flex items-center gap-2">
                  {t(it.titleKey)}
                  <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </div>
                <div className="text-xs text-gray-500 leading-relaxed line-clamp-2">{t(it.descKey)}</div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-gray-50 to-brand-secondary/5 px-6 py-4 flex justify-between items-center border-t border-gray-100">
        <Link href="/templates" className="group text-sm font-semibold text-brand-primary hover:text-brand-hover transition-colors flex items-center gap-2">
          {t('navbar.seeTemplates') ?? 'View all templates'}
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
          </svg>
        </Link>
      </div>
    </div>
  );
}
