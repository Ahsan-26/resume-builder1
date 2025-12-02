// components/ui/CreateResumeButton.tsx
import Link from 'next/link';
import React from 'react';
import { useTranslations } from 'next-intl';

interface CreateResumeButtonProps {
    className?: string;
    href?: string;
    children?: React.ReactNode;
}

export default function CreateResumeButton({ className = '', href = '/pricing', children }: CreateResumeButtonProps) {
    const t = useTranslations('navbar');

    return (
        <Link
            href={href}
            className={`inline-flex items-center justify-center px-6 py-3 rounded-lg font-bold text-white transition-all hover:opacity-90 hover:shadow-lg ${className}`}
            style={{
                background: `linear-gradient(90deg, var(--color-brand-gradient), var(--color-brand-primary))`,
            }}
        >
            {children || t('createResume')}
        </Link>
    );
}
