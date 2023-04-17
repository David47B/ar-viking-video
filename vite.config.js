import { defineConfig } from 'vite'

export default defineConfig({
    root: './',
    base: 'ar-viking-video',
    build: {
        outDir: './dist',
        chunkSizeWarningLimit: 5000,
        cssCodeSplit: false,
        manifest: true,
        emptyOutDir: true,
        sourcemap: true
    }
})