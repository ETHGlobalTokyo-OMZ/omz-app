module.exports = {
  content: ['../../packages/ui/components/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  plugins: [require('prettier-plugin-tailwindcss')],
  theme: {
    colors: {
      white: '#FFFFFF',
      black: '#000000',
      grey: {
        1: '#FAFAFB',
        2: '#EAEAEA',
        3: '#E0E0E0',
        4: '#C6C6C6',
        5: '#8E8E93',
        6: '#48484A',
        7: '#3A3A3C',
        8: '#1C1C1E',
        9: '#22252E',
        10: '#191B23'
      },
      tint: {
        blue: '#2864FF',
        pink: '#FF3AEB'
      },
      sub: {
        red: '#FF6060',
        green: '#52E77C',
        mint: '#57F5FF'
      }
    }
  }
};
