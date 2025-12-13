import "./globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";

import localFont from "next/font/local";

const nunito = localFont({
  src: "../../fonts/Nunito-Variable.ttf",
  variable: "--font-heading",
  display: "swap",
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
              {children}
              <Toaster position="top-center" />
            </AuthProvider>
          </NextIntlClientProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}