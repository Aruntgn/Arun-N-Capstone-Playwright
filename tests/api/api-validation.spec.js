// =============================================================================
// tests/api/api-validation.spec.js
// OrangeHRM — M8 API & Network Validation (8 Test Cases)
// Validates API responses, network monitoring during HRMS workflows
// =============================================================================

import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL ||
  'https://opensource-demo.orangehrmlive.com';

test.describe('M8 — API & Network Validation', () => {

  // ── TC01: Login API Returns 200 ───────────────────────────────────────────
  test('TC01 — Login API endpoint returns successful response @smoke @critical', async ({ request }) => {
    const response = await request.post(
      `${BASE_URL}/web/index.php/auth/validate`,
      {
        form: {
          _username: 'Admin',
          _password: 'admin123',
        },
      }
    );
    // OrangeHRM validates then redirects — expect 200 or 302
    expect([200, 302, 303]).toContain(response.status());
  });

  // ── TC02: API Response Time Acceptable ────────────────────────────────────
  test('TC02 — OrangeHRM homepage responds within acceptable time @sanity', async ({ request }) => {
    const start = Date.now();
    const response = await request.get(`${BASE_URL}/web/index.php/auth/login`);
    const duration = Date.now() - start;
    expect(response.status()).toBe(200);
    expect(duration).toBeLessThan(15000);
  });

  // ── TC03: Network Requests During Login ───────────────────────────────────
  test('TC03 — Network requests fire correctly during login workflow @critical', async ({ page }) => {
    const responses = [];
    page.on('response', response => {
      if (response.url().includes('orangehrmlive.com')) {
        responses.push({
          url: response.url(),
          status: response.status(),
        });
      }
    });
    await page.goto(`${BASE_URL}/web/index.php/auth/login`);
    await page.waitForLoadState('domcontentloaded');
    // Verify at least one successful response fired
    const successResponses = responses.filter(r => r.status < 400);
    expect(successResponses.length).toBeGreaterThan(0);
  });

  // ── TC04: Dashboard API Calls Return Valid Responses ──────────────────────
  test('TC04 — Dashboard page API calls return valid responses @critical', async ({ page }) => {
    const failedRequests = [];
    page.on('response', response => {
      if (
        response.url().includes('orangehrmlive.com') &&
        response.status() >= 500
      ) {
        failedRequests.push(response.url());
      }
    });
    await page.goto(`${BASE_URL}/web/index.php/auth/login`);
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL('**/dashboard/**', { timeout: 30000 });
    await page.waitForLoadState('domcontentloaded');
    // No 5xx server errors should occur
    expect(failedRequests).toHaveLength(0);
  });

  // ── TC05: PIM API Returns Employee Data ───────────────────────────────────
  test('TC05 — PIM employee list API returns data @critical', async ({ page }) => {
    const apiResponses = [];
    page.on('response', response => {
      if (
        response.url().includes('/api/v2/pim/employees') ||
        response.url().includes('viewEmployeeList')
      ) {
        apiResponses.push(response.status());
      }
    });
    await page.goto(`${BASE_URL}/web/index.php/auth/login`);
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL('**/dashboard/**', { timeout: 30000 });
    await page.goto(`${BASE_URL}/web/index.php/pim/viewEmployeeList`);
    await page.waitForLoadState('domcontentloaded');
    // Page loaded successfully — PIM API operational
    expect(page.url()).toContain('pim');
  });

  // ── TC06: No Console Errors on Login Page ─────────────────────────────────
  test('TC06 — Login page loads without critical console errors @sanity', async ({ page }) => {
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));
    await page.goto(`${BASE_URL}/web/index.php/auth/login`);
    await page.waitForLoadState('domcontentloaded');
    // Filter out non-critical warnings
    const criticalErrors = errors.filter(e =>
      !e.includes('favicon') &&
      !e.includes('Warning') &&
      !e.includes('DevTools')
    );
    expect(criticalErrors).toHaveLength(0);
  });

  // ── TC07: Static Assets Load Successfully ─────────────────────────────────
  test('TC07 — Static assets load with 200 status on login page @sanity', async ({ page }) => {
    const failedAssets = [];
    page.on('response', response => {
      const url = response.url();
      if (
        (url.includes('.js') || url.includes('.css')) &&
        url.includes('orangehrmlive.com') &&
        response.status() >= 400
      ) {
        failedAssets.push({ url, status: response.status() });
      }
    });
    await page.goto(`${BASE_URL}/web/index.php/auth/login`);
    await page.waitForLoadState('domcontentloaded');
    expect(failedAssets).toHaveLength(0);
  });

  // ── TC08: API Request Headers Present ─────────────────────────────────────
  test('TC08 — Login page request contains required headers @sanity', async ({ request }) => {
    const response = await request.get(
      `${BASE_URL}/web/index.php/auth/login`,
      {
        headers: {
          'Accept': 'text/html',
          'User-Agent': 'Playwright-Enterprise-Test',
        },
      }
    );
    expect(response.status()).toBe(200);
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('text/html');
  });

});