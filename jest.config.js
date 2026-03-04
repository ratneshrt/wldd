/** @type {import('jest').Config} */
export default {
  preset: "ts-jest/presets/default-esm",

  testEnvironment: "node",

  extensionsToTreatAsEsm: [".ts"],

  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        useESM: true
      }
    ]
  },

  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1"
  },

  testMatch: [
    "**/tests/**/*.test.ts"
  ],

  setupFilesAfterEnv: [
    "<rootDir>/tests/setup.ts"
  ],

  collectCoverage: true,

  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/server.ts"
  ]
}