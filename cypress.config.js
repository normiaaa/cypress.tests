const { defineConfig } = require('cypress');

module.exports = defineConfig({
	e2e: {
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
	},
	defaultCommandTimeout: 10000,
	chromeWebSecurity: false,
	reporter: 'junit',
	reporterOptions: {
		mochaFile: 'results/my-test-output.xml',
		toConsole: true,
	},
});
