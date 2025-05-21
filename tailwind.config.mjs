/** @type {import('tailwindcss').Config} */
// const plugin = require('tailwindcss/plugin')

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  // variants: {
  //   extend: {
  //     backgroundColor: ['disabled']
  //  },
  // },
  plugins: [require('@tailwindcss/typography')
    // plugin(function({ addUtilities, addComponents, e, config }) {
    //   // Add your custom styles here
    // }),
  ],
}