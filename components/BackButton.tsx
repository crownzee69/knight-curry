'use client';

import { useRouter } from 'next/navigation';

interface BackButtonProps {
  fallbackHref: string;
  fallbackText: string;
}

export default function BackButton({ fallbackHref, fallbackText }: BackButtonProps) {
  const router = useRouter();

  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Use browser's back navigation - this will go back to wherever the user came from
    // This mimics the browser's back button behavior
    router.back();
  };

  return (
    <button
      onClick={handleBack}
      className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-semibold text-sm sm:text-base mb-6 sm:mb-8 transition-all duration-300 hover:gap-3 group"
    >
      <ion-icon name="arrow-back" className="text-lg group-hover:-translate-x-1 transition-transform"></ion-icon>
      {fallbackText}
    </button>
  );
}

