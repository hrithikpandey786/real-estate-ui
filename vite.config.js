// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // Configure the dev server to handle routing
    historyApiFallback: true,
  },
  // build: {
  //   rollupOptions: {
  //     // Ensure that all routes fallback to index.html in production
  //     output: {
  //       entryFileNames: 'index.html',
  //       chunkFileNames: 'assets/[name].js',
  //       assetFileNames: 'assets/[name].[ext]',
  //     },
  //   },
  // },
});
