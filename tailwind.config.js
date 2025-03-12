/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1DA1F2",
        "primary-dark": "#0d8ecf",
        secondary: "#14171A",
        tertiary: "#657786",
        light: "#F5F8FA",
        "light-hover": "#E1E8ED",
        success: "#17BF63",
        danger: "#E0245E",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      boxShadow: {
        'custom': '0 4px 12px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'xl': '1rem',
      }
    },
  },
  plugins: [],
}
