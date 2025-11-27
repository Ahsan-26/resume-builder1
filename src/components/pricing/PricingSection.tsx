import PricingHeader from "./PricingHeader";
import PricingCard from "./PricingCard";

export default function PricingSection() {
  const plans = [
    {
      title: "Free",
      price: "$0",
      frequency: "month",
      features: [
        "4 basic resume templates",
        "4 matching cover letter templates",
        "1 basic website template",
        "20,000 pre-written phrases",
        "1,500+ resume examples",
        "Unlimited downloads"
      ]
    },
    {
      title: "Monthly",
      price: "$16",
      frequency: "month",
      features: [
        "40+ resume templates",
        "40+ cover letter templates",
        "All colors and typefaces",
        "AI Writer",
        "ATS Resume Checker",
        "Career Map",
        "LinkedIn & PDF import",
        "Kickresume for iOS & Android",
        "7 personal website templates",
        "Priority email & chat support",
        "14-day money back guarantee"
      ]
    },
    {
      title: "Half-yearly",
      price: "$8",
      frequency: "month",
      features: [
        "Everything from Monthly",
        "$80 in Premium gift vouchers for your friends",
        "14-day money back guarantee"
      ],
      sale: "SAVE 50%",
      isPopular: true
    },
    {
      title: "Yearly",
      price: "$6",
      frequency: "month",
      features: [
        "Everything from Monthly",
        "$80 in Premium gift vouchers for your friends",
        "14-day money back guarantee"
      ]
    }
  ];

  return (
    <section className="py-20 bg-[var(--color-brand-background)]">
      <div className="container mx-auto px-6">
        <PricingHeader />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {plans.map((plan, idx) => (
            <PricingCard key={idx} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
