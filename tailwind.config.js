/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          lavender: {
            50: '#FAF8FF',
            100: '#F3F0FF',
            200: '#E9E4FE',
            300: '#D7CEFD',
            400: '#C0B0FB',
            500: '#9E86F8',
            600: '#7E5CEF',
          },
          blue: {
            50: '#F4F8FE',
            100: '#E8F1FC',
            200: '#D5E5FA',
            300: '#B8D4F7',
            400: '#8FBDF2',
            500: '#5F9EE8',
            600: '#3D81D7',
          },
          mint: {
            50: '#F2FAF7',
            100: '#E2F6EE',
            200: '#C4EEDC',
            300: '#9CE2C5',
            400: '#64CDA4',
            500: '#38B585',
            600: '#279469',
          },
          peach: {
            50: '#FFF9F4',
            100: '#FFF1E6',
            200: '#FFE2CC',
            300: '#FFC899',
            400: '#FFAA66',
            500: '#FA8A35',
          },
          rose: {
            50: '#FFF5F6',
            100: '#FFE8EA',
            200: '#FFD3D7',
            300: '#FFADB6',
            400: '#F77C8A',
            500: '#E44E60',
          },
          slate: {
            50: '#F8FAFC',
            100: '#F1F5F9',
            200: '#E2E8F0',
            300: '#CBD5E1',
            400: '#94A3B8',
            500: '#64748B',
            600: '#475569',
            700: '#334155',
            800: '#1E293B',
            900: '#0F172A',
          }
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'pastel': '0 4px 20px -2px rgba(160, 175, 215, 0.12)',
        'pastel-md': '0 8px 30px -4px rgba(150, 165, 210, 0.16)',
        'pastel-lg': '0 16px 40px -8px rgba(145, 160, 215, 0.20)',
        'pastel-glow': '0 0 25px rgba(192, 176, 251, 0.25)',
        'pastel-mint': '0 0 25px rgba(100, 205, 164, 0.20)',
        'pastel-blue': '0 0 25px rgba(143, 189, 242, 0.20)',
        'soft': '0 2px 10px rgba(0, 0, 0, 0.03), 0 8px 24px rgba(148, 163, 184, 0.07)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      animation: {
        'pulse-gentle': 'pulseGentle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'flow-line': 'flowLine 2s linear infinite',
      },
      keyframes: {
        pulseGentle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.82', transform: 'scale(1.03)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        flowLine: {
          '0%': { strokeDashoffset: '24' },
          '100%': { strokeDashoffset: '0' },
        }
      }
    },
  },
  plugins: [],
}
