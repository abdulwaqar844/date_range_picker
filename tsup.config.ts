import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    style: 'src/styles/index.css',
  },
  format: ['cjs', 'esm'],
  dts: { entry: 'src/index.ts' },
  clean: true,
  sourcemap: true,
  minify: false,
  external: ['react', 'react-dom'],
});
