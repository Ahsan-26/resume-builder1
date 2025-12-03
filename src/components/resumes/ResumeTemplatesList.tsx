"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { FaEye, FaPen } from "react-icons/fa";

export default function ResumeTemplatesList() {
    const t = useTranslations("resumeTemplatesList");

    const templates = [
        {
            id: 1,
            title: t("template1Title"),
            desc: t("template1Desc"),
            image: "/heroImage.jpg", // Placeholder
            color: "bg-red-50",
        },
        {
            id: 2,
            title: t("template2Title"),
            desc: t("template2Desc"),
            image: "/heroImage.jpg", // Placeholder
            color: "bg-blue-50",
        },
        {
            id: 3,
            title: t("template3Title"),
            desc: t("template3Desc"),
            image: "/heroImage.jpg", // Placeholder
            color: "bg-purple-50",
        },
        {
            id: 4,
            title: t("template4Title"),
            desc: t("template4Desc"),
            image: "/heroImage.jpg", // Placeholder
            color: "bg-yellow-50",
        },
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-brand-primary)] heading-font mb-6">
                        {t("heading")}
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        {t("subHeading")}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {templates.map((template) => (
                        <div key={template.id} className="group">
                            <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-lg mb-6 transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2">
                                {/* Template Image */}
                                <div className={`w-full h-full ${template.color} relative`}>
                                    <Image
                                        src={template.image}
                                        alt={template.title}
                                        fill
                                        className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                                    />
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4 p-6">
                                        <button className="w-full py-3 bg-[var(--color-brand-primary)] text-white rounded-lg font-bold flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-[var(--color-brand-hover)]">
                                            <FaPen /> {t("useBtn")}
                                        </button>
                                        <button className="w-full py-3 bg-white text-gray-900 rounded-lg font-bold flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 hover:bg-gray-100">
                                            <FaEye /> {t("previewBtn")}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {template.title}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {template.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
