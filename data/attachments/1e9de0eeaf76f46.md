# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e/search-filters.spec.js >> M7 — Search, Filters & Table Validation >> TC07 — Admin search by username returns matching records @critical
- Location: tests/e2e/search-filters.spec.js:66:3

# Error details

```
Error: expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic:
    - complementary [ref=e4]:
      - navigation "Sidepanel" [ref=e5]:
        - generic [ref=e6]:
          - link "client brand banner" [ref=e7] [cursor=pointer]:
            - /url: https://www.orangehrm.com/
            - img "client brand banner" [ref=e9]
          - text: 
        - generic [ref=e10]:
          - generic [ref=e11]:
            - generic [ref=e12]:
              - textbox "Search" [ref=e15]
              - button "" [ref=e16] [cursor=pointer]:
                - generic [ref=e17]: 
            - separator [ref=e18]
          - list [ref=e19]:
            - listitem [ref=e20]:
              - link "Admin" [ref=e21] [cursor=pointer]:
                - /url: /web/index.php/admin/viewAdminModule
                - generic [ref=e24]: Admin
            - listitem [ref=e25]:
              - link "PIM" [ref=e26] [cursor=pointer]:
                - /url: /web/index.php/pim/viewPimModule
                - generic [ref=e40]: PIM
            - listitem [ref=e41]:
              - link "Leave" [ref=e42] [cursor=pointer]:
                - /url: /web/index.php/leave/viewLeaveModule
                - generic [ref=e45]: Leave
            - listitem [ref=e46]:
              - link "Time" [ref=e47] [cursor=pointer]:
                - /url: /web/index.php/time/viewTimeModule
                - generic [ref=e53]: Time
            - listitem [ref=e54]:
              - link "Recruitment" [ref=e55] [cursor=pointer]:
                - /url: /web/index.php/recruitment/viewRecruitmentModule
                - generic [ref=e61]: Recruitment
            - listitem [ref=e62]:
              - link "My Info" [ref=e63] [cursor=pointer]:
                - /url: /web/index.php/pim/viewMyDetails
                - generic [ref=e69]: My Info
            - listitem [ref=e70]:
              - link "Performance" [ref=e71] [cursor=pointer]:
                - /url: /web/index.php/performance/viewPerformanceModule
                - generic [ref=e79]: Performance
            - listitem [ref=e80]:
              - link "Dashboard" [ref=e81] [cursor=pointer]:
                - /url: /web/index.php/dashboard/index
                - generic [ref=e84]: Dashboard
            - listitem [ref=e85]:
              - link "Directory" [ref=e86] [cursor=pointer]:
                - /url: /web/index.php/directory/viewDirectory
                - generic [ref=e89]: Directory
            - listitem [ref=e90]:
              - link "Maintenance" [ref=e91] [cursor=pointer]:
                - /url: /web/index.php/maintenance/viewMaintenanceModule
                - generic [ref=e95]: Maintenance
            - listitem [ref=e96]:
              - link "Claim" [ref=e97] [cursor=pointer]:
                - /url: /web/index.php/claim/viewClaimModule
                - img [ref=e100]
                - generic [ref=e104]: Claim
            - listitem [ref=e105]:
              - link "Buzz" [ref=e106] [cursor=pointer]:
                - /url: /web/index.php/buzz/viewBuzz
                - generic [ref=e109]: Buzz
    - banner [ref=e110]:
      - generic [ref=e111]:
        - generic [ref=e112]:
          - text: 
          - generic [ref=e113]:
            - heading "Admin" [level=6] [ref=e114]
            - heading "/ User Management" [level=6] [ref=e115]
        - link "Upgrade" [ref=e117]:
          - /url: https://orangehrm.com/open-source/upgrade-to-advanced
          - button "Upgrade" [ref=e118] [cursor=pointer]: Upgrade
        - list [ref=e124]:
          - listitem [ref=e125]:
            - generic [ref=e126] [cursor=pointer]:
              - img "profile picture" [ref=e127]
              - paragraph [ref=e128]: manda user
              - generic [ref=e129]: 
      - navigation "Topbar Menu" [ref=e131]:
        - list [ref=e132]:
          - listitem [ref=e133] [cursor=pointer]:
            - generic [ref=e134]:
              - text: User Management
              - generic [ref=e135]: 
          - listitem [ref=e136] [cursor=pointer]:
            - generic [ref=e137]:
              - text: Job
              - generic [ref=e138]: 
          - listitem [ref=e139] [cursor=pointer]:
            - generic [ref=e140]:
              - text: Organization
              - generic [ref=e141]: 
          - listitem [ref=e142] [cursor=pointer]:
            - generic [ref=e143]:
              - text: Qualifications
              - generic [ref=e144]: 
          - listitem [ref=e145] [cursor=pointer]:
            - link "Nationalities" [ref=e146]:
              - /url: "#"
          - listitem [ref=e147] [cursor=pointer]:
            - link "Corporate Branding" [ref=e148]:
              - /url: "#"
          - listitem [ref=e149] [cursor=pointer]:
            - generic [ref=e150]:
              - text: Configuration
              - generic [ref=e151]: 
          - button "" [ref=e153] [cursor=pointer]:
            - generic [ref=e154]: 
  - generic [ref=e155]:
    - generic [ref=e157]:
      - generic [ref=e158]:
        - generic [ref=e159]:
          - heading "System Users" [level=5] [ref=e161]
          - button "" [ref=e164] [cursor=pointer]:
            - generic [ref=e165]: 
        - separator [ref=e166]
        - generic [ref=e168]:
          - generic [ref=e170]:
            - generic [ref=e172]:
              - generic [ref=e174]: Username
              - textbox [ref=e176]: Admin
            - generic [ref=e178]:
              - generic [ref=e180]: User Role
              - generic [ref=e183] [cursor=pointer]:
                - generic [ref=e184]: "-- Select --"
                - generic [ref=e186]: 
            - generic [ref=e188]:
              - generic [ref=e190]: Employee Name
              - textbox "Type for hints..." [ref=e194]
            - generic [ref=e196]:
              - generic [ref=e198]: Status
              - generic [ref=e201] [cursor=pointer]:
                - generic [ref=e202]: "-- Select --"
                - generic [ref=e204]: 
          - separator [ref=e205]
          - generic [ref=e206]:
            - button "Reset" [ref=e207] [cursor=pointer]
            - button "Search" [active] [ref=e208] [cursor=pointer]
      - generic [ref=e209]:
        - button " Add" [ref=e211] [cursor=pointer]:
          - generic [ref=e212]: 
          - text: Add
        - table [ref=e214]
    - generic [ref=e219]:
      - paragraph [ref=e220]: OrangeHRM OS 5.8
      - paragraph [ref=e221]:
        - text: © 2005 - 2026
        - link "OrangeHRM, Inc" [ref=e222] [cursor=pointer]:
          - /url: http://www.orangehrm.com
        - text: . All rights reserved.
```

# Test source

```ts
  1   | // =============================================================================
  2   | // tests/e2e/search-filters.spec.js
  3   | // OrangeHRM — M7 Search, Filters & Table Validation (15 Test Cases)
  4   | // =============================================================================
  5   | 
  6   | import { expect } from '@playwright/test';
  7   | import { test } from '../../fixtures/index.js';
  8   | import { SearchPage } from '../../pages/SearchPage.js';
  9   | import { URLS } from '../../config/constants.js';
  10  | 
  11  | test.describe('M7 — Search, Filters & Table Validation', () => {
  12  | 
  13  |   let searchPage;
  14  | 
  15  |   test.beforeEach(async ({ authenticatedPage, page }) => {
  16  |     searchPage = new SearchPage(page);
  17  |   });
  18  | 
  19  |   // ── TC01: PIM Search Form Visible ─────────────────────────────────────────
  20  |   test('TC01 — PIM module search filter form is visible @smoke @sanity', async ({ page }) => {
  21  |     await searchPage.navigateToPIM();
  22  |     const isVisible = await searchPage.isFilterFormVisible();
  23  |     expect(isVisible).toBeTruthy();
  24  |   });
  25  | 
  26  |   // ── TC02: PIM Search Button Works ─────────────────────────────────────────
  27  |   test('TC02 — PIM search button executes search and returns results @critical', async () => {
  28  |     await searchPage.navigateToPIM();
  29  |     await searchPage.clickSearch(searchPage.pimSearchButton);
  30  |     const rowCount = await searchPage.getTableRowCount(searchPage.pimTableRows);
  31  |     expect(rowCount).toBeGreaterThanOrEqual(0);
  32  |   });
  33  | 
  34  |   // ── TC03: PIM Reset Button Works ──────────────────────────────────────────
  35  |   test('TC03 — PIM reset button restores default employee list @critical', async () => {
  36  |     await searchPage.navigateToPIM();
  37  |     await searchPage.clickSearch(searchPage.pimSearchButton);
  38  |     await searchPage.clickReset(searchPage.pimResetButton);
  39  |     const isVisible = await searchPage.isTableVisible(searchPage.pimTableBody);
  40  |     expect(isVisible).toBeTruthy();
  41  |   });
  42  | 
  43  |   // ── TC04: PIM Table Has Records ───────────────────────────────────────────
  44  |   test('TC04 — PIM employee table displays records @critical', async () => {
  45  |     await searchPage.navigateToPIM();
  46  |     const rowCount = await searchPage.getTableRowCount(searchPage.pimTableRows);
  47  |     expect(rowCount).toBeGreaterThan(0);
  48  |   });
  49  | 
  50  |   // ── TC05: PIM Records Count Displayed ─────────────────────────────────────
  51  |   test('TC05 — PIM displays total records found count @sanity', async ({ page }) => {
  52  |     await searchPage.navigateToPIM();
  53  |     await searchPage.clickSearch(searchPage.pimSearchButton);
  54  |     const recordsText = page.locator('.oxd-text').filter({ hasText: 'Records Found' });
  55  |     await expect(recordsText).toBeVisible({ timeout: 15000 });
  56  |   });
  57  | 
  58  |   // ── TC06: Admin Search Form Visible ───────────────────────────────────────
  59  |   test('TC06 — Admin module search filter form is visible @smoke @sanity', async () => {
  60  |     await searchPage.navigateToAdmin();
  61  |     const isVisible = await searchPage.isFilterFormVisible();
  62  |     expect(isVisible).toBeTruthy();
  63  |   });
  64  | 
  65  |   // ── TC07: Admin Search By Username ────────────────────────────────────────
  66  |   test('TC07 — Admin search by username returns matching records @critical', async () => {
  67  |     await searchPage.navigateToAdmin();
  68  |     await searchPage.searchAdminByUsername('Admin');
  69  |     const rowCount = await searchPage.getTableRowCount(searchPage.adminTableRows);
> 70  |     expect(rowCount).toBeGreaterThan(0);
      |                      ^ Error: expect(received).toBeGreaterThan(expected)
  71  |   });
  72  | 
  73  |   // ── TC08: Admin Reset Restores List ───────────────────────────────────────
  74  |   test('TC08 — Admin reset button restores full user list @high', async () => {
  75  |     await searchPage.navigateToAdmin();
  76  |     await searchPage.searchAdminByUsername('Admin');
  77  |     await searchPage.clickReset(searchPage.adminResetButton);
  78  |     const isVisible = await searchPage.isTableVisible(searchPage.adminTableBody);
  79  |     expect(isVisible).toBeTruthy();
  80  |   });
  81  | 
  82  |   // ── TC09: Admin Table Has Records ─────────────────────────────────────────
  83  |   test('TC09 — Admin user table displays records @critical', async () => {
  84  |     await searchPage.navigateToAdmin();
  85  |     const rowCount = await searchPage.getTableRowCount(searchPage.adminTableRows);
  86  |     expect(rowCount).toBeGreaterThan(0);
  87  |   });
  88  | 
  89  |   // ── TC10: Admin Role Dropdown Visible ─────────────────────────────────────
  90  |   test('TC10 — Admin search filter has User Role dropdown @sanity', async ({ page }) => {
  91  |     await searchPage.navigateToAdmin();
  92  |     await expect(searchPage.adminRoleDropdown).toBeVisible();
  93  |   });
  94  | 
  95  |   // ── TC11: Recruitment Search Form Visible ─────────────────────────────────
  96  |   test('TC11 — Recruitment module search filter form is visible @smoke @sanity', async () => {
  97  |     await searchPage.navigateToRecruitment();
  98  |     const isVisible = await searchPage.isFilterFormVisible();
  99  |     expect(isVisible).toBeTruthy();
  100 |   });
  101 | 
  102 |   // ── TC12: Recruitment Search Returns Results ───────────────────────────────
  103 |   test('TC12 — Recruitment search returns candidate records @critical', async () => {
  104 |     await searchPage.navigateToRecruitment();
  105 |     await searchPage.clickSearch(searchPage.recruitSearchButton);
  106 |     const rowCount = await searchPage.getTableRowCount(searchPage.recruitTableRows);
  107 |     expect(rowCount).toBeGreaterThanOrEqual(0);
  108 |   });
  109 | 
  110 |   // ── TC13: Recruitment Reset Works ─────────────────────────────────────────
  111 |   test('TC13 — Recruitment reset restores full candidates list @high', async () => {
  112 |     await searchPage.navigateToRecruitment();
  113 |     await searchPage.clickSearch(searchPage.recruitSearchButton);
  114 |     await searchPage.clickReset(searchPage.recruitResetButton);
  115 |     const isVisible = await searchPage.isTableVisible(searchPage.recruitTableBody);
  116 |     expect(isVisible).toBeTruthy();
  117 |   });
  118 | 
  119 |   // ── TC14: Leave Module Search Form Visible ────────────────────────────────
  120 |   test('TC14 — Leave module search filter form is visible @sanity', async ({ page }) => {
  121 |     await searchPage.navigateToLeave();
  122 |     const searchButton = page.getByRole('button', { name: 'Search' });
  123 |     await expect(searchButton).toBeVisible();
  124 |   });
  125 | 
  126 |   // ── TC15: Multiple Module Search Consistency ──────────────────────────────
  127 |   test('TC15 — Search and filter pattern is consistent across modules @high', async ({ page }) => {
  128 |     // Validate search button exists in PIM
  129 |     await searchPage.navigateToPIM();
  130 |     await expect(searchPage.pimSearchButton).toBeVisible();
  131 |     // Validate search button exists in Admin
  132 |     await searchPage.navigateToAdmin();
  133 |     await expect(searchPage.adminSearchButton).toBeVisible();
  134 |     // Validate search button exists in Recruitment
  135 |     await searchPage.navigateToRecruitment();
  136 |     await expect(searchPage.recruitSearchButton).toBeVisible();
  137 |   });
  138 | 
  139 | });
```