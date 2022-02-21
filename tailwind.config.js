module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      mobile: { max: "500px" },
    },
    flex: {
      scorll: "0 0 auto",
    },
    extend: {
      animation: {
        "show-header": "show-header 0.3s ease-out",
        "hide-header": "hide-header 0.3s ease-out",
        blink: "blink 2s ease-out infinite",
        "show-side": "show-side 0.3s ease-out",
        "hide-side": "hide-side 0.3s ease-out",
      },
      keyframes: {
        blink: {
          "0%": {
            opacity: "1",
          },
          "50%": {
            opacity: "0.5",
          },
          "100%": {
            opacity: "1",
          },
        },
        "show-header": {
          "0%": {
            transform: "translateY(-100%)",
          },
          "50%": {
            transform: "translateY(-50%)",
          },
          "100%": {
            transform: "translateY(0%)",
          },
        },
        "hide-header": {
          "0%": {
            transform: "translateY(100%)",
          },
          "50%": {
            transform: "translateY(50%)",
          },
          "100%": {
            transform: "translateY(0%)",
          },
        },
        "show-side": {
          "0%": {
            transform: "translateX(-100%)",
          },
          "50%": {
            transform: "translateX(-50%)",
          },
          "100%": {
            transform: "translateX(0%)",
          },
        },
        "hide-side": {
          "0%": {
            transform: "translateX(100%)",
          },
          "50%": {
            transform: "translateX(50%)",
          },
          "100%": {
            transform: "translateX(0%)",
          },
        },
      },
      width: {
        person: "235px",
        img: "150px",
        sm_backdrop: "250px",
        screen: "1400px",
      },
      height: {
        img: "225px",
        poster: "570px",
        list: "21rem",
        sm_backdrop: "141px",
        person: "300px",
      },
      inset: {
        "1/8": "12.5%",
      },
      colors: {
        whiteOp100: "rgb(255 255 255 / 100%)",
        whiteOp50: "rgb(255 255 255 / 50%)",
        whiteOp0: "rgb(255 255 255 / 0%)",
        blackOp100: "rgb(0 0 0 / 100%)",
        blackOp50: "rgb(0 0 0 / 50%)",
        blackOp0: "rgb(0 0 0 / 0%)",
      },
    },
    minWidth: {
      personImg: "300px",
      posterImg: "130px",
    },
  },
  plugins: [require("@tailwindcss/line-clamp"), require("tailwind-scrollbar")],
};
