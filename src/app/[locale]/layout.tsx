import "./globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["600", "700", "800"], // heading weights
  variable: "--font-heading",
});

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

  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

  return (
    <html lang={locale} className={nunito.variable}>
      <body className="bg-[var(--color-brand-background)] text-[var(--color-brand-primary)] antialiased">
        <GoogleOAuthProvider clientId={googleClientId}>
          <NextIntlClientProvider locale={locale}>
            <AuthProvider>
              <Navbar />
              <main className="min-h-screen">
                {children}
              </main>
              <Footer />
              <Toaster position="top-center" />
            </AuthProvider>
          </NextIntlClientProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}