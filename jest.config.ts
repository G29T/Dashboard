module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom', 
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', 
    },
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    testPathIgnorePatterns: ['/node_modules/', '/build/'],
    // setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};
  