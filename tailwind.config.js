/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        90: "90vh",
      },
      width: {
        90: "90vw",
      },
      animation: {
        fade: "fadeIn 0.5s ease-in-out",
        delay: "delay 0.75s ease-in-out",
        rtl: "rtl 0.5s ease-in-out",
        ltr: "ltr 0.5s ease-in-out",
      },

      // that is actual animation
      keyframes: () => ({
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(16px)" },
          "100%": { opacity: 1, transform: "translateY(0px)" },
        },
        delay: {
          "0%": { opacity: 0, transform: "translateY(16px)" },
          "50%": { opacity: 0, transform: "translateY(8px)" },
          "100%": { opacity: 1, transform: "translateY(0px)" },
        },
        rtl: {
          "0%": { opacity: 0, transform: "translateX(25%)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        ltr: {
          "0%": { opacity: 0, transform: "translateX(-25%)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
      }),
    },
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "dark", // name of one of the included themes for dark mode
    base: false, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
};
