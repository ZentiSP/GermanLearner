const colors = {
  primary: {
    light: "#e5c97b",      // --luxury-gold-light
    main: "#bfa76a",       // --luxury-gold
    dark: "#bfa76a",       // fallback, same as main
    contrastText: "#18181b", // --luxury-black-1
  },
  secondary: {
    light: "#23232a",      // --luxury-black-2
    main: "#18181b",       // --luxury-black-1
    dark: "#0a0a0a",       // dark mode background
    contrastText: "#e5c97b", // --luxury-gold-light
  },
  background: {
    default: "#ffffff",    // --background (light)
    dark: "#0a0a0a",       // --background (dark)
    paper: "#ededed",      // --foreground (light)
  },
  text: {
    primary: "#171717",    // --foreground (light)
    secondary: "#23232a",  // --luxury-black-2
    contrast: "#ededed",   // --foreground (dark)
  },
  transparent: {
    50: "rgba(0, 0, 0, 0.24)", // --transparent-50
  },
  gold: {
    main: "#bfa76a",       // --luxury-gold
    light: "#e5c97b",      // --luxury-gold-light
  },
  black: {
    main: "#18181b",       // --luxury-black-1
    dark: "#23232a",       // --luxury-black-2
  },
};

export default colors;