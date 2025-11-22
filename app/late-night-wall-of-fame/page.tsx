import Layout from '@/components/Layout';
import HomepageBackground from '@/components/HomepageBackground';
import Link from 'next/link';
import WallOfFameGallery from '@/components/WallOfFameGallery';

export default function LateNightWallOfFamePage() {
  return (
    <Layout>
      <HomepageBackground />
      
      <article className="relative z-10">
        {/* Page Header */}
        <section className="py-12 sm:py-16 text-center">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center justify-center gap-3 mb-6">
              <ion-icon name="camera" className="text-5xl text-primary"></ion-icon>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-neutral-900">
                Late Night Wall of Fame
              </h1>
            </div>
            <p className="text-base sm:text-lg text-neutral-700 mb-4 max-w-2xl mx-auto">
              Follow us on Instagram <a href="https://instagram.com/knightscurryexpress" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">@knightscurryexpress</a> for real late-night pics from UCF student and you might get featured (or win a free platter).
            </p>
            <p className="text-xl sm:text-2xl font-bold text-neutral-900 mb-8">
              Real Knights. Real Platters. Real Late Nights.
            </p>
            <Link
              href="/late-night-specials"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300"
            >
              <ion-icon name="arrow-back" className="text-lg"></ion-icon>
              <span>Back to Late Night Specials</span>
            </Link>
          </div>
        </section>

        {/* Wall of Fame Gallery - Shows all images */}
        <section className="py-8 sm:py-12 pb-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <WallOfFameGallery showAll={true} />
          </div>
        </section>

        {/* CTA Section */}
        <section 
          className="py-16 sm:py-20 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(220, 38, 38, 0.05) 50%, rgba(245, 230, 211, 0.1) 100%)',
          }}
        >
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary rounded-full blur-3xl"></div>
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-neutral-900 mb-6">
              Want to Be Featured?
            </h2>
            <p className="text-lg sm:text-xl text-neutral-700 mb-8">
              Tag us <a href="https://instagram.com/knightscurryexpress" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">@knightscurryexpress</a> in your late-night food pics and you might see yourself here!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <a
                href="https://instagram.com/knightscurryexpress"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-full shadow-xl hover:scale-105 transition-all duration-300 hover:shadow-2xl"
              >
                <ion-icon name="logo-instagram" className="text-2xl"></ion-icon>
                <span>Follow on Instagram</span>
              </a>
              <Link
                href="/late-night-specials"
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-bold text-lg rounded-full shadow-xl hover:bg-primary-dark hover:scale-105 transition-all duration-300 hover:shadow-2xl"
              >
                <ion-icon name="restaurant-outline" className="text-2xl"></ion-icon>
                <span>View Late Night Menu</span>
              </Link>
            </div>
          </div>
        </section>
      </article>
    </Layout>
  );
}

