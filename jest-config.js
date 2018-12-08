module.exports = {
    preset: 'ts-jest',
    collectCoverageFrom: [
        'src/**/*.ts',
    ],
    coveragePathIgnorePatterns: [
        '\\.mock\\.ts$',
        '\\.typedef\\.ts$',
        '\\.d\\.ts$',
    ],
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100,
        },
    },
    setupTestFrameworkScriptFile: '<rootDir>/jest-setup.js',
    testPathIgnorePatterns: ['dist'],
};
