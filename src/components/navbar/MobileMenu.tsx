"use client";

import Link from "next/link";
import LoginButton from "./LoginButton";
import LanguageSwitcher from "./LanguageSwitcher";

export default function MobileMenu({
  t,
  onClose
}: {
  t: (key: string) => string;
  onClose: () => void;
}) {
  return (
    <div className="md:hidden w-full bg-white shadow-lg border-t p-4 animate-slideDown">
      <div className="flex flex-col gap-4">

        <Link
          href="/create-resume"
          onClick={onClose}
          className="text-[var(--color-brand-primary)] text-lg font-medium"
        >
          {t("createResume")}
        </Link>

        <Link
          href="/pricing"
          onClick={onClose}
          className="text-[var(--color-brand-primary)] text-lg font-medium"
        >
          {t("pricing")}
        </Link>

        <div>
          <LoginButton label={t("login")} />
        </div>

        <div className="pt-2">
          <LanguageSwitcher />
        </div>

        <button
          onClick={onClose}
          className="mt-2 text-left text-sm text-gray-500"
        >
          Close ×
        </button>
      </div>
    </div>
  );
}
