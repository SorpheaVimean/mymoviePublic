import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: false,
      fontFamily: {
        myFont: ["Nunito Sans", "sans-serif"],
      },
      colors: {
        Background: "#191A19",
        MainColor: "#16a34a",
        Green: "#4E9F3D",
        text: "#D8E9A8",
      },
    },
  },
  plugins: [],
});
