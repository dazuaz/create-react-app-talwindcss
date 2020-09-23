module.exports = {
  purge: ["./src/**/*.js", "./public/index.html"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
    },
  },
  variants: {},
  plugins: [],
};
