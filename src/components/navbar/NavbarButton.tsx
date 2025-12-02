// components/navbar/NavbarButton.tsx
import Link from 'next/link';
import React from 'react';

export default function NavbarButton({ children, href = '/pricing' }: { children: React.ReactNode; href?: string }) {
  return (
    <Link
      href={href}
      className="hidden lg:inline-flex items-center px-4 py-2 rounded-md font-semibold heading-font"
      style={{ background: `linear-gradient(90deg, var(--color-brand-gradient), var(--color-brand-primary))`, color: '#fff' }}
    >
      {children}
    </Link>
  );
}
