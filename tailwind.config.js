/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Red Theme - Professional Halal Food Restaurant palette
        primary: {
          DEFAULT: '#DC2626', // Vibrant Red (replacing yellow)
          dark: '#B91C1C',
          light: '#EF4444',
          bright: '#FF0000',
        },
        secondary: {
          DEFAULT: '#DC2626', // Red (same as primary for consistent red theme)
          dark: '#B91C1C',
          light: '#EF4444',
        },
        accent: {
          DEFAULT: '#FF8000', // Orange accent
          dark: '#E67300',
          light: '#FF9933',
        },
        neutral: {
          50: '#FAFAFA', // Clean white background
          100: '#F5F5F5', // Light gray for sections
          200: '#EEEEEE', // Card borders
          300: '#E0E0E0', // Divider lines
          600: '#757575', // Secondary text
          700: '#616161', // Body text
          800: '#424242', // Dark text
          900: '#212121', // Headlines
        }
      },
      fontFamily: {
        // Poppins is great for bold, friendly headlines (fast food style)
        display: ['var(--font-poppins)', 'sans-serif'],
        // DM Sans is clean and readable for body text
        body: ['var(--font-dm-sans)', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'fadeInDown': 'fadeInDown 0.3s ease-out',
        'fadeInUp': 'fadeInUp 0.4s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        'shimmer': 'shimmer 3s infinite',
        'skeleton': 'skeleton 1.5s ease-in-out infinite',
        'slideDownReload': 'slideDownReload 0.4s ease-out',
        'fadeInScale': 'fadeInScale 0.7s ease-in-out',
        'marquee': 'marquee 30s linear infinite',
        'premiumMarquee': 'premiumMarquee 60s linear infinite',
        'premiumMarqueeDesktop': 'premiumMarqueeDesktop 22s linear infinite',
        'premiumMarqueeMobile': 'premiumMarqueeMobile 19s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(15px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        skeleton: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        slideDownReload: {
          '0%': { opacity: '0', transform: 'translateY(-20px) scale(0.95)' },
          '50%': { opacity: '0.5', transform: 'translateY(-10px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        fadeInScale: {
          '0%': { opacity: '0', transform: 'scale(1.1)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        premiumMarquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        premiumMarqueeDesktop: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        premiumMarqueeMobile: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
