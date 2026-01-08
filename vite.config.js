import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        svgr({
            svgrOptions: {
                icon: true,
            },
        }),],
    server: {
        proxy: {
            "/api": {
                target: process.env.VITE_API_BASE_URL || "http://localhost:8080",
                secure: false,
            }
        }
    },
})