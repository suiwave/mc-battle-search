import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [react()],
  // テストのセットアップファイルを読み込む
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  test: {
    // デフォルトのnode環境ではDOMを再現できない
    environment: 'jsdom',
    setupFiles: ['./__test__/setup.ts'],
  },
});
