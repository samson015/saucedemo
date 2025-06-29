const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test('Valid login test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/inventory/);
});

test('Invalid login test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('invalid_user', 'invalid_pass');
  const error = await loginPage.getErrorMessage();
  expect(error).toContain('Username and password do not match');
});
