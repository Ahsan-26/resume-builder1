import TestimonialCard from "./TestimonialsCard";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "John Doe",
      role: "Software Engineer",
      photo: "/testimonials/john.png",
      quote: "Kickresume helped me land my dream job in just 3 weeks!"
    },
    {
      name: "Jane Smith",
      role: "Product Manager",
      photo: "/testimonials/jane.png",
      quote: "The templates are professional and easy to customize."
    },
    {
      name: "Ali Hassan",
      role: "Data Analyst",
      photo: "/testimonials/ali.png",
      quote: "Highly recommend for anyone looking to improve their resume quickly."
    },
    {
      name: "Maria Garcia",
      role: "Marketing Specialist",
      photo: "/testimonials/maria.png",
      quote: "The support team is amazing and the templates are gorgeous."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-brand-primary)] mb-4">
          What Our Users Say
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Trusted by thousands of professionals worldwide.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
        {testimonials.map((t, idx) => (
          <TestimonialCard key={idx} {...t} />
        ))}
      </div>
    </section>
  );
}
