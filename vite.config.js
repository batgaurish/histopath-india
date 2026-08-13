import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './', // Ensure relative paths work on GitHub Pages
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
