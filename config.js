import allureWriter from '@shelex/cypress-allure-plugin/writer'

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureWriter(on, config)
      return config
    },
  },
})
