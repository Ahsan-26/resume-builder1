// components/navbar/MegaDropdown.tsx
'use client';
import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

type Item = { icon: string; titleKey: string; descKey: string; href?: string };

export default function MegaDropdown({ title, items = [], onClose }: { title?: string; items?: Item[]; onClose?: () => void }) {
  const t = useTranslations();

  return (
    <div className="absolute left-0 mt-3 w-[600px] bg-white rounded-xl shadow-xl ring-1 ring-black/5 overflow-hidden animate-slideDown border border-gray-100">
      <div className="p-6 grid grid-cols-2 gap-x-4 gap-y-4">
        {items.map((it, i) => (
          <Link
            href={it.href ?? '#'}
            key={i}
            onClick={() => onClose?.()}
            className="group flex gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors items-start"
          >
            <div
              className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-xl bg-brand-secondary/30 text-brand-primary group-hover:scale-110 transition-transform duration-200"
            >
              <span>{it.icon}</span>
            </div>

            <div className="min-w-0">
              <div className="text-sm font-bold text-gray-900 group-hover:text-brand-primary transition-colors">
                {t(it.titleKey)}
              </div>
              <div className="text-xs text-gray-500 mt-0.5 leading-relaxed line-clamp-2">{t(it.descKey)}</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-t border-gray-100">
        <Link href="/templates" className="text-sm font-medium text-gray-600 hover:text-brand-primary transition-colors flex items-center gap-1">
          {t('navbar.seeTemplates') ?? 'View all templates'}
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </div>
  );
}
