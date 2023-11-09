import {defineConfig} from 'tsup';

export default defineConfig({
  entry: ['./src/index.ts'],
  // TODO: Get from `tsconfig.json`.
  target: 'esnext',
  format: 'esm',
  onSuccess: 'tsc --project ./tsconfig.build.json'
});
