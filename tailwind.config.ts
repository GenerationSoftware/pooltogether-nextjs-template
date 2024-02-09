import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/app/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        pt: {
          purple: {
            50: '#F5F0FF',
            100: '#DECEFF',
            200: '#C8ADFF',
            300: '#B18CFF',
            400: '#9B6AFF',
            500: '#8050E3',
            600: '#6538C1',
            700: '#4C249F',
            800: '#36147D',
            900: '#24095B',
            DEFAULT: '#8050E3'
          },
          teal: {
            light: '#35F0D0',
            dark: '#0DC5A5',
            DEFAULT: '#35F0D0'
          },
          pink: {
            light: '#FA48E8',
            dark: '#B623A7',
            DEFAULT: '#FA48E8'
          },
          bg: {
            purple: {
              light: '#5D3A97',
              dark: '#2D0C66',
              darker: '#21064E',
              DEFAULT: '#2D0C66'
            }
          },
          warning: {
            light: '#FFB6B6',
            dark: '#8B0000',
            DEFAULT: '#8B0000'
          },
          gold: '#FFB636',
          transparent: '#F5F0FF1A'
        }
      }
    }
  },
  plugins: []
}

export default config
