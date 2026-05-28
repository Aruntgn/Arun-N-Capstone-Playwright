// =============================================================================
// tests/e2e/admin-user-management.spec.js
// OrangeHRM — M6 Admin & User Management Test Suite (15 Test Cases)
// =============================================================================

import { expect } from '@playwright/test';
import { test } from '../../fixtures/index.js';
import { AdminPage } from '../../pages/AdminPage.js';
import { URLS } from '../../config/constants.js';
import adminData from '../../test-data/admin.json' assert { type: 'json' };

test.describe('M6 — Admin & User Management', () => {

  let adminPage;

  test.beforeEach(async ({ authenticatedPage, page }) => {
    adminPage = new AdminPage(page);
    await adminPage.navigateToAdmin();
  });

  // ── TC01: Admin Module Loads ───────────────────────────────────────────────
  test('TC01 — Admin module loads with user list @smoke @critical', async ({ page }) => {
    await expect(page).toHaveURL(/admin/);
    const isVisible = await adminPage.isUserTableVisible();
    expect(isVisible).toBeTruthy();
  });

  // ── TC02: User Table Has Records ──────────────────────────────────────────
  test('TC02 — User list table displays records @critical', async () => {
    const rowCount = await adminPage.getUserTableRowCount();
    expect(rowCount).toBeGreaterThan(0);
  });

  // ── TC03: Add Button Visible ──────────────────────────────────────────────
  test('TC03 — Add button is visible on user list @sanity', async () => {
    const isVisible = await adminPage.isVisible(adminPage.addButton);
    expect(isVisible).toBeTruthy();
  });

  // ── TC04: Search Button Visible ───────────────────────────────────────────
  test('TC04 — Search button is visible on user list @sanity', async () => {
    const isVisible = await adminPage.isVisible(adminPage.searchButton);
    expect(isVisible).toBeTruthy();
  });

  // ── TC05: Reset Button Visible ────────────────────────────────────────────
  test('TC05 — Reset button is visible on user list @sanity', async () => {
    const isVisible = await adminPage.isVisible(adminPage.resetButton);
    expect(isVisible).toBeTruthy();
  });

  // ── TC06: Search by Username ──────────────────────────────────────────────
  test('TC06 — Search by username returns matching records @critical', async () => {
    await adminPage.searchByUsername(adminData.searchUser.username);
    const rowCount = await adminPage.getUserTableRowCount();
    expect(rowCount).toBeGreaterThan(0);
  });

  // ── TC07: Search Returns Results ──────────────────────────────────────────
  test('TC07 — Clicking Search returns user records @critical', async () => {
    await adminPage.clickSearch();
    const rowCount = await adminPage.getUserTableRowCount();
    expect(rowCount).toBeGreaterThan(0);
  });

  // ── TC08: Reset Restores List ─────────────────────────────────────────────
  test('TC08 — Reset button restores default user list @high', async () => {
    await adminPage.searchByUsername('nonexistentuser123');
    await adminPage.clickReset();
    const isVisible = await adminPage.isUserTableVisible();
    expect(isVisible).toBeTruthy();
  });

  // ── TC09: Add User Form Loads ─────────────────────────────────────────────
  test('TC09 — Clicking Add opens Add User form @critical', async ({ page }) => {
    await adminPage.clickAddUser();
    await expect(page).toHaveURL(/saveSystemUser/);
    const isVisible = await adminPage.isAddFormVisible();
    expect(isVisible).toBeTruthy();
  });

  // ── TC10: Add User Form Validation ────────────────────────────────────────
  test('TC10 — Submitting empty Add User form shows validation @critical', async ({ page }) => {
    await adminPage.clickAddUser();
    await adminPage.click(adminPage.saveButton);
    const errors = page.locator('.oxd-input-field-error-message');
    await expect(errors.first()).toBeVisible({ timeout: 10000 });
  });

  // ── TC11: Cancel Add User ─────────────────────────────────────────────────
  test('TC11 — Cancel on Add User form returns to user list @high', async ({ page }) => {
    await adminPage.clickAddUser();
    await adminPage.click(adminPage.cancelButton);
    await expect(page).toHaveURL(/viewSystemUsers/);
  });

  // ── TC12: Navigate to Job Titles ──────────────────────────────────────────
  test('TC12 — Job Titles page loads correctly @high', async ({ page }) => {
    await adminPage.navigateToJobTitles();
    await expect(page).toHaveURL(/viewJobTitleList/);
  });

  // ── TC13: Navigate to Organization Structure ──────────────────────────────
  test('TC13 — Organization General Information page loads @high', async ({ page }) => {
    await adminPage.navigateToOrganizationStructure();
    await expect(page).toHaveURL(/viewOrganizationGeneralInformation/);
  });

  // ── TC14: Admin URL Validation ────────────────────────────────────────────
  test('TC14 — Admin module URL is correct @sanity', async ({ page }) => {
    expect(page.url()).toContain('admin');
  });

  // ── TC15: Admin Page Title ────────────────────────────────────────────────
  test('TC15 — Admin page has correct browser title @sanity', async ({ page }) => {
    const title = await adminPage.getTitle();
    expect(title).toContain('OrangeHRM');
  });

});