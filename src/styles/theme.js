const theme = {
  colors: {
    // New canonical tokens
    background: "#ffffff",
    text: "#111827",
    border: "#d1d5db",
    gray100: "#f5f5f5", // light hover/fill
    gray200: "#e5e7eb",
    gray600: "#4b5563",

    // Legacy aliases mapped to new scheme for compatibility
    blackOlive: "#ffffff", // old background → white
    dutchWhite: "#f5f5f5", // light gray
    drabDarkBrown: "#ffffff", // surfaces → white
    battleshipGray: "#e5e7eb", // hover fill gray
    flame: "#111827", // toned-down accent → near-black
    textLight: "#111827", // text → near-black
    textDark: "#111827", // text → near-black
    cardBg: "#ffffff", // cards → white
    accentTeal: "#111827", // alias aligned to neutral text
    darkerBlue: "#ffffff", // alias used for header/footer bg
  },
  fonts: {
    primary: "'Inter', sans-serif",
  },
  breakpoints: {
    mobile: "768px",
  },
  motion: {
    duration: {
      fast: "150ms",
      normal: "200ms",
      slow: "300ms",
    },
    easing: {
      standard: "ease",
      emphasized: "cubic-bezier(0.2, 0, 0, 1)",
    },
  },
};

export default theme;
