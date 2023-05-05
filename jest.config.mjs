// jest.config.mjs
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
	// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
	dir: './'
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
	// Add more setup options before each test is run
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	moduleNameMapper: {
		// Handle module aliases (this will be automatically configured for you soon)
		'^@api/(.*)$': '<rootDir>/src/api/$1',
		'^@components/(.*)$': '<rootDir>/src/components/$1',
		'^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
		'^@interfaces/(.*)$': '<rootDir>/src/interfaces/$1',
		'^@pages/(.*)$': '<rootDir>/src/pages/$1',
		'^@providers/(.*)$': '<rootDir>/src/providers/$1',
		'^@routes/(.*)$': '<rootDir>/src/routes/$1',
		'^@store/(.*)$': '<rootDir>/src/store/$1',
		'^@styles/(.*)$': '<rootDir>/src/styles/$1',
		'^@utils/(.*)$': '<rootDir>/src/utils/$1'
	},
	testEnvironment: 'jest-environment-jsdom'
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
