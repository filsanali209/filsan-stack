const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './test/playwright',
  use: {
    baseURL: 'https://filsan-alisamatar-bakehouse.cta-training.academy',
    headless: false
  }
});
