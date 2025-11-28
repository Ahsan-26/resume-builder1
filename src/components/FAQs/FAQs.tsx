"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Mail, MessageSquare } from "lucide-react";

export default function FaqSection() {
  const faqs = [
    {
      question: "What makes SkyResume different from other resume builders?",
      answer:
        "SkyResume provides professionally engineered templates, ATS-optimized formatting, smart content suggestions, and a seamless multilingual editor — helping you create a standout resume faster.",
    },
    {
      question: "Are SkyResume templates ATS-friendly?",
      answer:
        "Yes. All templates are built with clean structure and machine-readable formatting, ensuring compliance with modern applicant tracking systems used by employers.",
    },
    {
      question: "Can I download my resume for free?",
      answer:
        "Yes, you can download basic templates for free. Premium templates and advanced optimization tools are available through our affordable paid plans.",
    },
    {
      question: "Do I need design skills to use SkyResume?",
      answer:
        "Not at all. SkyResume handles layout, alignment, spacing, typography, and formatting automatically — letting you focus only on your content.",
    },
    {
      question: "Can I use SkyResume on mobile?",
      answer:
        "Absolutely. SkyResume is fully responsive and works seamlessly on phones, tablets, laptops, and desktops.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-20">

      {/* HEADER */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-brand-primary">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 mt-3">
          Get quick answers to common questions about SkyResume.
        </p>
      </div>

      {/* FAQ ACCORDION */}
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = index === openIndex;

          return (
            <div
              key={index}
              className="bg-white shadow-md rounded-2xl border border-gray-200"
            >
              <button
                onClick={() =>
                  setOpenIndex(isOpen ? null : index)
                }
                className="w-full flex justify-between items-center p-5 text-left"
              >
                <span className="font-medium text-lg text-gray-900">
                  {faq.question}
                </span>

                {isOpen ? (
                  <ChevronUp className="text-brand-primary" />
                ) : (
                  <ChevronDown className="text-brand-primary" />
                )}
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-gray-600 animate-fadeIn">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* CONTACT CTA SECTION */}
      <div className="mt-20 bg-brand-primary/10 p-10 rounded-3xl text-center border border-brand-primary/20">
        <h3 className="text-3xl font-semibold text-brand-primary">
          Still have questions?
        </h3>
        <p className="text-gray-700 mt-3 max-w-2xl mx-auto">
          Our support team is here to guide you. Whether you're confused about templates,
          pricing, or exporting — we’ve got your back.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <a
            href="mailto:support@skycubeworldwide.com"
            className="flex items-center gap-2 px-6 py-3 bg-brand-primary text-white rounded-xl hover:bg-brand-hover transition"
          >
            <Mail size={18} />
            support@skycubeworldwide.com
          </a>

          <a
            href="#"
            className="flex items-center gap-2 px-6 py-3 border border-brand-primary rounded-xl text-brand-primary hover:bg-brand-primary hover:text-white transition"
          >
            <MessageSquare size={18} />
            Contact Support
          </a>
        </div>

        <p className="text-gray-600 text-sm mt-4">
          Or call us at: <span className="font-medium text-brand-primary">+1 252 364 7227</span>
        </p>
      </div>
    </div>
  );
}
