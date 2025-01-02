import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig(({ command, mode }) => {
  const base = {
    plugins: [
      react(),
      viteCommonjs(),
    ],
    test: {
      environment: 'jsdom',
    },
  }

  if (command === 'build') {
    if (mode === 'docs') {
      return {
        ...base,
        base: '/react-flickity-component/',
        root: resolve(__dirname, 'examples'),
        build: {
          outDir: '../docs',
          emptyOutDir: true,
        },
      }
    } else {
      return {
        ...base,
        build: {
          sourcemap: true,
          lib: {
            entry: resolve(__dirname, 'src/index.js'),
            name: 'ReactFlickityComponent',
            formats: ['es', 'umd'],
            fileName: (format) => `react-flickity-component.${format}.js`,
          },
          rollupOptions: {
            external: ['react', 'react-dom', 'imagesloaded', 'prop-types', 'flickity'],        
            output: {
              globals: {
                react: 'React',
                'react-dom': 'ReactDOM',
                imagesloaded: 'imagesloaded',
                'prop-types': 'PropTypes',
              },
            },
          },
        },
      }
    }
  }

  return base
})
