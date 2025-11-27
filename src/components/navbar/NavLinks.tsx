"use client";

import Link from "next/link";

export default function NavLinks({ t }: { t: (key: string) => string }) {
  return (
    <div className="hidden md:flex items-center gap-6">
      <Link
        href="/create-resume"
        className="text-[var(--color-brand-primary)] hover:text-[var(--color-brand-hover)] transition font-medium"
      >
        {t("createResume")}
      </Link>

      <Link
        href="/pricing"
        className="text-[var(--color-brand-primary)] hover:text-[var(--color-brand-hover)] transition font-medium"
      >
        {t("pricing")}
      </Link>
    </div>
  );
}
