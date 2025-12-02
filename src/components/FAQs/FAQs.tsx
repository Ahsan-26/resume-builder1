"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Mail, MessageSquare, HelpCircle } from "lucide-react";

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
    <div className="relative w-full overflow-hidden bg-gradient-to-br from-brand-secondary/10 via-white to-brand-primary/5 py-20">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-64 h-64 bg-brand-secondary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-brand-primary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-4xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-12 animate-fadeInUp">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-secondary/30 rounded-full mb-4">
            <HelpCircle className="w-5 h-5 text-brand-primary" />
            <span className="text-sm font-semibold text-brand-primary">FAQ</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 heading-font">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
            Get quick answers to common questions about SkyResume.
          </p>
        </div>

        {/* FAQ ACCORDION */}
        <div className="space-y-4 mb-16">
          {faqs.map((faq, index) => {
            const isOpen = index === openIndex;

            return (
              <div
                key={index}
                className="group bg-white/80 backdrop-blur-sm shadow-md hover:shadow-xl rounded-2xl border border-gray-200 hover:border-brand-secondary/50 transition-all duration-300 animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex justify-between items-center p-6 text-left"
                >
                  <span className="font-semibold text-lg text-gray-900 group-hover:text-brand-primary transition-colors pr-4">
                    {faq.question}
                  </span>

                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen
                      ? 'bg-brand-primary text-white rotate-180'
                      : 'bg-brand-secondary/30 text-brand-primary group-hover:bg-brand-secondary/50'
                    }`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CONTACT CTA SECTION */}
        <div className="relative mt-20 bg-gradient-to-br from-brand-primary to-brand-gradient p-10 md:p-12 rounded-3xl text-center shadow-2xl overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-secondary/20 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold text-white heading-font">
              Still have questions?
            </h3>
            <p className="text-white/90 mt-4 max-w-2xl mx-auto text-lg">
              Our support team is here to guide you. Whether you're confused about templates,
              pricing, or exporting — we've got your back.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <a
                href="mailto:support@skycubeworldwide.com"
                className="group flex items-center gap-2 px-6 py-3 bg-white text-brand-primary rounded-xl hover:bg-brand-secondary transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 font-semibold"
              >
                <Mail size={18} className="group-hover:animate-bounce" />
                support@skycubeworldwide.com
              </a>

              <a
                href="#"
                className="group flex items-center gap-2 px-6 py-3 border-2 border-white rounded-xl text-white hover:bg-white hover:text-brand-primary transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 font-semibold"
              >
                <MessageSquare size={18} className="group-hover:animate-bounce" />
                Contact Support
              </a>
            </div>

            <p className="text-white/80 text-sm mt-6">
              Or call us at: <span className="font-semibold text-brand-secondary">+1 252 364 7227</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
