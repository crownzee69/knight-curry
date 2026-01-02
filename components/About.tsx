export default function About() {

  return (
    <section className="py-8 sm:py-12 lg:py-16 text-center relative" aria-labelledby="about-label" id="about">
      {/* Highlighted Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.08),transparent_70%)]"></div>
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Highlighted Card Container */}
        <div 
          className="max-w-5xl mx-auto rounded-3xl sm:rounded-[2rem] p-8 sm:p-12 lg:p-16 transform hover:shadow-3xl transition-all duration-300 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 248, 240, 0.98) 0%, rgba(250, 240, 230, 0.95) 30%, rgba(245, 230, 211, 0.92) 70%, rgba(255, 248, 240, 0.98) 100%)',
            border: '2px solid rgba(220, 38, 38, 0.25)',
            boxShadow: '0 20px 60px rgba(220, 38, 38, 0.15), 0 8px 24px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8), inset 0 -1px 0 rgba(220, 38, 38, 0.1)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-br-full transform -translate-x-8 -translate-y-8"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-primary/5 rounded-tl-full transform translate-x-8 translate-y-8"></div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/3 rounded-bl-full"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/3 rounded-tr-full"></div>
          
          <div className="mb-4 sm:mb-6 lg:mb-8 relative z-10">
            {/* Big "About Us" Text */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-black text-black mb-3 sm:mb-4 lg:mb-6 leading-tight px-2 drop-shadow-lg" id="about-label">
              About Us
            </h1>
            
            {/* <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-black text-neutral-900 mb-6 sm:mb-8 lg:mb-10 leading-tight px-2">
              Knights Curry Express
            </h2> */}
            
            <p className="text-base sm:text-xl md:text-2xl text-neutral-700 leading-relaxed max-w-4xl mx-auto px-2 font-medium">
              Knights Curry Express brings bold, Halal Indian flavors to the UCF area with a modern, student-friendly twist. From partition platters loaded with curries, rice, and naan to late-night biryani, we&apos;re here to fuel hungry Knights with fresh, affordable comfort food.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}