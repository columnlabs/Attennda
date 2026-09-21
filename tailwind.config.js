// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'translateX(0%) rotate(0deg) scaleY(1)' },
          '50%': { transform: 'translateX(-25%) rotate(3deg) scaleY(1.05)' },
        },
      },
      animation: {
        // Optional: Predefine named classes if you don't want to use arbitrary syntax
        'ps4-slow': 'wave 20s ease-in-out infinite',
        'ps4-fast': 'wave 14s ease-in-out infinite reverse',
      },
    },
  },
}