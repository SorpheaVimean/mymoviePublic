import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@material-tailwind/react/utils/withMT': '@material-tailwind/react/utils/withMT.ts',
    },
  },
})
// vite.config.js
// import { defineConfig } from 'vite';

// export default defineConfig({
//   plugins: [],
//   resolve: {
//     alias: {
//       '@material-tailwind/react/utils/withMT': '@material-tailwind/react/utils/withMT.ts',
//     },
//   },
// });
