/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        oled: "#000000",
        obsidian: {
          950: "#040404",
          900: "#050505",
          800: "#080808",
          700: "#0F0F0F",
          600: "#141414",
          500: "#1A1A1A",
          400: "#242424",
        },
        metallic: {
          border: "rgba(255, 255, 255, 0.08)",
          borderHover: "rgba(255, 255, 255, 0.18)",
          borderBright: "rgba(255, 255, 255, 0.28)",
          subtle: "rgba(255, 255, 255, 0.03)",
        },
        emerald: {
          cold: "#00E599",
          phosphor: "#10B981",
          muted: "#059669",
          dim: "rgba(0, 229, 153, 0.12)",
          glow: "rgba(0, 229, 153, 0.25)",
        },
      },
      fontFamily: {
        mono: ["'JetBrains Mono'", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
        sans: ["'Inter'", "'Geist'", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      boxShadow: {
        'emerald-subtle': '0 0 15px -3px rgba(0, 229, 153, 0.15)',
        'emerald-glow': '0 0 25px -2px rgba(0, 229, 153, 0.25)',
        'metallic-inset': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.06)',
      },
      borderColor: {
        DEFAULT: "rgba(255, 255, 255, 0.08)",
      },
    },
  },
  plugins: [],
}
