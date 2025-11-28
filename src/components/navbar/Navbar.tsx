"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";

import NavLinks from "./NavLinks";
import LoginButton from "./LoginButton";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const t = useTranslations("navbar");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-[var(--color-brand-background)] shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16">

        <Link href="/" className="flex items-center gap-3">
  <div className="h-12 w-12 sm:h-14 sm:w-14 flex items-center justify-center">
    <Image
      src="/SkyLogo.jpeg"
      alt="Sky Resume Logo"
      width={1000}
      height={1000}
      className="object-contain h-full w-full"
      priority
    />
  </div>

  <span
  className="text-xl font-extrabold"
  style={{
    fontFamily:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  }}
>
  SkyCube Resume
</span>


</Link>


        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <NavLinks t={t} />
          <LanguageSwitcher />
          <LoginButton label={t("login")} />
        </div>

        {/* Mobile Icons ONLY */}
        <div className="flex md:hidden items-center gap-4">
          <LanguageSwitcher />
          <button
            onClick={() => setMenuOpen(true)}
            className="p-2 rounded-md border border-gray-300"
            aria-label="Open Menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && <MobileMenu t={t} onClose={() => setMenuOpen(false)} />}
    </nav>
  );
}
