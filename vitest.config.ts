import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path'

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        }
    },
    test: {
        // デフォルトのnode環境ではDOMを再現できない
        environment: "jsdom",
    },
})