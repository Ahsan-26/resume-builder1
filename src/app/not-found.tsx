import { redirect } from 'next/navigation';

export default function RootNotFound() {
    // Redirect to the locale-specific 404 page
    redirect('/en/not-found-page');
}
