// =============================================================================
// pages/SearchPage.js
// OrangeHRM — M7 Search, Filters & Table Validation Page Object
// Validates search operations, filters, sorting, and table behavior
// =============================================================================

import { BasePage } from './BasePage.js';
import { URLS } from '../config/constants.js';

export class SearchPage extends BasePage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    // ── Global Search ─────────────────────────────────────────────────────────
    this.globalSearchInput  = page.locator('.oxd-header-search input, input[placeholder="Search"]');

    // ── PIM Search Form ───────────────────────────────────────────────────────
    this.pimSearchName      = page.locator('.oxd-autocomplete-text-input input').first();
    this.pimEmployeeIdInput = page.locator('.oxd-table-filter-area input').nth(1);
    this.pimSearchButton    = page.getByRole('button', { name: 'Search' });
    this.pimResetButton     = page.getByRole('button', { name: 'Reset' });
    this.pimTableBody       = page.locator('.oxd-table-body');
    this.pimTableRows       = page.locator('.oxd-table-body .oxd-table-row');
    this.pimRecordsText     = page.locator('.oxd-text').filter({ hasText: 'Records Found' });

    // ── Admin User Search Form ────────────────────────────────────────────────
    this.adminUsernameInput = page.locator('.oxd-table-filter-area input').first();
    this.adminRoleDropdown  = page.locator('.oxd-select-wrapper').first();
    this.adminStatusDropdown = page.locator('.oxd-select-wrapper').nth(1);
    this.adminSearchButton  = page.getByRole('button', { name: 'Search' });
    this.adminResetButton   = page.getByRole('button', { name: 'Reset' });
    this.adminTableBody     = page.locator('.oxd-table-body');
    this.adminTableRows     = page.locator('.oxd-table-body .oxd-table-row');

    // ── Recruitment Search Form ───────────────────────────────────────────────
    this.recruitSearchButton = page.getByRole('button', { name: 'Search' });
    this.recruitResetButton  = page.getByRole('button', { name: 'Reset' });
    this.recruitTableBody    = page.locator('.oxd-table-body');
    this.recruitTableRows    = page.locator('.oxd-table-body .oxd-table-row');

    // ── Shared Table Elements ─────────────────────────────────────────────────
    this.noRecordsFound     = page.getByText('No Records Found').first();
    this.tableFilterArea    = page.locator('.oxd-table-filter-area');
  }

  // ── Navigation ─────────────────────────────────────────────────────────────

  async navigateToPIM() {
    await this.navigate(URLS.PIM);
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForSelector('.oxd-table-body', { state: 'attached', timeout: 30000 });
  }

  async navigateToAdmin() {
    await this.navigate(URLS.ADMIN);
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForSelector('.oxd-table-body', { state: 'attached', timeout: 30000 });
  }

  async navigateToRecruitment() {
    await this.navigate(URLS.RECRUITMENT);
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForSelector('.oxd-table-body', { state: 'attached', timeout: 30000 });
  }

  async navigateToLeave() {
    await this.navigate(URLS.LEAVE);
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForSelector('.oxd-table, .oxd-form', { state: 'attached', timeout: 30000 });
  }

  // ── Search Actions ─────────────────────────────────────────────────────────

  async searchPIMByEmployeeId(employeeId) {
    await this.fill(this.pimEmployeeIdInput, employeeId);
    await this.click(this.pimSearchButton);
    await this.waitForSearchResults();
  }

  async searchAdminByUsername(username) {
    await this.fill(this.adminUsernameInput, username);
    await this.click(this.adminSearchButton);
    await this.waitForSearchResults();
  }

  async clickSearch(button) {
    await this.click(button);
    await this.waitForSearchResults();
  }

  async clickReset(button) {
  await this.click(button);
  await this.page.waitForLoadState('domcontentloaded');
  await this.page.waitForSelector(
    '.oxd-table-body',
    { state: 'attached', timeout: 15000 }
  );
  }

  async waitForSearchResults() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForSelector(
      '.oxd-table-body',
      { state: 'attached', timeout: 20000 }
    );
  }

  // ── Table Validation ───────────────────────────────────────────────────────

  async getTableRowCount(tableRows) {
    await this.page.waitForSelector(
      '.oxd-table-body',
      { state: 'attached', timeout: 15000 }
    );
    return await tableRows.count();
  }

  async isTableVisible(tableBody) {
  await this.page.waitForSelector(
    '.oxd-table-body',
    { state: 'attached', timeout: 15000 }
  );
  const count = await tableBody.count();
  return count > 0;
  }

  async isFilterFormVisible() {
    return await this.tableFilterArea.isVisible().catch(() => false);
  }

  async isNoRecordsVisible() {
    return await this.noRecordsFound.isVisible().catch(() => false);
  }
}