// =============================================================================
// playwright.config.js — OrangeHRM Enterprise Playwright Framework
// Central configuration: browsers, reporters, timeouts, environment
// =============================================================================

import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Load .env.local first (developer overrides), then fall back to .env
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const BASE_URL = process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com';
const CI = process.env.CI === 'true';

export default defineConfig({

  testDir: './tests',
  testMatch: '**/*.spec.js',

  fullyParallel: true,
  forbidOnly: CI,
  retries: 1,
  workers: CI ? 2 : 2,
  timeout: 60000,
  outputDir: 'test-results',

  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['allure-playwright', {
      outputFolder: 'allure-results',
      environmentInfo: {
        App: 'OrangeHRM',
        URL: BASE_URL,
        Framework: 'Playwright + POM',
        Author: 'Arun N',
      },
    }],
  ],

  use: {
    baseURL: BASE_URL,
    headless: true,
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
    trace: 'on-first-retry',
    actionTimeout: 15000,
    navigationTimeout: 60000,
    ignoreHTTPSErrors: true,
    locale: 'en-US',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});