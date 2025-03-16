import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  plugins: [react(), tailwindcss()],
  theme:{
    extend:{
      fontFamily:{
        sans: ['Josefin Sans', 'sans-serif'],
        belanosima: ['Belanosima', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      }
    }
  },
  server: {
    host: true, // Allows access from network
    port: 5174, // Use the same port
  },
})
