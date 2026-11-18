/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: { fontFamily: { sans: ['DM Sans','sans-serif'], display: ['Manrope','sans-serif'] }, colors: { ink:'#10213b', navy:'#0c1d35', blue:'#426b9a', mist:'#edf3f8' }, boxShadow: { soft:'0 20px 60px rgba(15,35,60,.08)' } } },
  plugins: []
};
