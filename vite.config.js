import { defineConfig } from 'vite'

export default defineConfig({
    //root: '',
    base: '',
    publicDir: './static/',
    //assetsInclude: ['**/*.mp4'],
    build: {
        outDir: './dist',
        //chunkSizeWarningLimit: 5000,
        //cssCodeSplit: false,
        //manifest: true,
        emptyOutDir: true,
        sourcemap: true
    }
})