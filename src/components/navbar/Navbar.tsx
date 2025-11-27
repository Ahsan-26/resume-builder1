"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";

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
        
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-[var(--color-brand-primary)]">
          ResumePro
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
      {menuOpen && (
        <MobileMenu t={t} onClose={() => setMenuOpen(false)} />
      )}
    </nav>
  );
}
