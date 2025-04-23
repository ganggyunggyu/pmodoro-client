import fs from 'fs';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const cert = fs.readFileSync('localhost.pem');
const key = fs.readFileSync('localhost-key.pem');

export default {
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  server: {
    host: true,
    https: {
      key,
      cert,
    },
  },
  host: '0.0.0.0',
  port: 5173,
};
