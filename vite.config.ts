import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    // Add security headers for development
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      // Basic CSP - adjust as needed
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.emailjs.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob:; connect-src 'self' https://api.emailjs.com; frame-ancestors 'none';"
    }
  },
  build: {
    // Security: disable source maps in production
    sourcemap: false,
    // Enable minification
    minify: 'terser',
    // Performance optimizations
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          mui: ['@mui/material', '@mui/icons-material'],
          animation: ['framer-motion']
        }
      }
    },
    // Optimize assets
    assetsInlineLimit: 4096,
    // Target modern browsers for better performance
    target: 'es2020'
  },
  // Performance optimizations
  optimizeDeps: {
    include: ['react', 'react-dom', '@mui/material', 'framer-motion']
  }
})
