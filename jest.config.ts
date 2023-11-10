import type {Config} from 'jest';
import functionsPackageJson from './packages/functions/package.json';

const config: Config = {
  projects: [
    {
      displayName: functionsPackageJson.name,
      preset: 'ts-jest/presets/js-with-ts',
      testMatch: ['<rootDir>/packages/functions/tests/**/*.test.ts']
    }
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  verbose: true
};

export default config;
