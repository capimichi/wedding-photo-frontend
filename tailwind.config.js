/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}",
    "./index.html"
  ],
  theme: {
    extend: {
      colors: {
        'background': '#ecf0f1',     // Sfondo principale (grigio chiaro)
        'header':     '#2c3e50',     // Header (blu scuro desaturato)
        'text':       '#34495e',     // Testo principale (grigio-blu scuro, per sfondi chiari come 'background')
        'primary':    '#1abc9c',     // Colore primario/accento principale (turchese)
        'secondary':  '#e67e22',     // Colore secondario/accento alternativo (arancione)
        'white':      '#ffffff',     // Colore bianco per testo o elementi su sfondi scuri
      },
    },
  },
  plugins: [],
}