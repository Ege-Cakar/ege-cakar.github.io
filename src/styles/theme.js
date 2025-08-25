const theme = {
  colors: {
    // New canonical tokens
    background: '#ffffff',
    text: '#000000',
    border: '#000000',
    gray100: '#f5f5f5', // light hover/fill
    gray200: '#e5e7eb',
    gray600: '#4b5563',

    // Legacy aliases mapped to new scheme for compatibility
    blackOlive: '#ffffff', // old background → white
    dutchWhite: '#f5f5f5', // light gray
    drabDarkBrown: '#ffffff', // surfaces → white
    battleshipGray: '#e5e7eb', // hover fill gray
    flame: '#000000', // accent → black
    textLight: '#000000', // text → black
    textDark: '#000000', // text → black
    cardBg: '#ffffff', // cards → white
    accentTeal: '#000000', // alias used in some components
    darkerBlue: '#ffffff', // alias used for header/footer bg
  },
  fonts: {
    primary: "'Inter', sans-serif",
  },
  breakpoints: {
    mobile: '768px',
  }
};

export default theme;
