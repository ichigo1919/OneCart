import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'



export default defineConfig({
  plugins: [react(), tailwindcss()],
   base: '/',        // always use this, even in dev
  // server: { open: '/OneCart/' },
})

