// =============================================================================
// pages/AdminPage.js
// OrangeHRM — M6 Admin & User Management Page Object
// Covers: user list, add user, search, roles, permissions
// =============================================================================

import { BasePage } from './BasePage.js';
import { URLS } from '../config/constants.js';

export class AdminPage extends BasePage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    // ── Navigation ────────────────────────────────────────────────────────────
    this.adminMenuLink    = page.getByRole('link', {
      name: 'Admin',
      exact: true,
    });

    // ── User List ─────────────────────────────────────────────────────────────
    this.userTable        = page.locator('.oxd-table');
    this.userTableBody    = page.locator('.oxd-table-body');
    this.userTableRows    = page.locator('.oxd-table-body .oxd-table-row');
    this.addButton        = page.getByRole('button', { name: 'Add' });
    this.searchButton     = page.getByRole('button', { name: 'Search' });
    this.resetButton      = page.getByRole('button', { name: 'Reset' });
    this.recordsCount     = page.locator('.oxd-text')
                              .filter({ hasText: 'Record' });

    // ── Search Form ───────────────────────────────────────────────────────────
    this.usernameSearch   = page.locator(
      '.oxd-table-filter-area input'
    ).first();
    this.userRoleDropdown = page.locator('.oxd-select-wrapper').first();
    this.statusDropdown   = page.locator('.oxd-select-wrapper').nth(1);

    // ── Add User Form ─────────────────────────────────────────────────────────
    this.userRoleSelect   = page.locator('.oxd-select-wrapper').first();
    this.employeeNameInput = page.locator(
      '.oxd-autocomplete-text-input input'
    );
    this.statusSelect     = page.locator('.oxd-select-wrapper').nth(1);
    this.usernameInput    = page.locator(
      'input[autocomplete="off"]'
    ).nth(1);
    this.passwordInput    = page.locator('input[type="password"]').first();
    this.confirmPasswordInput = page.locator(
      'input[type="password"]'
    ).nth(1);
    this.saveButton       = page.getByRole('button', { name: 'Save' });
    this.cancelButton     = page.getByRole('button', { name: 'Cancel' });
  }

  // ── Navigation Actions ─────────────────────────────────────────────────────

  async navigateToAdmin() {
    await this.navigate(URLS.ADMIN);
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForSelector(
      '.oxd-table',
      { state: 'attached', timeout: 30000 }
    );
  }

  async navigateToJobTitles() {
    await this.navigate('/web/index.php/admin/viewJobTitleList');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async navigateToOrganizationStructure() {
    await this.navigate(
      '/web/index.php/admin/viewOrganizationGeneralInformation'
    );
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickAddUser() {
    await this.click(this.addButton);
    await this.page.waitForLoadState('domcontentloaded');
    await this.userRoleSelect.waitFor({
      state: 'visible',
      timeout: 15000,
    });
  }

  // ── User List Actions ──────────────────────────────────────────────────────

  async getUserTableRowCount() {
    await this.page.waitForSelector(
      '.oxd-table-body',
      { state: 'attached', timeout: 15000 }
    );
    return await this.userTableRows.count();
  }

  async isUserTableVisible() {
    await this.page.waitForLoadState('domcontentloaded');
    const count = await this.userTable.count();
    return count > 0;
  }

  async searchByUsername(username) {
    await this.fill(this.usernameSearch, username);
    await this.click(this.searchButton);
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForSelector(
      '.oxd-table-body',
      { state: 'attached', timeout: 15000 }
    );
  }

  async clickSearch() {
    await this.click(this.searchButton);
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForSelector(
      '.oxd-table-body',
      { state: 'attached', timeout: 15000 }
    );
  }

  async clickReset() {
    await this.click(this.resetButton);
    await this.page.waitForLoadState('domcontentloaded');
  }

  // ── Validation Helpers ─────────────────────────────────────────────────────

  async getValidationErrors() {
    const errors = this.page.locator('.oxd-input-field-error-message');
    await errors.first().waitFor({ state: 'visible', timeout: 10000 });
    return await errors.allTextContents();
  }

  async isAddFormVisible() {
    return await this.userRoleSelect.isVisible().catch(() => false);
  }
}