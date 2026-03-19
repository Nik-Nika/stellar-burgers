import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|png|svg|jpg|jpeg|gif)$': '<rootDir>/__mocks__/fileMock.js',
    '^@pages$': '<rootDir>/src/pages/index.ts',
    '^@components$': '<rootDir>/src/components/index.ts',
    '^@ui$': '<rootDir>/src/components/ui/index.ts',
    '^@ui-pages$': '<rootDir>/src/components/ui/pages/index.ts',
    '^@utils-types$': '<rootDir>/src/utils/types.ts',
    '^@api$': '<rootDir>/src/utils/burger-api.ts',
    '^@slices$': '<rootDir>/src/services/slices/index.ts',
    '^@selectors$': '<rootDir>/src/services/selectors/index.ts'
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: { jsx: 'react-jsx' } }]
  }
};

export default config;
