import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true, // also listen on the Wi-Fi network so phones can open it
    allowedHosts: ['.local'], // allow http://<mac-name>.local links from phones
    // Forward API calls to Express during development.
    proxy: { '/api': 'http://localhost:5050' },
  },
});
