import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config(); // โหลดค่าจาก .env

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT_HRMANAGEMENT), // ต้องเป็น number
    open: false,
    allowedHosts: [process.env.HOST_HRMANAGEMENT]
 
  },
  preview: {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT_HRMANAGEMENT ),
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  base: '/',
});
