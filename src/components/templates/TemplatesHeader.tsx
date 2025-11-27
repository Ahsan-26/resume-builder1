import { useTranslations } from "next-intl";

export default function TemplatesHeader() {
  const t = useTranslations("templates");

  return (
    <div className="text-center mb-10 px-4 md:px-0">
      <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-brand-primary)] mb-4">
        {t("heading")}
      </h1>
      <p className="text-gray-600 max-w-3xl mx-auto mb-6">
        {t("description")}
      </p>

      {/* Search box */}
      <input
        type="text"
        placeholder={t("searchPlaceholder")}
        className="
          mt-2 w-full md:w-1/2 px-4 py-2 rounded-lg border border-gray-300
          focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]
          focus:border-[var(--color-brand-primary)]
        "
      />
    </div>
  );
}
