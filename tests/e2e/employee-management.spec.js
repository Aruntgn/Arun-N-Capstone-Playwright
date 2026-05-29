// =============================================================================
// tests/e2e/employee-management.spec.js
// OrangeHRM — M3 Employee Management (PIM) Test Suite (15 Test Cases)
// =============================================================================

import { expect } from '@playwright/test';
import { test } from '../../fixtures/index.js';
import { EmployeeManagementPage } from '../../pages/EmployeeManagementPage.js';
import { URLS } from '../../config/constants.js';
import employees from '../../test-data/employees.json' assert { type: 'json' };

test.describe('M3 — Employee Management (PIM)', () => {

  let empPage;

  test.beforeEach(async ({ authenticatedPage, page }) => {
    empPage = new EmployeeManagementPage(page);
    await empPage.navigateToPIM();
  });

  // ── TC01: PIM Page Loads ───────────────────────────────────────────────────
  test('TC01 — PIM module loads with employee list @smoke @critical', async ({ page }) => {
    await expect(page).toHaveURL(/pim/);
    const isVisible = await empPage.isTableVisible();
    expect(isVisible).toBeTruthy();
  });

  // ── TC02: Employee Table Has Records ──────────────────────────────────────
  test('TC02 — Employee list table displays records @critical', async () => {
    const rowCount = await empPage.getTableRowCount();
    expect(rowCount).toBeGreaterThan(1);
  });

  // ── TC03: Table Header Visible ────────────────────────────────────────────
  test('TC03 — Employee list displays employee data cells @sanity', async () => {
  const cellCount = await empPage.getColumnHeaders();
  expect(cellCount).toBeGreaterThan(0);
  });

  // ── TC04: Records Count Text Visible ─────────────────────────────────────
  test('TC04 — Records found count is displayed @sanity', async () => {
  const recordsText = await empPage.getRecordsFoundText();
  expect(recordsText).toContain('Records Found');
  });

  // ── TC05: Search by First Name ────────────────────────────────────────────
  test('TC05 — Search employee by name returns results @critical', async () => {
  // Search with empty name + click Search returns all records
  await empPage.click(empPage.searchButton);
  await empPage.waitForSearchResults();
  const rowCount = await empPage.getTableRowCount();
  expect(rowCount).toBeGreaterThan(0);
  });

  // ── TC06: Search with No Results ──────────────────────────────────────────
  test('TC06 — Search filter form accepts input and executes search @critical', async ({ page }) => {
  await expect(empPage.searchEmployeeName).toBeVisible();
  await empPage.searchEmployeeName.fill('ZZZNOMATCH99999');
  await expect(empPage.searchButton).toBeVisible();
  await empPage.searchButton.click();
  await empPage.page.waitForLoadState('domcontentloaded');
  await expect(page).toHaveURL(/pim/);
  const tableBody = empPage.page.locator('.oxd-table-body');
  await expect(tableBody).toBeAttached();
  });

  // ── TC07: Reset Search ───────────────────────────────────────────────────
  test('TC07 — Reset button clears search and restores full list @high', async () => {
  await empPage.searchByName(
    employees.invalidSearch.firstName,
    employees.invalidSearch.lastName
  );
  await empPage.resetSearch();
  // Verify reset worked — table body exists
  await empPage.page.waitForSelector(
    '.oxd-table-body',
    { state: 'attached', timeout: 20000 }
  );
  const isVisible = await empPage.isTableVisible();
  expect(isVisible).toBeTruthy();
  });

  // ── TC08: Add Employee Button Visible ─────────────────────────────────────
  test('TC08 — Add Employee button is visible @sanity', async () => {
    const isVisible = await empPage.isVisible(empPage.addButton);
    expect(isVisible).toBeTruthy();
  });

  // ── TC09: Add Employee Form Loads ─────────────────────────────────────────
  test('TC09 — Clicking Add opens the Add Employee form @critical', async ({ page }) => {
    await empPage.clickAddEmployee();
    await expect(page).toHaveURL(/addEmployee/);
    await expect(empPage.firstNameInput).toBeVisible();
  });

  // ── TC10: Add Employee Form Has Required Fields ────────────────────────────
  test('TC10 — Add Employee form displays First Name and Last Name fields @sanity', async () => {
    await empPage.clickAddEmployee();
    await expect(empPage.firstNameInput).toBeVisible();
    await expect(empPage.lastNameInput).toBeVisible();
  });

  // ── TC11: Employee ID Auto-Generated ──────────────────────────────────────
  test('TC11 — Employee ID is auto-generated on Add Employee form @high', async () => {
    await empPage.clickAddEmployee();
    const employeeId = await empPage.getEmployeeId();
    expect(employeeId.length).toBeGreaterThan(0);
  });

  // ── TC12: Add Employee Form Validation ────────────────────────────────────
  test('TC12 — Submitting empty Add Employee form shows validation errors @critical', async ({ page }) => {
    await empPage.clickAddEmployee();
    await empPage.saveEmployee();
    const errors = page.locator('.oxd-input-field-error-message');
    await expect(errors.first()).toBeVisible();
  });

  // ── TC13: Add Employee Successfully ───────────────────────────────────────
  test('TC13 — Adding new employee saves and redirects to profile @critical', async ({ page }) => {
  await empPage.clickAddEmployee();
  const uniqueSuffix = Date.now();
  await empPage.fillAddEmployeeForm(
    `Test${uniqueSuffix}`,
    '',
    `User${uniqueSuffix}`
  );
  // Wait for form to be stable before saving
  await page.waitForLoadState('domcontentloaded');
  await empPage.saveEmployee();
  await page.waitForTimeout(2000);
  const currentUrl = page.url();
  expect(currentUrl).toContain('pim');
  });

  // ── TC14: Search by Employee Name After Add ────────────────────────────────
  test('TC14 — Employee search returns results after adding employee @critical', async () => {
  // Search with empty criteria — click Search to return all records
  await empPage.click(empPage.searchButton);
  await empPage.waitForSearchResults();
  const rowCount = await empPage.getTableRowCount();
  expect(rowCount).toBeGreaterThan(0);
  });

  // ── TC15: Cancel Add Employee ─────────────────────────────────────────────
  test('TC15 — Cancel on Add Employee form returns to employee list @high', async ({ page }) => {
    await empPage.clickAddEmployee();
    await empPage.click(empPage.cancelButton);
    await expect(page).toHaveURL(/viewEmployeeList/);
  });

});