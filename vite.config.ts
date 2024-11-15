import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes("/node_modules/")) {
            const name = id.match(/node_modules\/([^/]+)/)?.[1]

            if (name) {
              return `${name}`
            }
          }
        },
      },
    },
  },
})
