import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  publicDir: 'public',
  build: {
    // Generate source maps for better debugging
    sourcemap: true,

    // Configure output directory
    outDir: 'dist',

    // Ensure assets are properly referenced
    assetsDir: 'assets',

    // Configure multi-page build
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        projects: resolve(__dirname, 'projects.html'),
        about: resolve(__dirname, 'about.html'),
        contact: resolve(__dirname, 'contact.html'),
        notFound: resolve(__dirname, '404.html'),
      },
    },
  },
});
