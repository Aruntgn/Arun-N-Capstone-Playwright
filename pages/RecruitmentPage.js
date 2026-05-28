// =============================================================================
// pages/RecruitmentPage.js
// OrangeHRM — M5 Recruitment Workflow Page Object
// Covers: candidates list, add candidate, vacancies, filters
// =============================================================================

import { BasePage } from './BasePage.js';
import { URLS } from '../config/constants.js';

export class RecruitmentPage extends BasePage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    // ── Navigation ────────────────────────────────────────────────────────────
    this.recruitmentMenuLink = page.getByRole('link', {
      name: 'Recruitment',
      exact: true,
    });

    // ── Candidates List ───────────────────────────────────────────────────────
    this.candidatesTable     = page.locator('.oxd-table');
    this.candidatesTableBody = page.locator('.oxd-table-body');
    this.candidateRows       = page.locator('.oxd-table-body .oxd-table-row');
    this.addButton           = page.getByRole('button', { name: 'Add' });
    this.searchButton        = page.getByRole('button', { name: 'Search' });
    this.resetButton         = page.getByRole('button', { name: 'Reset' });
    this.recordsCount        = page.locator('.oxd-text')
                                 .filter({ hasText: 'Record' });
    this.noRecordsFound      = page.getByText('No Records Found').first();

    // ── Add Candidate Form ────────────────────────────────────────────────────
    this.firstNameInput      = page.getByPlaceholder('First Name');
    this.middleNameInput     = page.getByPlaceholder('Middle Name');
    this.lastNameInput       = page.getByPlaceholder('Last Name');
    this.emailInput = page.locator('input[placeholder="Type here"]').nth(1);
    this.contactInput        = page.locator(
      'input[placeholder="Contact Number"]'
    );
    this.resumeUpload        = page.locator('input[type="file"]');
    this.saveButton          = page.getByRole('button', { name: 'Save' });
    this.cancelButton        = page.getByRole('button', { name: 'Cancel' });

    // ── Vacancy Navigation ────────────────────────────────────────────────────
    this.vacanciesTab        = page.getByRole('link', {
      name: 'Vacancies',
      exact: true,
    });
    this.candidatesTab       = page.getByRole('link', {
      name: 'Candidates',
      exact: true,
    });
  }

  // ── Navigation Actions ─────────────────────────────────────────────────────

  async navigateToRecruitment() {
    await this.navigate(URLS.RECRUITMENT);
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForSelector(
      '.oxd-table',
      { state: 'attached', timeout: 30000 }
    );
  }

  async navigateToVacancies() {
    await this.navigate(
      '/web/index.php/recruitment/viewJobVacancy'
    );
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickAddCandidate() {
    await this.click(this.addButton);
    await this.page.waitForLoadState('domcontentloaded');
    await this.firstNameInput.waitFor({
      state: 'visible',
      timeout: 15000,
    });
  }

  // ── Candidate List Actions ─────────────────────────────────────────────────

  async getCandidateRowCount() {
    await this.page.waitForSelector(
      '.oxd-table-body',
      { state: 'attached', timeout: 15000 }
    );
    return await this.candidateRows.count();
  }

  async isCandidateTableVisible() {
    await this.page.waitForLoadState('domcontentloaded');
    const count = await this.candidatesTable.count();
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

  // ── Add Candidate Actions ──────────────────────────────────────────────────

  async fillCandidateForm(firstName, middleName, lastName, email) {
  await this.fill(this.firstNameInput, firstName);
  if (middleName) {
    await this.fill(this.middleNameInput, middleName);
  }
  await this.fill(this.lastNameInput, lastName);
  }

  async saveCandidate() {
    await this.click(this.saveButton);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async cancelCandidate() {
    await this.click(this.cancelButton);
    await this.page.waitForLoadState('domcontentloaded');
  }

  // ── Validation Helpers ─────────────────────────────────────────────────────

  async getValidationErrors() {
    const errors = this.page.locator('.oxd-input-field-error-message');
    await errors.first().waitFor({ state: 'visible', timeout: 10000 });
    return await errors.allTextContents();
  }

  async isAddFormVisible() {
    return await this.firstNameInput.isVisible().catch(() => false);
  }
}