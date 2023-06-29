/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'prime':'#0d253f',
        'second':'#01b4e4',
        'tert':'#90cea1',
        'dashPrime':'#141531',
        'dashSec':'#f6fafc',
        'color-1':'#e9523f',
        'color-2':'#2edc48',
        'color-3':'#f8b84a'
      },
      gridTemplateColumns:{
        'two':'0.25fr 2.75fr',
        '2_spec':'2.5fr 0.5fr',
        'links':'0.5fr 2.5fr',
        'links-rev':'2.5fr 0.5fr',
        'thrice-rev':'0.5fr 5fr 0.5fr',
        '123':'0.25fr 2fr 0.75fr',
        'fifty':'1.5fr 1.5fr',
        'test-select-popup':'0.5fr 1fr 1fr'
      },
      gridTemplateRows:{
        'three':'0.2fr 2.5fr 0.1fr',
        '123':'1fr 7fr'
      },
      boxShadow:{
        'square':'0 0 30px rgba(0,0,0,0.25)',
        'outer':'0 0 3px rgba(0,0,0,0.5)',
      }
    },
  },
  plugins: [],
}