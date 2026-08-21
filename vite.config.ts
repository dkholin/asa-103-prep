import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

const deploymentBase = process.env.VITE_BASE_PATH ?? '/asa-103-prep/';

if (!deploymentBase.startsWith('/') || !deploymentBase.endsWith('/')) {
  throw new Error('VITE_BASE_PATH must start and end with "/"');
}

export default defineConfig({
  base: deploymentBase,
  plugins: [react()],
  test: {
    include: ['src/**/*.test.ts'],
    environment: 'node',
  },
});
