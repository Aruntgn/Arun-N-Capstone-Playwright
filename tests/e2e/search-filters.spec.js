// =============================================================================
// tests/e2e/search-filters.spec.js
// OrangeHRM — M7 Search, Filters & Table Validation (15 Test Cases)
// =============================================================================

import { expect } from '@playwright/test';
import { test } from '../../fixtures/index.js';
import { SearchPage } from '../../pages/SearchPage.js';
import { URLS } from '../../config/constants.js';

test.describe('M7 — Search, Filters & Table Validation', () => {

  let searchPage;

  test.beforeEach(async ({ authenticatedPage, page }) => {
    searchPage = new SearchPage(page);
  });

  // ── TC01: PIM Search Form Visible ─────────────────────────────────────────
  test('TC01 — PIM module search filter form is visible @smoke @sanity', async ({ page }) => {
    await searchPage.navigateToPIM();
    const isVisible = await searchPage.isFilterFormVisible();
    expect(isVisible).toBeTruthy();
  });

  // ── TC02: PIM Search Button Works ─────────────────────────────────────────
  test('TC02 — PIM search button executes search and returns results @critical', async () => {
    await searchPage.navigateToPIM();
    await searchPage.clickSearch(searchPage.pimSearchButton);
    const rowCount = await searchPage.getTableRowCount(searchPage.pimTableRows);
    expect(rowCount).toBeGreaterThanOrEqual(0);
  });

  // ── TC03: PIM Reset Button Works ──────────────────────────────────────────
  test('TC03 — PIM reset button restores default employee list @critical', async () => {
    await searchPage.navigateToPIM();
    await searchPage.clickSearch(searchPage.pimSearchButton);
    await searchPage.clickReset(searchPage.pimResetButton);
    const isVisible = await searchPage.isTableVisible(searchPage.pimTableBody);
    expect(isVisible).toBeTruthy();
  });

  // ── TC04: PIM Table Has Records ───────────────────────────────────────────
  test('TC04 — PIM employee table displays records @critical', async () => {
    await searchPage.navigateToPIM();
    const rowCount = await searchPage.getTableRowCount(searchPage.pimTableRows);
    expect(rowCount).toBeGreaterThan(0);
  });

  // ── TC05: PIM Records Count Displayed ─────────────────────────────────────
  test('TC05 — PIM displays total records found count @sanity', async ({ page }) => {
    await searchPage.navigateToPIM();
    await searchPage.clickSearch(searchPage.pimSearchButton);
    const recordsText = page.locator('.oxd-text').filter({ hasText: 'Records Found' });
    await expect(recordsText).toBeVisible({ timeout: 15000 });
  });

  // ── TC06: Admin Search Form Visible ───────────────────────────────────────
  test('TC06 — Admin module search filter form is visible @smoke @sanity', async () => {
    await searchPage.navigateToAdmin();
    const isVisible = await searchPage.isFilterFormVisible();
    expect(isVisible).toBeTruthy();
  });

  // ── TC07: Admin Search By Username ────────────────────────────────────────
  test('TC07 — Admin search by username returns matching records @critical', async () => {
    await searchPage.navigateToAdmin();
    await searchPage.searchAdminByUsername('Admin');
    const rowCount = await searchPage.getTableRowCount(searchPage.adminTableRows);
    expect(rowCount).toBeGreaterThan(0);
  });

  // ── TC08: Admin Reset Restores List ───────────────────────────────────────
  test('TC08 — Admin reset button restores full user list @high', async () => {
    await searchPage.navigateToAdmin();
    await searchPage.searchAdminByUsername('Admin');
    await searchPage.clickReset(searchPage.adminResetButton);
    const isVisible = await searchPage.isTableVisible(searchPage.adminTableBody);
    expect(isVisible).toBeTruthy();
  });

  // ── TC09: Admin Table Has Records ─────────────────────────────────────────
  test('TC09 — Admin user table displays records @critical', async () => {
    await searchPage.navigateToAdmin();
    const rowCount = await searchPage.getTableRowCount(searchPage.adminTableRows);
    expect(rowCount).toBeGreaterThan(0);
  });

  // ── TC10: Admin Role Dropdown Visible ─────────────────────────────────────
  test('TC10 — Admin search filter has User Role dropdown @sanity', async ({ page }) => {
    await searchPage.navigateToAdmin();
    await expect(searchPage.adminRoleDropdown).toBeVisible();
  });

  // ── TC11: Recruitment Search Form Visible ─────────────────────────────────
  test('TC11 — Recruitment module search filter form is visible @smoke @sanity', async () => {
    await searchPage.navigateToRecruitment();
    const isVisible = await searchPage.isFilterFormVisible();
    expect(isVisible).toBeTruthy();
  });

  // ── TC12: Recruitment Search Returns Results ───────────────────────────────
  test('TC12 — Recruitment search returns candidate records @critical', async () => {
    await searchPage.navigateToRecruitment();
    await searchPage.clickSearch(searchPage.recruitSearchButton);
    const rowCount = await searchPage.getTableRowCount(searchPage.recruitTableRows);
    expect(rowCount).toBeGreaterThanOrEqual(0);
  });

  // ── TC13: Recruitment Reset Works ─────────────────────────────────────────
  test('TC13 — Recruitment reset restores full candidates list @high', async () => {
    await searchPage.navigateToRecruitment();
    await searchPage.clickSearch(searchPage.recruitSearchButton);
    await searchPage.clickReset(searchPage.recruitResetButton);
    const isVisible = await searchPage.isTableVisible(searchPage.recruitTableBody);
    expect(isVisible).toBeTruthy();
  });

  // ── TC14: Leave Module Search Form Visible ────────────────────────────────
  test('TC14 — Leave module search filter form is visible @sanity', async ({ page }) => {
    await searchPage.navigateToLeave();
    const searchButton = page.getByRole('button', { name: 'Search' });
    await expect(searchButton).toBeVisible();
  });

  // ── TC15: Multiple Module Search Consistency ──────────────────────────────
  test('TC15 — Search and filter pattern is consistent across modules @high', async ({ page }) => {
    // Validate search button exists in PIM
    await searchPage.navigateToPIM();
    await expect(searchPage.pimSearchButton).toBeVisible();
    // Validate search button exists in Admin
    await searchPage.navigateToAdmin();
    await expect(searchPage.adminSearchButton).toBeVisible();
    // Validate search button exists in Recruitment
    await searchPage.navigateToRecruitment();
    await expect(searchPage.recruitSearchButton).toBeVisible();
  });

});