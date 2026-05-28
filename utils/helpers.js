// =============================================================================
// utils/helpers.js
// OrangeHRM Framework — Reusable Helper Utilities
// =============================================================================

/**
 * Generate a random string — used for unique employee/user names
 */
export function generateRandomString(length = 6) {
  return Math.random().toString(36).substring(2, 2 + length);
}

/**
 * Generate a unique employee name for PIM tests
 */
export function generateEmployeeName() {
  const suffix = generateRandomString(4);
  return {
    firstName: `Test${suffix}`,
    lastName: `Auto${suffix}`,
  };
}

/**
 * Format date to OrangeHRM expected format: YYYY-DD-MM
 */
export function formatDate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Wait for a fixed duration — use sparingly, only when no better option exists
 * Prefer Playwright's built-in auto-waiting over this
 */
export async function pause(ms) {
  await new Promise(resolve => setTimeout(resolve, ms));
}