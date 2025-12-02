// components/navbar/NavbarMobile.tsx
'use client';
import React, { useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function NavbarMobile() {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const toggleSubmenu = (menu: string) => {
    setExpandedMenu(expandedMenu === menu ? null : menu);
  };

  return (
    <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          {/* Placeholder for Logo */}
          <span className="font-bold text-lg text-brand-primary">Sky Resume</span>
        </Link>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="p-2 text-gray-600 hover:text-brand-primary transition-colors"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* panel */}
      {open && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100 max-h-[calc(100vh-60px)] overflow-y-auto animate-slideDown">
          <div className="p-4 space-y-2">
            {/* Features */}
            <div>
              <button
                onClick={() => toggleSubmenu('features')}
                className="flex items-center justify-between w-full py-3 px-2 text-base font-semibold text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
              >
                {t('navbar.features')}
                <svg className={`w-4 h-4 transition-transform ${expandedMenu === 'features' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              {expandedMenu === 'features' && (
                <div className="pl-4 space-y-2 mt-1 mb-2">
                  <Link href="/resume-builder" className="block py-2 px-2 text-sm text-gray-600 hover:text-brand-primary rounded-md hover:bg-gray-50">{t('navbar.resumeBuilder')}</Link>
                  <Link href="/cover-letter-builder" className="block py-2 px-2 text-sm text-gray-600 hover:text-brand-primary rounded-md hover:bg-gray-50">{t('navbar.coverLetterBuilder')}</Link>
                  <Link href="/resume-checker" className="block py-2 px-2 text-sm text-gray-600 hover:text-brand-primary rounded-md hover:bg-gray-50">{t('navbar.resumeChecker')}</Link>
                  <Link href="/cover-letter-checker" className="block py-2 px-2 text-sm text-gray-600 hover:text-brand-primary rounded-md hover:bg-gray-50">{t('navbar.clChecker')}</Link>
                  <Link href="/ai-resume-writer" className="block py-2 px-2 text-sm text-gray-600 hover:text-brand-primary rounded-md hover:bg-gray-50">{t('navbar.aiResumeWriter')}</Link>
                </div>
              )}
            </div>

            {/* Resume */}
            <div>
              <button
                onClick={() => toggleSubmenu('resume')}
                className="flex items-center justify-between w-full py-3 px-2 text-base font-semibold text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
              >
                {t('navbar.resume')}
                <svg className={`w-4 h-4 transition-transform ${expandedMenu === 'resume' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              {expandedMenu === 'resume' && (
                <div className="pl-4 space-y-2 mt-1 mb-2">
                  <Link href="/resume-builder" className="block py-2 px-2 text-sm text-gray-600 hover:text-brand-primary rounded-md hover:bg-gray-50">{t('navbar.resumeBuilder')}</Link>
                  <Link href="/resume-checker" className="block py-2 px-2 text-sm text-gray-600 hover:text-brand-primary rounded-md hover:bg-gray-50">{t('navbar.resumeChecker')}</Link>
                  <Link href="/ai-resume-writer" className="block py-2 px-2 text-sm text-gray-600 hover:text-brand-primary rounded-md hover:bg-gray-50">{t('navbar.aiResumeWriter')}</Link>
                  <Link href="/resume-examples" className="block py-2 px-2 text-sm text-gray-600 hover:text-brand-primary rounded-md hover:bg-gray-50">{t('navbar.resumeExamples')}</Link>
                </div>
              )}
            </div>

            {/* Cover Letter */}
            <div>
              <button
                onClick={() => toggleSubmenu('coverLetter')}
                className="flex items-center justify-between w-full py-3 px-2 text-base font-semibold text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
              >
                {t('navbar.coverLetter')}
                <svg className={`w-4 h-4 transition-transform ${expandedMenu === 'coverLetter' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              {expandedMenu === 'coverLetter' && (
                <div className="pl-4 space-y-2 mt-1 mb-2">
                  <Link href="/cover-letter-builder" className="block py-2 px-2 text-sm text-gray-600 hover:text-brand-primary rounded-md hover:bg-gray-50">{t('navbar.coverLetterBuilder')}</Link>
                  <Link href="/ai-cover-letter-writer" className="block py-2 px-2 text-sm text-gray-600 hover:text-brand-primary rounded-md hover:bg-gray-50">{t('navbar.aiCoverLetterWriter')}</Link>
                  <Link href="/cover-letter-templates" className="block py-2 px-2 text-sm text-gray-600 hover:text-brand-primary rounded-md hover:bg-gray-50">{t('navbar.coverTemplates')}</Link>
                  <Link href="/cover-letter-examples" className="block py-2 px-2 text-sm text-gray-600 hover:text-brand-primary rounded-md hover:bg-gray-50">{t('navbar.coverExamples')}</Link>
                </div>
              )}
            </div>

            <Link href="/pricing" className="block py-3 px-2 text-base font-semibold text-gray-800 hover:bg-gray-50 rounded-lg transition-colors">
              {t('navbar.pricing')}
            </Link>

            <div className="pt-4 mt-2 border-t border-gray-100 flex flex-col gap-3">
              <Link href="/login" className="block w-full py-3 text-center font-semibold text-brand-primary border border-brand-primary rounded-lg hover:bg-brand-primary/5 transition-colors">
                {t('navbar.login')}
              </Link>

              <Link href="/pricing" className="block w-full py-3 text-center font-semibold text-white bg-brand-primary rounded-lg shadow-md hover:bg-brand-hover transition-colors">
                {t('navbar.createResume')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
