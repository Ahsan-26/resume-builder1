export default function AboutContent() {
  return (
    <div className="relative py-16 px-6 lg:px-20 bg-gradient-to-r from-[#f3f4fd] to-[#ffffff] overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        
       
        <div className="flex flex-col items-start text-left">
          <div className="mb-4 w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-gradient)] text-white rounded-full shadow-lg">
          
            <span className="font-bold text-lg">M</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold text-[var(--color-brand-primary)] mb-3">
            Our Mission
          </h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            Empowering professionals with intuitive tools to showcase their skills and achieve career success faster.
          </p>
        </div>

      
        <div className="flex flex-col items-start text-left relative z-10">
          <div className="mb-4 w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-gradient)] text-white rounded-full shadow-lg">
            <span className="font-bold text-lg">V</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold text-[var(--color-brand-primary)] mb-3">
            Our Vision
          </h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            Becoming the most trusted, user-friendly platform for resume building, recognized globally by professionals and recruiters.
          </p>
        </div>

      
        <div className="flex flex-col items-start text-left">
          <div className="mb-4 w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-gradient)] text-white rounded-full shadow-lg">
            <span className="font-bold text-lg">V</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold text-[var(--color-brand-primary)] mb-3">
            Our Values
          </h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            Professionalism, innovation, user-first design, and commitment to helping every user succeed in their career.
          </p>
        </div>
      </div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-[var(--color-brand-gradient)] rounded-full opacity-10 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--color-brand-primary)] rounded-full opacity-5 -z-10"></div>
    </div>
  );
}
