import Link from 'next/link'
import { useTranslations } from 'next-intl';
export default function Home() {
  const t = useTranslations('home');
  
  return (
    <div className="container">
      <h1>{t('header')}</h1>
      <p>This is a multilingual Next.js site using next-intl.</p>
      <div className="links">
        <Link href="/about" className="link">
          Learn About Us
        </Link>
        <Link href="/contact" className="link">
          Contact Us
        </Link>
      </div>
 export default function Home() {
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">
        Tailwind is working!
      </h1>
    </div>
}

    </div>
  );
}