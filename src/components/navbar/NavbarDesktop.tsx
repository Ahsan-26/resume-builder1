"use client";
import React, { useState } from "react";
import MegaDropdown from "./MegaDropdown";
import NavbarButton from "./NavbarButton";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslations } from "next-intl";
import Link from "next/link";

const NavbarDesktop: React.FC = () => {
  const t = useTranslations();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isSticky, setIsSticky] = useState(false);

  const handleMouseEnter = (menu: string) => {
    setOpenDropdown(menu);
  };

  const handleMouseLeave = () => {
    if (!isSticky) {
      setOpenDropdown(null);
    }
  };

  const handleClick = (menu: string) => {
    if (openDropdown === menu && isSticky) {
      setIsSticky(false);
      setOpenDropdown(null); // Optional: close on second click
    } else {
      setOpenDropdown(menu);
      setIsSticky(true);
    }
  };

  // Dropdown items
  const featuresItems = [
    { icon: "📄", titleKey: "navbar.resumeBuilder", descKey: "navbar.resumeBuilderDesc", href: "/resume-builder" },
    { icon: "✉️", titleKey: "navbar.coverLetterBuilder", descKey: "navbar.coverLetterBuilderDesc", href: "/cover-letter-builder" },
    { icon: "✅", titleKey: "navbar.resumeChecker", descKey: "navbar.resumeCheckerDesc", href: "/resume-checker" },
    { icon: "📝", titleKey: "navbar.clChecker", descKey: "navbar.clCheckerDesc", href: "/cover-letter-checker" }, // New
    { icon: "✍️", titleKey: "navbar.aiResumeWriter", descKey: "navbar.aiResumeWriterDesc", href: "/ai-resume-writer" },
  ];

  const resumeItems = [
    { icon: "📄", titleKey: "navbar.resumeBuilder", descKey: "navbar.resumeBuilderDesc", href: "/resume-builder" },
    { icon: "✅", titleKey: "navbar.resumeChecker", descKey: "navbar.resumeCheckerDesc", href: "/resume-checker" },
    { icon: "✍️", titleKey: "navbar.aiResumeWriter", descKey: "navbar.aiResumeWriterDesc", href: "/ai-resume-writer" },
    { icon: "📝", titleKey: "navbar.resumeExamples", descKey: "navbar.resumeExamplesDesc", href: "/resume-examples" },
  ];

  const coverItems = [
    { icon: "✉️", titleKey: "navbar.coverLetterBuilder", descKey: "navbar.coverLetterBuilderDesc", href: "/cover-letter-builder" },
    { icon: "✍️", titleKey: "navbar.aiCoverLetterWriter", descKey: "navbar.aiCoverLetterWriterDesc", href: "/ai-cover-letter-writer" },
    { icon: "📑", titleKey: "navbar.coverTemplates", descKey: "navbar.coverTemplatesDesc", href: "/cover-letter-templates" },
    { icon: "📝", titleKey: "navbar.coverExamples", descKey: "navbar.coverExamplesDesc", href: "/cover-letter-examples" },
  ];

  return (
    <nav className="hidden lg:flex justify-between items-center py-4 px-8 bg-white/95 backdrop-blur-sm shadow-sm fixed top-0 w-full z-50 border-b border-gray-100">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        {/* Placeholder for Logo if needed, or just text */}
        <div className="text-2xl font-bold text-brand-primary tracking-tight">Sky Resume</div>
      </Link>

      {/* Menu */}
      <div className="flex gap-8 relative items-center">
        {["features", "resume", "coverLetter"].map((menu) => (
          <div
            key={menu}
            className="relative h-full flex items-center"
            onMouseEnter={() => handleMouseEnter(menu)}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => handleClick(menu)}
              className={`font-medium transition-colors py-2 flex items-center gap-1 ${openDropdown === menu ? 'text-brand-primary' : 'text-gray-600 hover:text-brand-primary'}`}
            >
              {t(`navbar.${menu}`)}
              <svg className={`w-4 h-4 transition-transform ${openDropdown === menu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            {openDropdown === menu && (
              <div className="absolute top-full left-0 pt-2">
                {menu === "features" && <MegaDropdown items={featuresItems} onClose={() => { setOpenDropdown(null); setIsSticky(false); }} />}
                {menu === "resume" && <MegaDropdown items={resumeItems} onClose={() => { setOpenDropdown(null); setIsSticky(false); }} />}
                {menu === "coverLetter" && <MegaDropdown items={coverItems} onClose={() => { setOpenDropdown(null); setIsSticky(false); }} />}
              </div>
            )}
          </div>
        ))}

        <Link href="/pricing" className="font-medium text-gray-600 hover:text-brand-primary transition-colors">
          {t("navbar.pricing")}
        </Link>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <Link href="/login" className="font-semibold text-brand-primary hover:text-brand-hover px-4 py-2 rounded-lg transition-colors">
          {t("navbar.login")}
        </Link>
        <NavbarButton>{t("navbar.createResume")}</NavbarButton>
        <div className="border-l pl-4 border-gray-200">
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
};

export default NavbarDesktop;
