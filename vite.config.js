/* globals process */
import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import istanbul from 'vite-plugin-istanbul';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: () => 'bundle',
      },
    },
  },
  plugins: [
    vue(),
    istanbul({
      include: 'src/*',
      exclude: ['node_modules'],
      extension: ['.js', '.ts', '.vue'],
      /**
       * This allows us to omit the INSTRUMENT_BUILD env variable when running npm run build.
       * More details below.
       */
      requireEnv: false,
      /**
       * If forceBuildInstrument is set to true, this will add coverage instrumentation to the
       * built dist files and allow the reporter to collect coverage from the (built files).
       * However, when forceBuildInstrument is set to true, it will not collect coverage from
       * running against the dev server: e.g. npm run dev.
       *
       * To allow collecting coverage from running cypress against the dev server as well as the
       * preview server (built files), we use an env variable, INSTRUMENT_BUILD, to set
       * forceBuildInstrument to true when running against the preview server via the
       * pretest:dist:e2e npm script.
       *
       * When you run `npm run build`, the INSTRUMENT_BUILD env variable is omitted from the npm
       * script which will result in forceBuildInstrument being set to false, ensuring your
       * dist/built files for production do not include coverage instrumentation code.
       */
      forceBuildInstrument: Boolean(process.env.INSTRUMENT_BUILD)
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
