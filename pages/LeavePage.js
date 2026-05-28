// =============================================================================
// pages/LeavePage.js
// OrangeHRM — M4 Leave Management Page Object
// Covers: leave list, apply leave, leave balance, filters, entitlements
// =============================================================================

import { BasePage } from './BasePage.js';
import { URLS } from '../config/constants.js';

export class LeavePage extends BasePage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    // ── Navigation ────────────────────────────────────────────────────────────
    this.leaveMenuLink      = page.getByRole('link', { name: 'Leave' });
    this.applyLeaveTab      = page.getByRole('link', { name: 'Apply' });
    this.myLeaveTab         = page.getByRole('link', { name: 'My Leave' });
    this.leaveListTab       = page.getByRole('link', { name: 'Leave List' });
    this.entitlementsMenu   = page.getByRole('link', { name: 'Entitlements' });
    this.reportsMenu        = page.getByRole('link', { name: 'Reports' });

    // ── Leave List ────────────────────────────────────────────────────────────
    this.leaveTable         = page.locator('.oxd-table');
    this.leaveTableBody     = page.locator('.oxd-table-body');
    this.leaveTableRows     = page.locator('.oxd-table-body .oxd-table-row');
    this.recordsCount       = page.locator('.oxd-text')
                                .filter({ hasText: 'Record' });
    this.noRecordsFound     = page.getByText('No Records Found');
    this.searchButton       = page.getByRole('button', { name: 'Search' });
    this.resetButton        = page.getByRole('button', { name: 'Reset' });

    // ── Apply Leave Form ──────────────────────────────────────────────────────
    this.leaveTypeDropdown  = page.locator(
      '.oxd-select-wrapper'
    ).first();
    this.fromDateInput      = page.locator(
      'input.oxd-input'
    ).nth(1);
    this.toDateInput        = page.locator(
      'input.oxd-input'
    ).nth(2);
    this.commentInput       = page.locator(
      'textarea.oxd-textarea'
    );
    this.applyButton        = page.getByRole('button', { name: 'Apply' });

    // ── Filter Form ───────────────────────────────────────────────────────────
    this.statusDropdown     = page.locator('.oxd-select-wrapper').first();
    this.fromDateFilter     = page.locator('input.oxd-input').nth(1);
    this.toDateFilter       = page.locator('input.oxd-input').nth(2);
  }

  // ── Navigation Actions ─────────────────────────────────────────────────────

  async navigateToLeave() {
    await this.navigate(URLS.LEAVE);
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForSelector(
      '.oxd-table, .oxd-form',
      { state: 'attached', timeout: 30000 }
    );
  }

  async navigateToApplyLeave() {
    await this.navigate(
      '/web/index.php/leave/applyLeave'
    );
    await this.page.waitForLoadState('domcontentloaded');
  }

  async navigateToMyLeave() {
    await this.navigate(
      '/web/index.php/leave/viewMyLeaveList'
    );
    await this.page.waitForLoadState('domcontentloaded');
  }

  async navigateToLeaveEntitlements() {
    await this.navigate(
      '/web/index.php/leave/viewLeaveEntitlements'
    );
    await this.page.waitForLoadState('domcontentloaded');
  }

  // ── Leave List Actions ─────────────────────────────────────────────────────

  async getLeaveTableRowCount() {
    await this.page.waitForSelector(
      '.oxd-table-body',
      { state: 'attached', timeout: 15000 }
    );
    return await this.leaveTableRows.count();
  }

  async isLeaveTableVisible() {
    await this.page.waitForLoadState('domcontentloaded');
    const count = await this.leaveTable.count();
    return count > 0;
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

  // ── Apply Leave Actions ────────────────────────────────────────────────────

  async selectLeaveType(leaveType) {
    await this.click(this.leaveTypeDropdown);
    await this.page.getByRole('option', { name: leaveType }).click();
  }

  async fillLeaveDate(fromDate, toDate) {
    await this.fill(this.fromDateInput, fromDate);
    await this.page.keyboard.press('Tab');
    await this.fill(this.toDateInput, toDate);
    await this.page.keyboard.press('Tab');
  }

  async fillComment(comment) {
    await this.fill(this.commentInput, comment);
  }

  async submitLeaveApplication() {
  // Wait for form loader to disappear before clicking Apply
  await this.page.waitForSelector(
    '.oxd-form-loader',
    { state: 'detached', timeout: 15000 }
  ).catch(() => null); // loader may not always appear
  await this.click(this.applyButton);
  await this.page.waitForLoadState('domcontentloaded');
  }

  // ── Validation Helpers ─────────────────────────────────────────────────────

  async getValidationErrors() {
    const errors = this.page.locator('.oxd-input-field-error-message');
    await errors.first().waitFor({ state: 'visible', timeout: 10000 });
    return await errors.allTextContents();
  }

  async isPageHeaderVisible(headerText) {
    const header = this.page.getByRole('heading', { name: headerText });
    return await header.isVisible().catch(() => false);
  }

  async getLeaveTopbarTitle() {
    const title = this.page.locator('.oxd-topbar-body-nav-tab')
      .filter({ hasText: 'Leave' });
    return await title.isVisible().catch(() => false);
  }
}