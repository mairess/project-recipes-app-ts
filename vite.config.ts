/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { codecovVitePlugin } from "@codecov/vite-plugin";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    codecovVitePlugin({
      enableBundleAnalysis: process.env.CODECOV_TOKEN !== undefined,
      bundleName: "<bundle project name>",
      uploadToken: process.env.CODECOV_TOKEN,
    })
  ],
  server: {
    port: 3000,
    host: true
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
    css: true,
    reporters: ['verbose'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*'],
      exclude: [
        "src/main.tsx",
        "src/fakes",
        "src/routes",
        "src/tests"
      ],
      provider: 'c8'
    }
  },
})