// =============================================================================
// tests/e2e/responsive-cross-browser.spec.js
// OrangeHRM — M8 Responsive & Cross-Browser Validation (7 Test Cases)
// =============================================================================

import { test, expect } from '@playwright/test';
import { VIEWPORTS } from '../../config/constants.js';

const BASE_URL = process.env.BASE_URL ||
  'https://opensource-demo.orangehrmlive.com';

test.describe('M8 — Responsive & Cross-Browser Validation', () => {

  // ── TC09: Desktop Viewport Layout ────────────────────────────────────────
  test('TC09 — Login page renders correctly on desktop viewport @smoke @sanity', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.DESKTOP);
    await page.goto(`${BASE_URL}/web/index.php/auth/login`);
    await page.waitForLoadState('domcontentloaded');
    await expect(page.getByPlaceholder('Username')).toBeVisible();
    await expect(page.getByPlaceholder('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  // ── TC10: Tablet Viewport Layout ──────────────────────────────────────────
  test('TC10 — Login page renders correctly on tablet viewport @high', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.TABLET);
    await page.goto(`${BASE_URL}/web/index.php/auth/login`);
    await page.waitForLoadState('domcontentloaded');
    await expect(page.getByPlaceholder('Username')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  // ── TC11: Mobile Viewport Layout ──────────────────────────────────────────
  test('TC11 — Login page renders correctly on mobile viewport @high', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.MOBILE);
    await page.goto(`${BASE_URL}/web/index.php/auth/login`);
    await page.waitForLoadState('domcontentloaded');
    await expect(page.getByPlaceholder('Username')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  // ── TC12: Page Title Consistent Across Viewports ──────────────────────────
  test('TC12 — OrangeHRM page title consistent across viewport sizes @sanity', async ({ page }) => {
    for (const [name, viewport] of Object.entries(VIEWPORTS)) {
      await page.setViewportSize(viewport);
      await page.goto(`${BASE_URL}/web/index.php/auth/login`);
      await page.waitForLoadState('domcontentloaded');
      const title = await page.title();
      expect(title).toContain('OrangeHRM');
    }
  });

  // ── TC13: Login Form Functional on Mobile ─────────────────────────────────
  test('TC13 — Login form is functional on mobile viewport @critical', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.MOBILE);
    await page.goto(`${BASE_URL}/web/index.php/auth/login`);
    await page.waitForLoadState('domcontentloaded');
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL('**/dashboard/**', { timeout: 30000 });
    expect(page.url()).toContain('dashboard');
  });

  // ── TC14: Dashboard Accessible on Tablet ──────────────────────────────────
  test('TC14 — Dashboard is accessible on tablet viewport @high', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.TABLET);
    await page.goto(`${BASE_URL}/web/index.php/auth/login`);
    await page.waitForLoadState('domcontentloaded');
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL('**/dashboard/**', { timeout: 30000 });
    await expect(page.locator('.oxd-topbar')).toBeVisible();
  });

  // ── TC15: Cross-Browser URL Consistency ───────────────────────────────────
  test('TC15 — OrangeHRM login URL is consistent across browsers @smoke @critical', async ({ page }) => {
    await page.goto(`${BASE_URL}/web/index.php/auth/login`);
    await page.waitForLoadState('domcontentloaded');
    expect(page.url()).toContain('auth/login');
    const title = await page.title();
    expect(title).toContain('OrangeHRM');
  });

});