import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Publicado em https://marlonrodler.github.io/leagueoflegends-game/
export default defineConfig({
  base: '/leagueoflegends-game/',
  plugins: [react()],
  test: { environment: 'jsdom', globals: true, setupFiles: ['./src/setupTests.js'] },
});
