/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#020205',      // Deep dark navy + black
          black: '#000000',
          red: '#ff1a1a',     // Red glowing accent
          redGlow: '#ff3333',
          darkRed: '#500505',
          cardBg: 'rgba(5, 5, 10, 0.6)',
          borderGlow: 'rgba(255, 26, 26, 0.3)',
        }
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        gaming: ['"Space Mono"', 'monospace'],
        brush: ['"Shippori Mincho"', 'serif'], // Elegant brush-like Japanese-compatible font or custom fallback
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s infinite ease-in-out',
        'sword-shine': 'swordShine 4s infinite linear',
        'float-slow': 'floatSlow 6s infinite ease-in-out',
        'smoke-drift': 'smokeDrift 20s infinite linear',
        'fog-slow': 'fogSlow 30s infinite linear',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.3', filter: 'drop-shadow(0 0 10px rgba(255, 26, 26, 0.4))' },
          '50%': { opacity: '0.8', filter: 'drop-shadow(0 0 25px rgba(255, 26, 26, 0.8))' },
        },
        swordShine: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '10%, 20%': { opacity: '0.8' },
          '30%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1deg)' },
        },
        smokeDrift: {
          '0%': { transform: 'translateX(-5%) translateY(0%) scale(1)', opacity: '0.05' },
          '50%': { transform: 'translateX(5%) translateY(-2%) scale(1.1)', opacity: '0.15' },
          '100%': { transform: 'translateX(-5%) translateY(0%) scale(1)', opacity: '0.05' },
        },
        fogSlow: {
          '0%': { transform: 'translateX(-10%) translateY(0) scale(1)' },
          '50%': { transform: 'translateX(10%) translateY(-1%) scale(1.05)' },
          '100%': { transform: 'translateX(-10%) translateY(0) scale(1)' },
        }
      }
    },
  },
  plugins: [],
}
