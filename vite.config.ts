import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
  react(),
  tailwindcss(),

  visualizer({
    filename: "stats.html",
    open: true,
    gzipSize: true,
    brotliSize: true,
  }),
],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
  target: "esnext",
  sourcemap: false,
  chunkSizeWarningLimit: 800,

  rollupOptions: {
    output: {
      manualChunks(id) {
        // React
        if (
          id.includes("react") ||
          id.includes("react-dom") ||
          id.includes("scheduler")
        ) {
          return "react";
        }

        // Router
        if (id.includes("react-router")) {
          return "router";
        }

        // GSAP
        if (
          id.includes("gsap") ||
          id.includes("@gsap/react")
        ) {
          return "gsap";
        }

        // Motion
        if (id.includes("/motion/")) {
          return "motion";
        }

        // Radix
        if (id.includes("@radix-ui")) {
          return "radix";
        }

        // Forms
        if (
          id.includes("react-hook-form") ||
          id.includes("@hookform") ||
          id.includes("zod")
        ) {
          return "forms";
        }

        // Charts
        if (id.includes("recharts")) {
          return "charts";
        }

        // Carousel
        if (id.includes("embla")) {
          return "embla";
        }

        // Lenis
        if (id.includes("lenis")) {
          return "lenis";
        }

        // Everything else
        if (id.includes("node_modules")) {
          return "vendor";
        }
      },
    },
  },
},
})
