module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts', '**/**/*.spec.ts'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text-summary', 'lcov', 'text', 'json-summary'],
  setupFiles: ['reflect-metadata'],
  collectCoverageFrom: [
    'src/core/use-cases/**/*.ts',
    '!src/core/use-cases/**/*Input.ts',
    '!src/core/use-cases/**/*Output.ts',
    '!src/core/use-cases/**/index.ts',
  ],
};
