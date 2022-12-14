import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { build } from 'vite'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

;(async () => {
  await build({
    build: {
      sourcemap: true,
      lib: {
        entry: resolve(__dirname, 'src/index.js'),
        name: 'ReactFlickityComponent',
        formats: ['es', 'umd'],
        fileName: (format) => `react-flickity-component.${format}.js`,
      },
      rollupOptions: {
        external: ['react', 'react-dom'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          },
        },
      },
    },
  })
})()
