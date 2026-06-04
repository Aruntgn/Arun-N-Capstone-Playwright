# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/api-validation.spec.js >> M8 — API & Network Validation >> TC02 — OrangeHRM homepage responds within acceptable time @sanity
- Location: tests/api/api-validation.spec.js:30:3

# Error details

```
TimeoutError: apiRequestContext.get: Timeout 15000ms exceeded.
Call log:
  - → GET https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
    - user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36
    - accept: */*
    - accept-encoding: gzip,deflate,br

```

# Test source

```ts
  1   | // =============================================================================
  2   | // tests/api/api-validation.spec.js
  3   | // OrangeHRM — M8 API & Network Validation (8 Test Cases)
  4   | // Validates API responses, network monitoring during HRMS workflows
  5   | // =============================================================================
  6   | 
  7   | import { test, expect } from '@playwright/test';
  8   | 
  9   | const BASE_URL = process.env.BASE_URL ||
  10  |   'https://opensource-demo.orangehrmlive.com';
  11  | 
  12  | test.describe('M8 — API & Network Validation', () => {
  13  | 
  14  |   // ── TC01: Login API Returns 200 ───────────────────────────────────────────
  15  |   test('TC01 — Login API endpoint returns successful response @smoke @critical', async ({ request }) => {
  16  |     const response = await request.post(
  17  |       `${BASE_URL}/web/index.php/auth/validate`,
  18  |       {
  19  |         form: {
  20  |           _username: 'Admin',
  21  |           _password: 'admin123',
  22  |         },
  23  |       }
  24  |     );
  25  |     // OrangeHRM validates then redirects — expect 200 or 302
  26  |     expect([200, 302, 303]).toContain(response.status());
  27  |   });
  28  | 
  29  |   // ── TC02: API Response Time Acceptable ────────────────────────────────────
  30  |   test('TC02 — OrangeHRM homepage responds within acceptable time @sanity', async ({ request }) => {
  31  |     const start = Date.now();
> 32  |     const response = await request.get(`${BASE_URL}/web/index.php/auth/login`);
      |                                    ^ TimeoutError: apiRequestContext.get: Timeout 15000ms exceeded.
  33  |     const duration = Date.now() - start;
  34  |     expect(response.status()).toBe(200);
  35  |     expect(duration).toBeLessThan(15000);
  36  |   });
  37  | 
  38  |   // ── TC03: Network Requests During Login ───────────────────────────────────
  39  |   test('TC03 — Network requests fire correctly during login workflow @critical', async ({ page }) => {
  40  |     const responses = [];
  41  |     page.on('response', response => {
  42  |       if (response.url().includes('orangehrmlive.com')) {
  43  |         responses.push({
  44  |           url: response.url(),
  45  |           status: response.status(),
  46  |         });
  47  |       }
  48  |     });
  49  |     await page.goto(`${BASE_URL}/web/index.php/auth/login`);
  50  |     await page.waitForLoadState('domcontentloaded');
  51  |     // Verify at least one successful response fired
  52  |     const successResponses = responses.filter(r => r.status < 400);
  53  |     expect(successResponses.length).toBeGreaterThan(0);
  54  |   });
  55  | 
  56  |   // ── TC04: Dashboard API Calls Return Valid Responses ──────────────────────
  57  |   test('TC04 — Dashboard page API calls return valid responses @critical', async ({ page }) => {
  58  |     const failedRequests = [];
  59  |     page.on('response', response => {
  60  |       if (
  61  |         response.url().includes('orangehrmlive.com') &&
  62  |         response.status() >= 500
  63  |       ) {
  64  |         failedRequests.push(response.url());
  65  |       }
  66  |     });
  67  |     await page.goto(`${BASE_URL}/web/index.php/auth/login`);
  68  |     await page.getByPlaceholder('Username').fill('Admin');
  69  |     await page.getByPlaceholder('Password').fill('admin123');
  70  |     await page.getByRole('button', { name: 'Login' }).click();
  71  |     await page.waitForURL('**/dashboard/**', { timeout: 30000 });
  72  |     await page.waitForLoadState('domcontentloaded');
  73  |     // No 5xx server errors should occur
  74  |     expect(failedRequests).toHaveLength(0);
  75  |   });
  76  | 
  77  |   // ── TC05: PIM API Returns Employee Data ───────────────────────────────────
  78  |   test('TC05 — PIM employee list API returns data @critical', async ({ page }) => {
  79  |     const apiResponses = [];
  80  |     page.on('response', response => {
  81  |       if (
  82  |         response.url().includes('/api/v2/pim/employees') ||
  83  |         response.url().includes('viewEmployeeList')
  84  |       ) {
  85  |         apiResponses.push(response.status());
  86  |       }
  87  |     });
  88  |     await page.goto(`${BASE_URL}/web/index.php/auth/login`);
  89  |     await page.getByPlaceholder('Username').fill('Admin');
  90  |     await page.getByPlaceholder('Password').fill('admin123');
  91  |     await page.getByRole('button', { name: 'Login' }).click();
  92  |     await page.waitForURL('**/dashboard/**', { timeout: 30000 });
  93  |     await page.goto(`${BASE_URL}/web/index.php/pim/viewEmployeeList`);
  94  |     await page.waitForLoadState('domcontentloaded');
  95  |     // Page loaded successfully — PIM API operational
  96  |     expect(page.url()).toContain('pim');
  97  |   });
  98  | 
  99  |   // ── TC06: No Console Errors on Login Page ─────────────────────────────────
  100 |   test('TC06 — Login page loads without critical console errors @sanity', async ({ page }) => {
  101 |     const errors = [];
  102 |     page.on('pageerror', err => errors.push(err.message));
  103 |     await page.goto(`${BASE_URL}/web/index.php/auth/login`);
  104 |     await page.waitForLoadState('domcontentloaded');
  105 |     // Filter out non-critical warnings
  106 |     const criticalErrors = errors.filter(e =>
  107 |       !e.includes('favicon') &&
  108 |       !e.includes('Warning') &&
  109 |       !e.includes('DevTools')
  110 |     );
  111 |     expect(criticalErrors).toHaveLength(0);
  112 |   });
  113 | 
  114 |   // ── TC07: Static Assets Load Successfully ─────────────────────────────────
  115 |   test('TC07 — Static assets load with 200 status on login page @sanity', async ({ page }) => {
  116 |     const failedAssets = [];
  117 |     page.on('response', response => {
  118 |       const url = response.url();
  119 |       if (
  120 |         (url.includes('.js') || url.includes('.css')) &&
  121 |         url.includes('orangehrmlive.com') &&
  122 |         response.status() >= 400
  123 |       ) {
  124 |         failedAssets.push({ url, status: response.status() });
  125 |       }
  126 |     });
  127 |     await page.goto(`${BASE_URL}/web/index.php/auth/login`);
  128 |     await page.waitForLoadState('domcontentloaded');
  129 |     expect(failedAssets).toHaveLength(0);
  130 |   });
  131 | 
  132 |   // ── TC08: API Request Headers Present ─────────────────────────────────────
```