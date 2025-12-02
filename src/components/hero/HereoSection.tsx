"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";

type HeroSectionProps = {
  imageSrc: string;
};

export default function HeroSection({ imageSrc }: HeroSectionProps) {
  const t = useTranslations("hero");

  return (
    <section className="w-full bg-[var(--color-brand-background)]">
<div className="max-w-7xl mx-auto px-6 md:px-12 pt-0 flex flex-col md:flex-row items-start gap-10">
        
        {/* Left side: text + buttons */}
        <div className="flex-1 flex flex-col justify-start gap-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-brand-primary)] heading-font leading-tight">
            {t("title")}
          </h1>
          <p className="text-gray-700 text-lg md:text-xl">
            {t("description")}
          </p>
          <p className="text-gray-700 text-base md:text-xl">
            {t("extraText")}
          </p>

          <div className="flex flex-wrap gap-4 mt-4">
            <Link
              href="/pricing"
              className="px-6 py-3 bg-gradient-to-r from-[var(--color-brand-primary)] to-[var(--color-brand-gradient)] text-white rounded-lg font-semibold hover:opacity-90 transition"
            >
              {t("createResume")}
            </Link>

            <Link
              href="/templates"
              className="px-6 py-3 border border-[var(--color-brand-primary)] text-[var(--color-brand-primary)] rounded-lg font-semibold hover:bg-[var(--color-brand-primary)] hover:text-white transition"
            >
              {t("seeExamples")}
            </Link>
          </div>
        </div>

        {/* Right side: image */}
        <div className="flex-1 flex justify-center md:justify-end">
          <Image
            src={imageSrc}
            alt={t("imageAlt")}
            className="rounded-xl shadow-lg"
            width={500}
            height={500}
            priority
          />
        </div>
      </div>
    </section>
  );
}
