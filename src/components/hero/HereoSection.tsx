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
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-white via-brand-secondary/10 to-brand-primary/5">
      {/* Animated Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-brand-secondary/15 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '5s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 pt-8 pb-16 md:pt-12 md:pb-20 flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12">

        {/* Left side: text + buttons */}
        <div className="flex-1 flex flex-col justify-start gap-4 md:gap-5 animate-fadeInUp">
          {/* Badge/Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-secondary/30 rounded-full w-fit animate-slideInLeft">
            <span className="w-2 h-2 bg-brand-primary rounded-full animate-pulse"></span>
            <span className="text-sm font-semibold text-brand-primary">Best AI Resume Builder</span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 heading-font leading-tight animate-slideInLeft" style={{ animationDelay: '0.1s' }}>
            {t("title")}
          </h1>

          <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-xl animate-slideInLeft" style={{ animationDelay: '0.2s' }}>
            {t("description")}
          </p>

          <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-xl animate-slideInLeft" style={{ animationDelay: '0.3s' }}>
            {t("extraText")}
          </p>

          <div className="flex flex-wrap gap-4 mt-2 animate-slideInLeft" style={{ animationDelay: '0.4s' }}>
            <Link
              href="/pricing"
              className="group px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-gradient text-white rounded-lg font-semibold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 transform"
            >
              <span className="flex items-center gap-2">
                {t("createResume")}
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </span>
            </Link>

            <Link
              href="/templates"
              className="px-6 py-3 bg-white border-2 border-brand-primary text-brand-primary rounded-lg font-semibold text-base hover:bg-brand-primary hover:text-white transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 transform"
            >
              {t("seeExamples")}
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col gap-3 mt-4 animate-slideInLeft" style={{ animationDelay: '0.5s' }}>
            <p className="text-sm text-gray-600">Trusted by 8 million successful job seekers worldwide.</p>
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-gray-400 font-semibold text-sm">Google</span>
              <span className="text-gray-400 font-semibold text-sm">Apple</span>
              <span className="text-gray-400 font-semibold text-sm">Facebook</span>
              <span className="text-gray-400 font-semibold text-sm">NASA</span>
              <span className="text-gray-400 font-semibold text-sm">Nike</span>
            </div>
          </div>
        </div>

        {/* Right side: image */}
        <div className="flex-1 flex justify-center md:justify-end animate-fadeInRight">
          <div className="relative group w-full max-w-md">
            {/* Decorative elements */}
            <div className="absolute -inset-3 bg-gradient-to-r from-brand-primary/15 to-brand-secondary/25 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>

            {/* Floating badge */}
            <div className="absolute -top-3 -right-3 bg-white rounded-full p-2.5 shadow-lg z-10 animate-pulse">
              <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
            </div>

            <div className="relative animate-float">
              <Image
                src={imageSrc}
                alt={t("imageAlt")}
                className="rounded-xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                width={450}
                height={450}
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}
