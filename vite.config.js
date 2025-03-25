import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   // Pour le AppRouter, on s'assure que de redéfinir le fichier racine
})


