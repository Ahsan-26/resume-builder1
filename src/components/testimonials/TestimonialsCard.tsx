interface TestimonialCardProps {
  name: string;
  role: string;
  photo?: string;
  quote: string;
}

export default function TestimonialCard({ name, role, photo, quote }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition flex flex-col items-center text-center">
      {photo && (
        <img
          src={photo}
          alt={name}
          className="w-20 h-20 rounded-full mb-4 object-cover"
        />
      )}
      <p className="text-gray-700 italic mb-4">"{quote}"</p>
      <h4 className="font-semibold text-[var(--color-brand-primary)]">{name}</h4>
      <span className="text-gray-500 text-sm">{role}</span>
    </div>
  );
}
