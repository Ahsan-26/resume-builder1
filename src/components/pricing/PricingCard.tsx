interface PricingCardProps {
  title: string;
  price: string;
  frequency: string;
  features: string[];
  isPopular?: boolean;
  sale?: string;
}

export default function PricingCard({
  title,
  price,
  frequency,
  features,
  isPopular,
  sale
}: PricingCardProps) {
  return (
    <div className={`flex flex-col justify-between rounded-2xl shadow-lg overflow-hidden border border-gray-100
      hover:shadow-2xl transition relative ${isPopular ? "bg-[var(--color-brand-primary)] text-white" : "bg-white"}`}>
      
      {sale && (
        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {sale}
        </div>
      )}

      <div className="p-6 flex flex-col flex-grow">
        {isPopular && (
          <div className="mb-2 text-sm uppercase tracking-wider font-semibold bg-yellow-400 text-[var(--color-brand-primary)] inline-block px-3 py-1 rounded-full">
            Most Popular
          </div>
        )}

        <h3 className={`text-xl font-bold mb-2 ${isPopular ? "text-white" : "text-[var(--color-brand-primary)]"}`}>
          {title}
        </h3>
        <p className={`text-2xl font-extrabold mb-4 ${isPopular ? "text-white" : "text-[var(--color-brand-primary)]"}`}>
          {price} <span className="text-base font-medium">/ {frequency}</span>
        </p>

        <ul className={`mb-6 space-y-2 flex-1 ${isPopular ? "text-white/90" : "text-gray-700"}`}>
          {features.map((f, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-green-500 font-bold">✔</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <button className={`py-3 w-full rounded-lg font-semibold
          ${isPopular ? "bg-white text-[var(--color-brand-primary)] hover:bg-gray-100" 
                        : "bg-gradient-to-r from-[var(--color-brand-primary)] to-[var(--color-brand-gradient)] text-white hover:from-[var(--color-brand-hover)] hover:to-[var(--color-brand-primary)]"} transition`}>
          Choose Plan
        </button>
      </div>
    </div>
  );
}
