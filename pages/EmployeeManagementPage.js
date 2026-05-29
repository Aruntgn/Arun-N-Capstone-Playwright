// =============================================================================
// pages/EmployeeManagementPage.js
// OrangeHRM — M3 Employee Management (PIM) Page Object
// Covers: employee list, add employee, search, table validation
// =============================================================================

import { BasePage } from './BasePage.js';
import { URLS } from '../config/constants.js';

export class EmployeeManagementPage extends BasePage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    // ── Navigation ────────────────────────────────────────────────────────────
    this.pimMenuLink = page.getByRole('link', { name: 'PIM' });

    // ── Employee List ─────────────────────────────────────────────────────────
    this.employeeListTable = page.locator('.oxd-table');
    this.tableRows = page.locator('.oxd-table-row');
    this.tableHeader       = page.locator('.oxd-table-header');
    this.addButton         = page.getByRole('button', { name: 'Add' });
    this.searchButton      = page.getByRole('button', { name: 'Search' });
    this.resetButton       = page.getByRole('button', { name: 'Reset' });
    this.recordsCount      = page.locator('.oxd-text')
                             .filter({ hasText: 'Records Found' });
    this.noRecordsFound = page.locator('span.oxd-text')
                          .filter({ hasText: 'No Records Found' });
    this.loadingSpinner    = page.locator('.oxd-loading-spinner');

    // ── Search Form ───────────────────────────────────────────────────────────
    // OrangeHRM uses autocomplete for employee name search — not separate fields
    this.searchEmployeeName = page.locator('.oxd-autocomplete-text-input input').first();
    this.employeeIdSearch   = page.locator('.oxd-table-filter-area input').nth(1);
    this.employmentStatus   = page.locator('.oxd-select-text').first();

    // ── Add Employee Form ─────────────────────────────────────────────────────
    this.firstNameInput   = page.getByPlaceholder('First Name');
    this.middleNameInput  = page.getByPlaceholder('Middle Name');
    this.lastNameInput    = page.getByPlaceholder('Last Name');
    this.employeeIdInput  = page.locator('.oxd-form-row input').nth(3);
    this.saveButton       = page.getByRole('button', { name: 'Save' });
    this.cancelButton     = page.getByRole('button', { name: 'Cancel' });

    // ── Employee Profile ──────────────────────────────────────────────────────
    this.personalDetailsTab = page.getByText('Personal Details');
    this.employeeFullName   = page.locator('.orangehrm-edit-employee-name');
  }

  // ── Navigation Actions ─────────────────────────────────────────────────────

  async navigateToPIM() {
  await this.navigate(URLS.PIM);
  await this.page.waitForLoadState('domcontentloaded');
  await this.page.waitForSelector('.oxd-table', { state: 'attached', timeout: 30000 });
  }

  async clickAddEmployee() {
    await this.click(this.addButton);
    await this.waitForPageLoad();
    await this.waitForElement(this.firstNameInput);
  }

  // ── Search Actions ─────────────────────────────────────────────────────────

  async searchByName(firstName, lastName) {
  const fullName = lastName
    ? `${firstName} ${lastName}`.trim()
    : firstName.trim();
  await this.searchEmployeeName.waitFor({ state: 'visible' });
  await this.searchEmployeeName.clear();
  await this.searchEmployeeName.fill(fullName);
  // Small wait for autocomplete to settle then click Search
  await this.page.waitForLoadState('domcontentloaded');
  // Click search button directly — no Enter key
  await this.searchButton.click();
  await this.waitForSearchResults();
  }

  async searchByEmployeeId(employeeId) {
    await this.fill(this.employeeIdSearch, employeeId);
    await this.click(this.searchButton);
    await this.waitForSearchResults();
  }

  async resetSearch() {
  await this.click(this.resetButton);
  await this.page.waitForLoadState('domcontentloaded');
  await this.page.waitForSelector(
    '.oxd-table-body',
    { state: 'attached', timeout: 20000 }
  );
  }

  async waitForSearchResults() {
  await this.page.waitForLoadState('domcontentloaded');
  // Wait for either results or no-records state
  await this.page.waitForSelector(
    '.oxd-table-body, .oxd-table-row',
    { state: 'attached', timeout: 20000 }
  );
  // Additional wait for content to stabilize
  await this.page.waitForLoadState('domcontentloaded');
  }

  // ── Employee Form Actions ──────────────────────────────────────────────────

  async fillAddEmployeeForm(firstName, middleName, lastName) {
    await this.fill(this.firstNameInput, firstName);
    if (middleName) {
      await this.fill(this.middleNameInput, middleName);
    }
    await this.fill(this.lastNameInput, lastName);
  }

  async saveEmployee() {
    await this.click(this.saveButton);
    await this.waitForPageLoad();
  }

  async getEmployeeId() {
  // Employee ID is auto-populated — read value directly
  const idInput = this.page.locator('.oxd-form-row input').nth(3);
  await idInput.waitFor({ state: 'visible', timeout: 15000 });
  return await idInput.inputValue();
  }

  // ── Table Validation ───────────────────────────────────────────────────────

  async getTableRowCount() {
  await this.page.waitForSelector(
    '.oxd-table-body',
    { state: 'attached', timeout: 15000 }
  );
  const rows = this.page.locator('.oxd-table-body .oxd-table-row');
  return await rows.count();
  }

  async getRecordsFoundText() {
  const recordsText = this.page.locator('.oxd-text')
    .filter({ hasText: 'Records Found' });
  await recordsText.waitFor({ state: 'visible', timeout: 15000 });
  return await this.getText(recordsText);
  }

  async isTableVisible() {
  await this.page.waitForSelector(
    '.oxd-table-body',
    { state: 'attached', timeout: 15000 }
  );
  return true;
  }

  async isNoRecordsFound() {
  await this.page.waitForLoadState('domcontentloaded');
  await this.page.waitForSelector(
    '.oxd-table-body',
    { state: 'attached', timeout: 15000 }
  );
  const rows = this.page.locator('.oxd-table-body .oxd-table-row');
  const count = await rows.count();
  return count === 0;
  }

  async getColumnHeaders() {
  await this.page.waitForLoadState('domcontentloaded');
  // Card layout — validate table cell labels exist
  const cells = this.page.locator('.oxd-table-cell');
  await cells.first().waitFor({ state: 'attached', timeout: 15000 });
  return await cells.count();
  }
}