// src/theme/index.js
// Paleta cálida: azul pizarra suave + lavanda + blanco crema

export const COLORS = {
  // Fondos
  bg:           '#F7F5FF',   // blanco lavanda muy suave
  bgCard:       '#FFFFFF',
  bgDark:       '#1C1A2E',   // noche profunda para respiración

  // Primario — azul pizarra cálido
  primary:      '#5B7FBF',
  primaryLight: '#D6E3FF',
  primaryDark:  '#3A5A96',

  // Acento — lavanda suave
  lavender:     '#B8A9E0',
  lavenderLight:'#EDE8FF',
  lavenderDark: '#7C6BB0',

  // Acento cálido — melocotón
  peach:        '#F4A97F',
  peachLight:   '#FDE8D8',

  // Neutros
  text:         '#2C2A3E',
  textSoft:     '#7A7A9A',
  textMuted:    '#B0AECF',
  border:       '#E8E4F8',
  white:        '#FFFFFF',

  // Semánticos
  success:      '#7DC88B',
  error:        '#E07A7A',
};

export const FONTS = {
  // Usar fuentes del sistema con pesos distintos para dar carácter
  display:  { fontFamily: 'serif',     fontWeight: '300' },
  heading:  { fontFamily: 'serif',     fontWeight: '600' },
  body:     { fontFamily: 'sans-serif',fontWeight: '400' },
  bodyBold: { fontFamily: 'sans-serif',fontWeight: '700' },
  caption:  { fontFamily: 'sans-serif',fontWeight: '300' },
};

export const RADIUS = {
  sm:   10,
  md:   18,
  lg:   26,
  xl:   36,
  full: 999,
};

export const SHADOW = {
  soft: {
    shadowColor: '#B8A9E0',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 6,
  },
  card: {
    shadowColor: '#5B7FBF',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.10,
    shadowRadius: 10,
    elevation: 4,
  },
  glow: {
    shadowColor: '#B8A9E0',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 8,
  },
};
