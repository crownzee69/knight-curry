import Image from 'next/image';
import Link from 'next/link';

export default function Testimonial() {
  return (
    <>
      <section 
        className="section testi text-center has-bg-image"
        style={{ backgroundImage: "url('/assets/images/testimonial-bg.jpg')" }} 
        aria-label="testimonials"
      >
        <div className="container">
          <div className="quote">"</div>

          <p className="headline-2 testi-text">
            I wanted to thank you for inviting me down for that amazing dinner the other night. The food was
            extraordinary.
          </p>

          <div className="wrapper">
            <div className="separator"></div>
            <div className="separator"></div>
            <div className="separator"></div>
          </div>

          <div className="profile">
            <Image 
              src="/assets/images/testi-avatar.jpg" 
              width={100} 
              height={100} 
              loading="lazy" 
              alt="Sam Jhonson"
              className="img"
            />
            <p className="label-2 profile-name">Sam Jhonson</p>
          </div>
        </div>
      </section>
      
      {/* Full Menu Button */}
      <section className="py-6 sm:py-8 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-primary text-white font-bold text-base sm:text-lg rounded-full shadow-lg hover:bg-primary-dark hover:scale-105 transition-all duration-300 hover:shadow-xl"
          >
            <ion-icon name="restaurant-outline" className="text-xl sm:text-2xl"></ion-icon>
            <span>We also have full menu</span>
            <ion-icon name="arrow-forward" className="text-lg sm:text-xl"></ion-icon>
          </Link>
        </div>
      </section>
    </>
  );
}

