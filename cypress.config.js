const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    video: false,
    setupNodeEvents(on, config) {
      require("@cypress/code-coverage/task")(on, config);
      // `on` is used to hook into various events Cypress emits
      // `config` is the resolved Cypress config
      return config;
    },
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:4173'
  },
  component: {
    video: false,
    setupNodeEvents(on, config) {
      require("@cypress/code-coverage/task")(on, config);
      // `on` is used to hook into various events Cypress emits
      // `config` is the resolved Cypress config
      return config;
    },
    specPattern: 'src/**/__tests__/*.{cy,spec}.{js,ts,jsx,tsx}',
    devServer: {
      framework: 'vue',
      bundler: 'vite'
    }
  }
})
