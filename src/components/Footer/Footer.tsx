"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  const t = useTranslations("footer");

  const features = [
    { name: t("resumeBuilder"), href: "/resume-builder" },
    { name: t("coverLetterBuilder"), href: "/cover-letter-builder" },
    { name: t("resumeChecker"), href: "/resume-checker" },
    { name: t("aiResumeWriter"), href: "/ai-resume-writer" },
    { name: t("templates"), href: "/templates" },
  ];

  const about = [
    { name: t("aboutUs"), href: "/about" },
    { name: t("howItWorks"), href: "/how-it-works" },
    { name: t("pricing"), href: "/pricing" },
    { name: t("blog"), href: "/blog" },
    { name: t("careers"), href: "/careers" },
  ];

  const legal = [
    { name: t("privacy"), href: "/privacy" },
    { name: t("terms"), href: "/terms" },
    { name: t("cookiePolicy"), href: "/cookies" },
    { name: t("refundPolicy"), href: "/refund" },
  ];

  return (
    <footer className="relative w-full bg-brand-secondary overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-10 right-10 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-white/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">

          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-brand-primary mb-4 heading-font">
              Sky Resume
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6 max-w-md">
              Create professional resumes and cover letters with our AI-powered builder.
              Stand out from the crowd and land your dream job faster.
            </p>

            {/* Social Media Icons */}
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-brand-primary/10 hover:bg-brand-primary text-brand-primary hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-brand-primary/10 hover:bg-brand-primary text-brand-primary hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-brand-primary/10 hover:bg-brand-primary text-brand-primary hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-brand-primary/10 hover:bg-brand-primary text-brand-primary hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-lg font-bold text-brand-primary mb-4">{t("features")}</h4>
            <ul className="space-y-2.5">
              {features.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="text-gray-700 hover:text-brand-primary transition-colors text-sm font-medium flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/50 group-hover:bg-brand-primary transition-colors"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-lg font-bold text-brand-primary mb-4">{t("about")}</h4>
            <ul className="space-y-2.5">
              {about.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="text-gray-700 hover:text-brand-primary transition-colors text-sm font-medium flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/50 group-hover:bg-brand-primary transition-colors"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-bold text-brand-primary mb-4">{t("legal")}</h4>
            <ul className="space-y-2.5">
              {legal.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="text-gray-700 hover:text-brand-primary transition-colors text-sm font-medium flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/50 group-hover:bg-brand-primary transition-colors"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info Bar */}
        <div className="border-t border-brand-primary/20 pt-8 mb-8">
          <div className="flex flex-col md:flex-row gap-6 justify-center md:justify-start flex-wrap">
            <a href="mailto:support@skycubeworldwide.com" className="flex items-center gap-2 text-gray-700 hover:text-brand-primary transition-colors group">
              <div className="w-8 h-8 rounded-lg bg-brand-primary/10 group-hover:bg-brand-primary flex items-center justify-center transition-colors">
                <Mail className="w-4 h-4 text-brand-primary group-hover:text-white" />
              </div>
              <span className="text-sm font-medium">support@skycubeworldwide.com</span>
            </a>

            <a href="tel:+12523647227" className="flex items-center gap-2 text-gray-700 hover:text-brand-primary transition-colors group">
              <div className="w-8 h-8 rounded-lg bg-brand-primary/10 group-hover:bg-brand-primary flex items-center justify-center transition-colors">
                <Phone className="w-4 h-4 text-brand-primary group-hover:text-white" />
              </div>
              <span className="text-sm font-medium">+1 252 364 7227</span>
            </a>

            <div className="flex items-center gap-2 text-gray-700">
              <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-brand-primary" />
              </div>
              <span className="text-sm font-medium">Raleigh, NC 27616, USA</span>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="border-t border-brand-primary/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} <span className="font-semibold text-brand-primary">SkyCube Worldwide</span>. All rights reserved.
          </p>
          <p className="text-sm text-gray-600">
            Made with <span className="text-red-500">❤</span> for job seekers worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
