// =============================================================================
// pages/DashboardPage.js
// OrangeHRM — M2 Dashboard Validation Page Object
// Extends BasePage — dashboard-specific locators and methods only
// =============================================================================

import { BasePage } from './BasePage.js';
import { URLS } from '../config/constants.js';

export class DashboardPage extends BasePage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    // ── Header Locators ───────────────────────────────────────────────────────
    this.pageHeader       = page.locator('.oxd-topbar-header-breadcrumb h6');
    this.userDropdown     = page.locator('.oxd-userdropdown-tab');
    this.userDropdownName = page.locator('.oxd-userdropdown-name');

    // ── Sidebar Locators ──────────────────────────────────────────────────────
    this.sidebarMenu = page.locator('nav.oxd-navbar-nav');
    this.sidebarMenuItems = page.locator('.oxd-main-menu-item');
    this.adminMenuItem    = page.getByRole('link', { name: 'Admin' });
    this.pimMenuItem      = page.getByRole('link', { name: 'PIM' });
    this.leaveMenuItem    = page.getByRole('link', { name: 'Leave' });
    this.recruitMenuItem  = page.getByRole('link', { name: 'Recruitment' });
    this.dashboardMenuItem = page.getByRole('link', { name: 'Dashboard' });

    // ── Widget Locators ───────────────────────────────────────────────────────
    this.widgetHeaders    = page.locator('.oxd-grid-item .oxd-text--h6');
    this.quickLaunchIcons = page.locator('.oxd-quick-launch-card');
    this.timeAtWork       = page.locator('.oxd-attendance-card');
    this.dashboardGrid    = page.locator('.oxd-grid-item');
    this.dashboardWidgets = page.locator('.orangehrm-dashboard-widget');
  }

  // ── Actions ────────────────────────────────────────────────────────────────

  /**
   * Navigate directly to dashboard
   */
  async navigateToDashboard() {
    await this.navigate(URLS.DASHBOARD);
    await this.waitForPageLoad();
    await this.waitForElement(this.sidebarMenu);
  }

  /**
   * Get all sidebar menu item texts
   */
  async getSidebarMenuItems() {
    await this.sidebarMenuItems.first().waitFor({ state: 'visible' });
    return await this.sidebarMenuItems.allTextContents();
  }

  /**
   * Get all dashboard widget header texts
   */
  async getWidgetHeaders() {
    await this.widgetHeaders.first().waitFor({ state: 'visible' });
    return await this.widgetHeaders.allTextContents();
  }

  /**
   * Get count of quick launch icons
   */
  async getQuickLaunchCount() {
    const widget = this.page.locator('.oxd-grid-item')
        .filter({ hasText: 'Quick Launch' });
    await widget.waitFor({ state: 'visible' });
    const icons = widget.locator('p');
    return await icons.count();
  }

  /**
   * Get logged-in username from header dropdown
   */
  async getLoggedInUsername() {
    await this.waitForElement(this.userDropdownName);
    return await this.getText(this.userDropdownName);
  }

  /**
   * Click a sidebar menu item by name
   */
  async clickSidebarItem(name) {
  const link = this.page.getByRole('link', { name, exact: true });
  await link.waitFor({ state: 'visible', timeout: 30000 });
  await link.click();
  await this.waitForPageLoad();
  await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Check if sidebar is visible
   */
  async isSidebarVisible() {
  await this.page.waitForSelector('nav.oxd-navbar-nav', { state: 'attached' });
  const count = await this.page.locator('nav.oxd-navbar-nav').count();
  return count > 0;
  }

  /**
   * Check if dashboard grid widgets are loaded
   */
  async isDashboardLoaded() {
  await this.page.waitForSelector('.oxd-grid-item', { state: 'attached' });
  const count = await this.dashboardGrid.count();
  return count > 0;
  }

  /**
   * Get count of dashboard grid items
   */
  async getDashboardGridCount() {
    await this.dashboardGrid.first().waitFor({ state: 'visible' });
    return await this.dashboardGrid.count();
  }
}