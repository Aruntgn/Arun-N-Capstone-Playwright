// =============================================================================
// pages/LoginPage.js
// OrangeHRM — M1 Login & Authentication Page Object
// Extends BasePage — only login-specific methods defined here
// =============================================================================

import { BasePage } from './BasePage.js';
import { URLS, MESSAGES } from '../config/constants.js';

export class LoginPage extends BasePage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    // ── Locators ─────────────────────────────────────────────────────────────
    // Defined once here — never repeated in test specs
    // Using stable Playwright locators — no XPath, no brittle CSS chains
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton   = page.getByRole('button', { name: 'Login' });
    this.errorMessage  = page.locator('.oxd-alert-content-text');
    this.pageHeading   = page.getByRole('heading', { name: 'Login' });
    this.requiredError = page.locator('.oxd-input-field-error-message');
    this.orangeLogo    = page.locator('.orangehrm-login-logo');
  }

  // ── Actions ────────────────────────────────────────────────────────────────

  /**
   * Navigate directly to OrangeHRM login page
   */
  async navigateToLogin() {
  await this.navigate(URLS.LOGIN);
  await this.waitForPageLoad();
  await this.page.waitForSelector(
    '.oxd-input-group, input[name="username"]',
    { state: 'visible', timeout: 60000 }
  );
  }

  /**
   * Perform full login with provided credentials
   */
  async login(username, password) {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
  }

  /**
   * Login and wait for dashboard — used by authenticated fixture
   */
  async loginAndWaitForDashboard(username, password) {
  await this.login(username, password);
  // Retry once if server redirects back to login
  try {
    await this.waitForUrl('**/dashboard/**');
  } catch {
    // Server may have rejected — retry login once
    await this.navigateToLogin();
    await this.login(username, password);
    await this.waitForUrl('**/dashboard/**');
  }
  }

  /**
   * Clear the username field only
   */
  async clearUsername() {
    await this.usernameInput.clear();
  }

  /**
   * Clear the password field only
   */
  async clearPassword() {
    await this.passwordInput.clear();
  }

  /**
   * Submit login form without filling any fields
   */
  async submitEmptyForm() {
    await this.click(this.loginButton);
  }

  // ── Assertions (return values — specs decide what to assert) ───────────────

  /**
   * Get error message text after failed login
   */
  async getErrorMessage() {
    await this.waitForElement(this.errorMessage);
    return await this.getText(this.errorMessage);
  }

  /**
   * Get all required field error messages
   */
  async getRequiredErrors() {
    await this.requiredError.first().waitFor({ state: 'visible' });
    return await this.requiredError.allTextContents();
  }

  /**
   * Check if login page is displayed
   */
  async isLoginPageVisible() {
    return await this.isVisible(this.pageHeading);
  }

  /**
   * Check if OrangeHRM logo is visible
   */
  async isLogoVisible() {
    return await this.isVisible(this.orangeLogo);
  }
}