import { build } from 'vite'

;(async () => {
  await build({
    base: '/react-flickity-component/',
    build: {
      outDir: 'docs',
    },
  })
})()
