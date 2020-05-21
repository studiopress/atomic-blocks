module.exports = {
	...require( '@wordpress/scripts/config/jest-e2e.config' ),
	transformIgnorePatterns: ["/node_modules/"],
	setupFilesAfterEnv: [
		'<rootDir>/config/setup-test-framework.js',
		'@wordpress/jest-console',
		'@wordpress/jest-puppeteer-axe',
		'expect-puppeteer',
	],
	testPathIgnorePatterns: [
		'/node_modules/',
	],
};
