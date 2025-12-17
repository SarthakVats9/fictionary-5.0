import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      "Cross-Origin-Embedder-Policy": "unsafe-none",
      "Cross-Origin-Opener-Policy": "same-origin-allow-popups"
    },
  },
  build: {
    outDir: 'dist', // Vercel expects the build to be in the 'dist' folder
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});
