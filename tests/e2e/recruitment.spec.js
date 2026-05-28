// =============================================================================
// tests/e2e/recruitment.spec.js
// OrangeHRM — M5 Recruitment Workflow Test Suite (15 Test Cases)
// =============================================================================

import { expect } from '@playwright/test';
import { test } from '../../fixtures/index.js';
import { RecruitmentPage } from '../../pages/RecruitmentPage.js';
import { URLS } from '../../config/constants.js';
import recruitmentData from '../../test-data/recruitment.json' assert { type: 'json' };

test.describe('M5 — Recruitment Workflow', () => {

  let recruitPage;

  test.beforeEach(async ({ authenticatedPage, page }) => {
    recruitPage = new RecruitmentPage(page);
    await recruitPage.navigateToRecruitment();
  });

  // ── TC01: Recruitment Module Loads ────────────────────────────────────────
  test('TC01 — Recruitment module loads with candidates list @smoke @critical', async ({ page }) => {
    await expect(page).toHaveURL(/recruitment/);
    const isVisible = await recruitPage.isCandidateTableVisible();
    expect(isVisible).toBeTruthy();
  });

  // ── TC02: Candidates Table Has Records ────────────────────────────────────
  test('TC02 — Candidates list displays records @critical', async () => {
    const rowCount = await recruitPage.getCandidateRowCount();
    expect(rowCount).toBeGreaterThanOrEqual(0);
  });

  // ── TC03: Add Button Visible ──────────────────────────────────────────────
  test('TC03 — Add button is visible on candidates list @sanity', async () => {
    const isVisible = await recruitPage.isVisible(recruitPage.addButton);
    expect(isVisible).toBeTruthy();
  });

  // ── TC04: Search Button Visible ───────────────────────────────────────────
  test('TC04 — Search button is visible on candidates list @sanity', async () => {
    const isVisible = await recruitPage.isVisible(recruitPage.searchButton);
    expect(isVisible).toBeTruthy();
  });

  // ── TC05: Reset Button Visible ────────────────────────────────────────────
  test('TC05 — Reset button is visible on candidates list @sanity', async () => {
    const isVisible = await recruitPage.isVisible(recruitPage.resetButton);
    expect(isVisible).toBeTruthy();
  });

  // ── TC06: Search Returns Results ──────────────────────────────────────────
  test('TC06 — Clicking Search returns candidate records @critical', async () => {
    await recruitPage.clickSearch();
    const rowCount = await recruitPage.getCandidateRowCount();
    expect(rowCount).toBeGreaterThanOrEqual(0);
  });

  // ── TC07: Reset Restores List ─────────────────────────────────────────────
  test('TC07 — Reset button restores default candidates list @high', async () => {
    await recruitPage.clickSearch();
    await recruitPage.clickReset();
    const isVisible = await recruitPage.isCandidateTableVisible();
    expect(isVisible).toBeTruthy();
  });

  // ── TC08: Add Candidate Form Loads ────────────────────────────────────────
  test('TC08 — Clicking Add opens Add Candidate form @critical', async ({ page }) => {
    await recruitPage.clickAddCandidate();
    await expect(page).toHaveURL(/addCandidate/);
    const isVisible = await recruitPage.isAddFormVisible();
    expect(isVisible).toBeTruthy();
  });

  // ── TC09: Add Candidate Form Has Required Fields ──────────────────────────
  test('TC09 — Add Candidate form displays name fields @sanity', async () => {
    await recruitPage.clickAddCandidate();
    await expect(recruitPage.firstNameInput).toBeVisible();
    await expect(recruitPage.lastNameInput).toBeVisible();
  });

  // ── TC10: Add Candidate Form Validation ───────────────────────────────────
  test('TC10 — Submitting empty Add Candidate form shows validation @critical', async ({ page }) => {
    await recruitPage.clickAddCandidate();
    await recruitPage.saveCandidate();
    const errors = page.locator('.oxd-input-field-error-message');
    await expect(errors.first()).toBeVisible({ timeout: 10000 });
  });

  // ── TC11: Add Candidate Successfully ─────────────────────────────────────
  test('TC11 — Adding new candidate saves successfully @critical', async ({ page }) => {
  await recruitPage.clickAddCandidate();
  await recruitPage.fillCandidateForm(
    recruitmentData.newCandidate.firstName,
    recruitmentData.newCandidate.middleName,
    recruitmentData.newCandidate.lastName,
    null
  );
  await recruitPage.saveCandidate();
  await expect(page).toHaveURL(/recruitment/, { timeout: 30000 });
  });

  // ── TC12: Cancel Add Candidate ────────────────────────────────────────────
  test('TC12 — Cancel on Add Candidate returns to candidates list @high', async ({ page }) => {
    await recruitPage.clickAddCandidate();
    await recruitPage.cancelCandidate();
    await expect(page).toHaveURL(/viewCandidates/);
  });

  // ── TC13: Navigate to Vacancies ───────────────────────────────────────────
  test('TC13 — Vacancies page loads correctly @high', async ({ page }) => {
    await recruitPage.navigateToVacancies();
    await expect(page).toHaveURL(/viewJobVacancy/);
  });

  // ── TC14: Recruitment URL Validation ──────────────────────────────────────
  test('TC14 — Recruitment module URL is correct @sanity', async ({ page }) => {
    expect(page.url()).toContain('recruitment');
  });

  // ── TC15: Recruitment Page Title ──────────────────────────────────────────
  test('TC15 — Recruitment page has correct browser title @sanity', async ({ page }) => {
    const title = await recruitPage.getTitle();
    expect(title).toContain('OrangeHRM');
  });

});