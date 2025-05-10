/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7c3aed',
          light: '#a78bfa',
          dark: '#5b21b6'
        },
        secondary: {
          DEFAULT: '#06b6d4',
          light: '#67e8f9',
          dark: '#0891b2'
        },
        accent: '#f43f5e',
        surface: {
          50: '#f8fafc',   // Lightest
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',  // Added
          500: '#64748b',  // Added
          600: '#475569',  // Added
          700: '#334155',  // Added
          800: '#1e293b',  // Added
          900: '#0f172a'   // Darkest
        }      
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'neu-light': '5px 5px 15px #d1d9e6, -5px -5px 15px #ffffff',
        'neu-dark': '5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.05)'
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem'
      }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #7c3aed, #8b5cf6, #a78bfa)',
        'gradient-secondary': 'linear-gradient(to right, #06b6d4, #0ea5e9, #38bdf8)',
        'gradient-accent': 'linear-gradient(to right, #f43f5e, #fb7185, #fda4af)',
        'gradient-primary-dark': 'linear-gradient(to right, #5b21b6, #7c3aed, #8b5cf6)',
        'gradient-secondary-dark': 'linear-gradient(to right, #0891b2, #06b6d4, #22d3ee)',
        'gradient-accent-dark': 'linear-gradient(to right, #be123c, #f43f5e, #fb7185)',
        'gradient-surface': 'linear-gradient(to bottom right, #f8fafc, #f1f5f9)',
        'gradient-surface-dark': 'linear-gradient(to bottom right, #0f172a, #1e293b)',
        'gradient-card': 'linear-gradient(145deg, #ffffff, #f8fafc)',
        'gradient-card-dark': 'linear-gradient(145deg, #1e293b, #0f172a)',
        'gradient-primary-hover': 'linear-gradient(to right, #6d28d9, #7c3aed, #8b5cf6)',
        'gradient-secondary-hover': 'linear-gradient(to right, #0e7490, #06b6d4, #0ea5e9)',
        'gradient-accent-hover': 'linear-gradient(to right, #e11d48, #f43f5e, #fb7185)',
        'gradient-primary-active': 'linear-gradient(to right, #5b21b6, #6d28d9, #7c3aed)',
        'gradient-secondary-active': 'linear-gradient(to right, #0891b2, #0e7490, #06b6d4)',
        'gradient-accent-active': 'linear-gradient(to right, #be123c, #e11d48, #f43f5e)'
      }  
  },
  plugins: [],
  darkMode: 'class',
}