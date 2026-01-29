import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  tailwindcss(),
],
// server: {
//     proxy: {
//       "/api": {
//         target: "https://t4fbgm8z-8000.inc1.devtunnels.ms",
//         changeOrigin: true,
//         secure: false,
//         rewrite: (path) => path.replace(/^\/api/, ""),
//       },
//     },
//   },

})
