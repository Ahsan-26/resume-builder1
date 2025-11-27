"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="w-full bg-[var(--color-brand-primary)] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Brand Section */}
        <div>
          <h3 className="text-xl font-semibold tracking-wide">
            {t("company")}
          </h3>
          <p className="mt-3 text-sm opacity-90 leading-relaxed">
            {t("tagline")}
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">{t("contactUs")}</h3>

          <ul className="space-y-2 text-sm opacity-90">
            <li><span className="font-semibold">{t("email")}:</span> support@skycubeworldwide.com</li>
            <li><span className="font-semibold">{t("phone")}:</span> +1 252 364 7227</li>
            <li>
              <span className="font-semibold">{t("address")}:</span>
              <div>
                3701 Watson Ridge Ln<br />
                Raleigh, NC 27616<br />
                United States
              </div>
            </li>
          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">{t("quickLinks")}</h3>
          <ul className="space-y-2 text-sm opacity-90">
            <li>
              <Link href="/pricing" className="hover:underline">
                {t("pricing")}
              </Link>
            </li>
            <li>
              <Link href="/create" className="hover:underline">
                {t("createResume")}
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:underline">
                {t("privacy")}
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:underline">
                {t("terms")}
              </Link>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Strip */}
      <div className="border-t border-white/20 text-center py-4 text-sm opacity-80">
        © {new Date().getFullYear()} SkyCube Worldwide — {t("rights")}
      </div>
    </footer>
  );
}
