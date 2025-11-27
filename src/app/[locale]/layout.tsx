import './globals.css';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation'; // <-- this fixes your error

import { routing } from '@/i18n/routing';

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string }; // plain object
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className="bg-[var(--color-bg)] text-[var(--color-text)] antialiased">
        <NextIntlClientProvider>
         
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

