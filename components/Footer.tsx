import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#F5E6D3] md:bg-black text-neutral-700 md:text-neutral-400 text-center relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-20 sm:pb-24 md:pb-8">
        <div className="space-y-2">
          <p className="text-sm sm:text-base">
            © {new Date().getFullYear()} <span className="text-neutral-900 md:text-white font-medium">Knights Curry Express</span>. All rights reserved.
          </p>
          <p className="text-sm sm:text-base">
            <Link 
              href="/privacy-policy" 
              className="text-neutral-800 md:text-neutral-300 hover:text-neutral-900 md:hover:text-white transition-colors underline underline-offset-2 relative z-10"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
