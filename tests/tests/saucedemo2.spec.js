// sauceDemo.spec.js
const { test, expect } = require('@playwright/test');
const db = require('../../Utils/dbClient');

test('Standard user login and interaction', async ({ page }) => {
  const username = 'standard_user';

  await page.goto('https://www.saucedemo.com');

  // Login
  await page.fill('[data-test="username"]', username);
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');

  const testName = 'Standard user login and product interactions';
  const testStatus = 'pass';

  // Insert test run
  const result = await db.query(
    'INSERT INTO test_runs (test_name, username, status) VALUES ($1, $2, $3) RETURNING id',
    [testName, username, testStatus]
  );
  const testRunId = result.rows[0].id;

  // Insert login action
  await db.query(
    'INSERT INTO test_actions (test_run_id, action_type, element, value) VALUES ($1, $2, $3, $4)',
    [testRunId, 'login', '[data-test="username"]', username]
  );

  // Sort products
  const sortTypes = ['za', 'hilo', 'lohi', 'az'];
  for (const sort of sortTypes) {
    await page.selectOption('[data-test="product-sort-container"]', sort);
    await db.query(
      'INSERT INTO test_actions (test_run_id, action_type, element, value) VALUES ($1, $2, $3, $4)',
      [testRunId, 'sort', '[data-test="product-sort-container"]', sort]
    );
  }

  // Add to cart
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  await db.query(
    'INSERT INTO test_actions (test_run_id, action_type, element, value) VALUES ($1, $2, $3, $4)',
    [testRunId, 'add_to_cart', '[data-test="add-to-cart-sauce-labs-backpack"]', 'sauce-labs-backpack']
  );

  // Remove from cart
  await page.click('[data-test="remove-sauce-labs-backpack"]');
  await db.query(
    'INSERT INTO test_actions (test_run_id, action_type, element, value) VALUES ($1, $2, $3, $4)',
    [testRunId, 'remove_from_cart', '[data-test="remove-sauce-labs-backpack"]', 'sauce-labs-backpack']
  );

  // Logout
  await page.click('#react-burger-menu-btn');
  await page.click('[data-test="logout-sidebar-link"]');
  await db.query(
    'INSERT INTO test_actions (test_run_id, action_type, element, value) VALUES ($1, $2, $3, $4)',
    [testRunId, 'logout', '[data-test="logout-sidebar-link"]', null]
  );
});
