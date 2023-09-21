import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      width: {
        drum: '700px',
        keyboard: '300px',
        display: '300px',
        volume: '300px',
        power: '50px'
      },
      height: {
        drum: '400px',
        keyboard: '300px',
        display: '2.5rem',
        volume: '5px',
        power: '25px',
        bar: '20px'
      },
      spacing: {
        pad: '5rem'
      },
      borderColor: {
        drum: '#fa0'
      }
    }
  },
  plugins: []
}
export default config
