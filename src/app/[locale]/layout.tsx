import "./globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/navbar/Navbar"; // <-- ADD THIS
import Footer from "@/components/Footer/Footer";
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className="bg-[var(--color-brand-background)] text-[var(--color-brand-primary)] antialiased">

        <NextIntlClientProvider locale={locale}>
          <Navbar />
         
          <main className="min-h-screen">
            {children}
          </main>
       <Footer />
        </NextIntlClientProvider>

      </body>
    </html>
  );
}
