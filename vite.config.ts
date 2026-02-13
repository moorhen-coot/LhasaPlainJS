import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    dts({
      include: ['src'],
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: 'lhasa-ligand-builder-plainjs',
    },
    rollupOptions: {
      external: [],
    },
    chunkSizeWarningLimit: 3000,
  },
})
