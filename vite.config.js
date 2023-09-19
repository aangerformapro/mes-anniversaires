import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import Unfonts from 'unplugin-fonts/vite'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        Unfonts({
            fontsource: {
                inter: {
                    name: 'Inter',
                    weights: [300, 400, 500, 600, 700],
                    styles: ['normal'],
                    subset: 'latin-ext'
                }
            }
        }),

    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
