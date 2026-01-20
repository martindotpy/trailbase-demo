import tailwindcss from "@tailwindcss/vite"
import { devtools } from "@tanstack/devtools-vite"
import { tanstackRouter } from "@tanstack/router-plugin/vite"
import viteReact from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import htmlMinifier from "vite-plugin-html-minifier"
import tsconfigPaths from "vite-tsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    devtools(),
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
      semicolons: false,
      quoteStyle: "double",
    }),
    viteReact({
      babel: {
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
    tailwindcss(),
    tsconfigPaths(),
    htmlMinifier(),
  ],
  server: {
    proxy: {
      "/api": "http://localhost:4000",
      "/_": "http://localhost:4000",
    },
  },
})
