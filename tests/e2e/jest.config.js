module.exports = {
	...require( '@wordpress/scripts/config/jest-e2e.config' ),
	transformIgnorePatterns: ["/node_modules/"],
	setupFilesAfterEnv: [
		'<rootDir>/config/setup-test-framework.js',
		'@wordpress/jest-console',
		'expect-puppeteer',
	],
	testPathIgnorePatterns: [
		'/node_modules/',
	],
};
