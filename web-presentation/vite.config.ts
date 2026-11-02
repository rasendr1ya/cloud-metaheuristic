import { defineConfig } from 'vite';

export default defineConfig(() => ({
  base: process.env.BASE_PATH ?? './',
  server: {
    host: true,
    port: 5173,
  },
  build: {
    target: 'es2022',
    sourcemap: false,
  },
}));
