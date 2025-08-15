export default {
  theme: {
    extend: {
      animation: {
        borderGlow: "borderGlow 2s linear infinite",
      },
      keyframes: {
        borderGlow: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
    },
  },
};
