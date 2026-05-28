// =============================================================================
// pages/BasePage.js
// OrangeHRM Framework — Base Page Object
// All page objects extend this class — common methods defined once here
// =============================================================================

export class BasePage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  // ---------------------------------------------------------------------------
  // NAVIGATION
  // ---------------------------------------------------------------------------

  /**
   * Navigate to a relative URL path
   * baseURL is set in playwright.config.js — no hardcoding needed here
   */
  async navigate(path) {
    await this.page.goto(path);
  }

  /**
   * Get current page title
   */
  async getTitle() {
    return await this.page.title();
  }

  /**
   * Get current page URL
   */
  getCurrentUrl() {
    return this.page.url();
  }

  // ---------------------------------------------------------------------------
  // WAITING STRATEGIES
  // ---------------------------------------------------------------------------

  /**
   * Wait for page network to be idle — used after navigation
   * Handles OrangeHRM's async loading behavior
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded');
    }

  /**
   * Wait for a specific URL pattern to be reached
   */
  async waitForUrl(urlPattern) {
    await this.page.waitForURL(urlPattern);
  }

  /**
   * Wait for an element to be visible
   */
  async waitForElement(locator) {
    await locator.waitFor({ state: 'visible' });
  }

  // ---------------------------------------------------------------------------
  // ELEMENT INTERACTIONS
  // ---------------------------------------------------------------------------

  /**
   * Click an element with built-in wait
   */
  async click(locator) {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  /**
   * Fill an input field — clears first then types
   */
  async fill(locator, value) {
    await locator.waitFor({ state: 'visible' });
    await locator.clear();
    await locator.fill(value);
  }

  /**
   * Get trimmed text content from an element
   */
  async getText(locator) {
    await locator.waitFor({ state: 'visible' });
    return (await locator.textContent()).trim();
  }

  /**
   * Check if an element is visible on the page
   */
  async isVisible(locator) {
    return await locator.isVisible();
  }

  // ---------------------------------------------------------------------------
  // RESPONSIVE TESTING UTILITY
  // ---------------------------------------------------------------------------

  /**
   * Resize browser viewport — used in M8 responsive tests
   * No separate mobile browser project needed
   */
  async setViewport(width, height) {
    await this.page.setViewportSize({ width, height });
  }

  // ---------------------------------------------------------------------------
  // SCREENSHOT UTILITY
  // ---------------------------------------------------------------------------

  /**
   * Take a named screenshot — stored in screenshots/ folder
   */
  async takeScreenshot(name) {
    await this.page.screenshot({
      path: `screenshots/${name}-${Date.now()}.png`,
      fullPage: true,
    });
  }
}