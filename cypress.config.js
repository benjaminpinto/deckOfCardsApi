import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://deckofcardsapi.com/api',
    video: false,
    env: {
      requestMode: true,
    },
  },
})
