module.exports = {
  roots: [
    '<rootDir>/src',
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
  coverageReporters: [
    'json',
    'lcov',
    'text',
    'clover',
  ],
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
  preset: 'ts-jest',
}
