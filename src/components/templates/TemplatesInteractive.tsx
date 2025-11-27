export default function TemplatesInteractive() {
  return (
    <div className="mt-12 flex justify-center gap-6">
      <button className="px-5 py-2 rounded-full bg-[var(--color-brand-primary)] text-white hover:bg-[var(--color-brand-hover)] transition">
        Modern
      </button>
      <button className="px-5 py-2 rounded-full border border-[var(--color-brand-primary)] text-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary)] hover:text-white transition">
        Corporate
      </button>
      <button className="px-5 py-2 rounded-full border border-[var(--color-brand-primary)] text-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary)] hover:text-white transition">
        Minimalist
      </button>
    </div>
  );
}
