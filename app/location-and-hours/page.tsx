import Layout from '@/components/Layout';
import HomepageBackground from '@/components/HomepageBackground';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function LocationAndHoursPage() {
  return (
    <Layout>
      {/* Location and Hours Page Background - Repeating Wallpaper */}
      <HomepageBackground />

      <article className="relative z-10">
        {/* Enhanced Hero Section */}
        <section className="relative pt-8 sm:pt-12 lg:pt-16 pb-6 sm:pb-8 lg:pb-10 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 text-center overflow-hidden" aria-label="location-and-hours" id="location-and-hours">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center justify-center gap-2 mb-2 sm:mb-3">
              <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
              <MapPin className="text-primary w-6 h-6 sm:w-8 sm:h-8" />
              <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            </div>

            <p className="text-xs sm:text-sm font-bold text-primary uppercase tracking-wider mb-2 sm:mb-3 animate-fadeInDown">
              Find Us
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black text-neutral-900 mb-2 sm:mb-3 lg:mb-4 leading-tight animate-fadeInUp">
              Location and Hours
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-neutral-600 max-w-3xl mx-auto leading-relaxed animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
              We&apos;re here to serve you delicious Halal Indian food!
            </p>
          </div>
        </section>

        {/* Contact Information Section */}
        <section className="py-4 sm:py-6 lg:py-8">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">

              {/* Left Column Wrapper - Desktop only, groups Call/Email and Location */}
              <div className="hidden lg:flex lg:flex-col gap-3 sm:gap-4 lg:gap-5">
                {/* Call Us and Email Us - Side by Side */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {/* Call Us Button */}
                  <a
                    href="tel:+14072032499"
                    className="group bg-gradient-to-r from-secondary to-secondary-dark text-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] active:scale-95 flex flex-col items-center justify-center text-center relative overflow-hidden"
                  >
                    {/* Decorative gradient overlay */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-16 translate-x-16"></div>

                    <div className="relative z-10">
                      <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300 mx-auto">
                        <Phone className="text-white w-6 h-6 sm:w-7 sm:h-7" strokeWidth={2.5} />
                      </div>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-2">Call Us</h3>
                    </div>
                  </a>

                  {/* Email Us Button */}
                  <a
                    href="mailto:knightcurryexpress@gmail.com"
                    className="group bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] active:scale-95 flex flex-col items-center justify-center text-center relative overflow-hidden"
                  >
                    {/* Decorative gradient overlay */}
                    <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-16 -translate-x-16"></div>

                    <div className="relative z-10">
                      <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300 mx-auto">
                        <Mail className="text-white w-6 h-6 sm:w-7 sm:h-7" strokeWidth={2.5} />
                      </div>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-2">Email Us</h3>
                    </div>
                  </a>
                </div>

                {/* Our Location - Below Call Us and Email Us */}
                <div className="group bg-gradient-to-br from-amber-50/90 via-orange-50/80 to-red-50/90 rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10 border-2 border-primary/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                  {/* Decorative gradient overlay */}
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl translate-y-16 translate-x-16"></div>

                  <div className="relative z-10 flex items-start gap-4 sm:gap-6">
                    <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="text-primary w-8 h-8 sm:w-10 sm:h-10" strokeWidth={2.5} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-black text-neutral-900 mb-3 sm:mb-4">Our Location</h3>
                      <address className="text-base sm:text-lg text-neutral-700 leading-relaxed not-italic mb-4">
                        11565 University Blvd #4<br />
                        Orlando, FL 32817<br />
                        United States
                      </address>
                      <a
                        href="https://maps.google.com/?q=11565+University+Blvd+%234,+Orlando,+FL+32817"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary text-primary hover:text-white font-semibold rounded-lg transition-all duration-300 group/link"
                      >
                        <MapPin className="w-4 h-4" />
                        <span>Get Directions</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile: Call Us and Email Us - order-1 (first) */}
              <div className="order-1 lg:hidden grid grid-cols-2 gap-3 sm:gap-4">
                {/* Call Us Button */}
                <a
                  href="tel:+14072032499"
                  className="group bg-gradient-to-r from-secondary to-secondary-dark text-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] active:scale-95 flex flex-col items-center justify-center text-center relative overflow-hidden"
                >
                  {/* Decorative gradient overlay */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-16 translate-x-16"></div>

                  <div className="relative z-10">
                    <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300 mx-auto">
                      <Phone className="text-white w-6 h-6 sm:w-7 sm:h-7" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-2">Call Us</h3>
                  </div>
                </a>

                {/* Email Us Button */}
                <a
                  href="mailto:knightcurryexpress@gmail.com"
                  className="group bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] active:scale-95 flex flex-col items-center justify-center text-center relative overflow-hidden"
                >
                  {/* Decorative gradient overlay */}
                  <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-16 -translate-x-16"></div>

                  <div className="relative z-10">
                    <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300 mx-auto">
                      <Mail className="text-white w-6 h-6 sm:w-7 sm:h-7" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-2">Email Us</h3>
                  </div>
                </a>
              </div>

              {/* Opening Hours - Mobile: order-2 (second), Desktop: right column */}
              <div className="order-2 lg:order-2 bg-gradient-to-br from-primary/10 via-white to-primary/5 rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10 border-2 border-primary/20 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>

                <div className="relative z-10 text-center mb-4 sm:mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary to-primary-dark rounded-2xl mb-3 sm:mb-4 shadow-lg">
                    <Clock className="text-white w-8 h-8 sm:w-10 sm:h-10" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-neutral-900 mb-2">Location Hours</h3>
                  <p className="text-sm sm:text-base text-neutral-600">We&apos;re open daily for your convenience</p>
                </div>

                <div className="relative z-10">
                  <div className="bg-gradient-to-br from-red-50/90 to-orange-50/90 rounded-xl p-5 sm:p-6 border-2 border-primary/20 shadow-md">
                    <ul className="space-y-3 sm:space-y-4">
                      <li className="flex items-center justify-between py-2 border-b border-neutral-200 last:border-b-0">
                        <span className="font-bold text-base sm:text-lg text-neutral-900">Monday</span>
                        <span className="text-base sm:text-lg text-neutral-700">11:00 AM – 1:00 AM</span>
                      </li>
                      <li className="flex items-center justify-between py-2 border-b border-neutral-200 last:border-b-0">
                        <span className="font-bold text-base sm:text-lg text-neutral-900">Tuesday</span>
                        <span className="text-base sm:text-lg text-neutral-700">11:00 AM – 1:00 AM</span>
                      </li>
                      <li className="flex items-center justify-between py-2 border-b border-neutral-200 last:border-b-0">
                        <span className="font-bold text-base sm:text-lg text-neutral-900">Wednesday</span>
                        <span className="text-base sm:text-lg text-neutral-700">11:00 AM – 1:00 AM</span>
                      </li>
                      <li className="flex items-center justify-between py-2 border-b border-neutral-200 last:border-b-0">
                        <span className="font-bold text-base sm:text-lg text-neutral-900">Thursday</span>
                        <span className="text-base sm:text-lg text-neutral-700">11:00 AM – 1:00 AM</span>
                      </li>
                      <li className="flex items-center justify-between py-2 border-b border-neutral-200 last:border-b-0">
                        <span className="font-bold text-base sm:text-lg text-neutral-900">Friday</span>
                        <span className="text-base sm:text-lg text-neutral-700">11:00 AM – 2:30 AM</span>
                      </li>
                      <li className="flex items-center justify-between py-2 border-b border-neutral-200 last:border-b-0">
                        <span className="font-bold text-base sm:text-lg text-neutral-900">Saturday</span>
                        <span className="text-base sm:text-lg text-neutral-700">11:00 AM – 2:30 AM</span>
                      </li>
                      <li className="flex items-center justify-between py-2">
                        <span className="font-bold text-base sm:text-lg text-neutral-900">Sunday</span>
                        <span className="text-base sm:text-lg text-neutral-700">11:00 AM – 11:00 PM</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Mobile: Our Location - order-3 (third) */}
              <div className="order-3 lg:hidden group bg-gradient-to-br from-amber-50/90 via-orange-50/80 to-red-50/90 rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10 border-2 border-primary/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                {/* Decorative gradient overlay */}
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl translate-y-16 translate-x-16"></div>

                <div className="relative z-10 flex items-start gap-4 sm:gap-6">
                  <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="text-primary w-8 h-8 sm:w-10 sm:h-10" strokeWidth={2.5} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-black text-neutral-900 mb-3 sm:mb-4">Our Location</h3>
                    <address className="text-base sm:text-lg text-neutral-700 leading-relaxed not-italic mb-4">
                      11565 University Blvd #4<br />
                      Orlando, FL 32817<br />
                      United States
                    </address>
                    <a
                      href="https://maps.google.com/?q=11565+University+Blvd+%234,+Orlando,+FL+32817"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary text-primary hover:text-white font-semibold rounded-lg transition-all duration-300 group/link"
                    >
                      <MapPin className="w-4 h-4" />
                      <span>Get Directions</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Section */}
          </div>
        </section>
      </article>
    </Layout>
  );
}
