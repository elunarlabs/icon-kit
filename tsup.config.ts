import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  minify: false,
  external: [
    'react',
    'react-dom',
    'framer-motion',
    'lucide-react',
    '@lucide/lab',
    '@fortawesome/react-fontawesome',
    '@fortawesome/free-brands-svg-icons'
  ]
});
