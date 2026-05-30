// =============================================================================
// tests/e2e/dashboard.spec.js
// OrangeHRM — M2 Dashboard Validation Test Suite (15 Test Cases)
// =============================================================================

import { expect } from '@playwright/test';
import { test } from '../../fixtures/index.js';
import { URLS, VIEWPORTS } from '../../config/constants.js';

test.describe('M2 — Dashboard Validation', () => {

  // All tests use authenticatedPage fixture — login handled automatically
  test.use({ });

  // ── TC01: Dashboard URL ────────────────────────────────────────────────────
  test('TC01 — Dashboard URL is correct after login @smoke @sanity', async ({ authenticatedPage, page }) => {
    await expect(page).toHaveURL(/dashboard/);
  });

  // ── TC02: Dashboard Page Title ─────────────────────────────────────────────
  test('TC02 — Dashboard page has correct browser title @sanity', async ({ authenticatedPage, page }) => {
    const title = await authenticatedPage.getTitle();
    expect(title).toContain('OrangeHRM');
  });

  // ── TC03: Sidebar is Visible ───────────────────────────────────────────────
  test('TC03 — Sidebar navigation is visible on dashboard @smoke', async ({ authenticatedPage }) => {
    const isVisible = await authenticatedPage.isSidebarVisible();
    expect(isVisible).toBeTruthy();
  });

  // ── TC04: Sidebar Contains Key Menu Items ─────────────────────────────────
  test('TC04 — Sidebar contains Admin, PIM, Leave and Recruitment links @critical', async ({ authenticatedPage }) => {
    const items = await authenticatedPage.getSidebarMenuItems();
    const itemsText = items.join(' ');
    expect(itemsText).toContain('Admin');
    expect(itemsText).toContain('PIM');
    expect(itemsText).toContain('Leave');
    expect(itemsText).toContain('Recruitment');
  });

  // ── TC05: Dashboard Widgets Loaded ────────────────────────────────────────
  test('TC05 — Dashboard widgets are loaded and visible @critical', async ({ authenticatedPage }) => {
    const isLoaded = await authenticatedPage.isDashboardLoaded();
    expect(isLoaded).toBeTruthy();
  });

  // ── TC06: Dashboard Grid Has Multiple Items ────────────────────────────────
  test('TC06 — Dashboard displays multiple widget sections @critical', async ({ authenticatedPage }) => {
    const count = await authenticatedPage.getDashboardGridCount();
    expect(count).toBeGreaterThan(2);
  });

  // ── TC07: Quick Launch Section ────────────────────────────────────────────
  test('TC07 — Quick Launch section is present on dashboard @high', async ({ authenticatedPage, page }) => {
  const quickLaunch = page.locator('.oxd-grid-item')
    .filter({ hasText: 'Quick Launch' });
  await expect(quickLaunch).toBeVisible();
  });

  // ── TC08: Logged-In Username Visible ──────────────────────────────────────
  test('TC08 — Logged-in username is visible in header @smoke', async ({ authenticatedPage }) => {
    const username = await authenticatedPage.getLoggedInUsername();
    expect(username.length).toBeGreaterThan(0);
  });

  // ── TC09: User Dropdown Toggle ────────────────────────────────────────────
  test('TC09 — User dropdown opens on click @high', async ({ authenticatedPage, page }) => {
    await authenticatedPage.userDropdown.click();
    await expect(page.getByRole('menuitem', { name: 'Logout' })).toBeVisible();
  });

  // ── TC10: Navigate to Admin from Sidebar ──────────────────────────────────
  test('TC10 — Clicking Admin in sidebar navigates to Admin module @critical', async ({ authenticatedPage, page }) => {
    await authenticatedPage.clickSidebarItem('Admin');
    await expect(page).toHaveURL(/admin/);
  });

  // ── TC11: Navigate to PIM from Sidebar ────────────────────────────────────
  test('TC11 — Clicking PIM in sidebar navigates to Employee List @critical', async ({ authenticatedPage, page }) => {
    await authenticatedPage.clickSidebarItem('PIM');
    await expect(page).toHaveURL(/pim/);
  });

  // ── TC12: Navigate to Leave from Sidebar ──────────────────────────────────
  test('TC12 — Clicking Leave in sidebar navigates to Leave module @critical', async ({ authenticatedPage, page }) => {
    await authenticatedPage.clickSidebarItem('Leave');
    await expect(page).toHaveURL(/leave/);
  });

  // ── TC13: Navigate Back to Dashboard ──────────────────────────────────────
  test('TC13 — Clicking Dashboard in sidebar returns to dashboard @high', async ({ authenticatedPage, page }) => {
    await authenticatedPage.clickSidebarItem('Admin');
    await authenticatedPage.clickSidebarItem('Dashboard');
    await expect(page).toHaveURL(/dashboard/);
  });

  // ── TC14: Dashboard Responsive — Tablet Viewport ──────────────────────────
  test('TC14 — Dashboard topbar visible on tablet viewport @high', async ({ authenticatedPage, page }) => {
  await authenticatedPage.setViewport(
    VIEWPORTS.TABLET.width,
    VIEWPORTS.TABLET.height
  );
  await expect(page.locator('.oxd-topbar')).toBeVisible();
  });

  // ── TC15: Dashboard Responsive — Mobile Viewport ──────────────────────────
  test('TC15 — Dashboard header visible on mobile viewport @high', async ({ authenticatedPage, page }) => {
  await authenticatedPage.setViewport(
    VIEWPORTS.MOBILE.width,
    VIEWPORTS.MOBILE.height
  );
  // Wait for page to settle after viewport change on WebKit
  await page.waitForLoadState('domcontentloaded');
  await expect(page.locator('.oxd-topbar')).toBeVisible({ timeout: 15000 });
  });

});