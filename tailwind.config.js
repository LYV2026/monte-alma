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
        brand: {
          green: '#2F5D3A',
          sage: '#91A68A',
          beige: '#F4EFE6',
          ivory: '#FAF8F2',
          charcoal: '#1A1A1A',
          gold: '#C6A25A',
          'gold-light': '#E8D5A3',
          'green-light': '#3D7A4D',
        },
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body: ['var(--font-jost)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-in-right': 'slideInRight 0.35s ease-out',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      boxShadow: {
        'soft': '0 2px 20px rgba(0,0,0,0.06)',
        'card': '0 4px 30px rgba(0,0,0,0.08)',
        'hover': '0 12px 40px rgba(47,93,58,0.18)',
        'gold': '0 8px 30px rgba(198,162,90,0.25)',
        'glass': '0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-brand': 'linear-gradient(135deg, #2F5D3A 0%, #3D7A4D 100%)',
        'gradient-gold': 'linear-gradient(135deg, #C6A25A 0%, #E8D5A3 100%)',
      },
    },
  },
  plugins: [],
}
