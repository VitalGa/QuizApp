import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    base: '/QuizApp/',
    plugins: [react()],
    build: {
        // SVG <use> needs a file URL with a symbol fragment, not a data URL.
        assetsInlineLimit: (file) =>
            file.endsWith('/iconsSprite/icons.svg') ? false : undefined,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@components': path.resolve(__dirname, './src/components'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@hooks': path.resolve(__dirname, './src/hooks'),
            '@utils': path.resolve(__dirname, './src/utils'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@css': path.resolve(__dirname, './src/css'),
            '@mock': path.resolve(__dirname, './src/mock'),
        },
    },
});
