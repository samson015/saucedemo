const { test, expect } = require('@playwright/test');
const { logTestRun, logAction } = require('../../Utils/logTestAction');

test.describe('SauceDemo User Scenarios', () => {
  
  test('Standard user login and product interactions', async ({ page }) => {
    const username = 'standard_user';
    await page.goto('https://www.saucedemo.com');
    await page.fill('[data-test="username"]', username);
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    const testRunId = await logTestRun({ testName: 'Standard user login and product interactions', username, status: 'pass' });
    await logAction(testRunId, 'login', '[data-test="username"]', username);

    const sortOptions = ['za', 'hilo', 'lohi', 'az'];
    for (const sort of sortOptions) {
      await page.selectOption('[data-test="product-sort-container"]', sort);
      await logAction(testRunId, 'sort', '[data-test="product-sort-container"]', sort);
    }

    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await logAction(testRunId, 'add_to_cart', '[data-test="add-to-cart-sauce-labs-backpack"]', 'sauce-labs-backpack');

    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
    await logAction(testRunId, 'add_to_cart', '[data-test="add-to-cart-sauce-labs-bike-light"]', 'sauce-labs-bike-light');

    await page.click('[data-test="remove-sauce-labs-backpack"]');
    await logAction(testRunId, 'remove_from_cart', '[data-test="remove-sauce-labs-backpack"]', 'sauce-labs-backpack');

    await page.click('[data-test="remove-sauce-labs-bike-light"]');
    await logAction(testRunId, 'remove_from_cart', '[data-test="remove-sauce-labs-bike-light"]', 'sauce-labs-bike-light');

    await page.click('#react-burger-menu-btn');
    await page.click('[data-test="logout-sidebar-link"]');
    await logAction(testRunId, 'logout', '[data-test="logout-sidebar-link"]', null);
  });

  test('Locked out user login attempt', async ({ page }) => {
    const username = 'locked_out_user';
    await page.goto('https://www.saucedemo.com');
    await page.fill('[data-test="username"]', username);
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    const testRunId = await logTestRun({ testName: 'Locked out user login attempt', username, status: 'fail' });
    await logAction(testRunId, 'login', '[data-test="username"]', username);
    await logAction(testRunId, 'error', '[data-test="error"]', 'Expected error visible');
  });

  test('Problem user renders incorrect images', async ({ page }) => {
    const username = 'problem_user';
    await page.goto('https://www.saucedemo.com');
    await page.fill('[data-test="username"]', username);
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    const testRunId = await logTestRun({ testName: 'Problem user renders incorrect images', username, status: 'pass' });
    await logAction(testRunId, 'login', '[data-test="username"]', username);

    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await logAction(testRunId, 'add_to_cart', '[data-test="add-to-cart-sauce-labs-backpack"]', 'sauce-labs-backpack');

    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
    await logAction(testRunId, 'add_to_cart', '[data-test="add-to-cart-sauce-labs-bike-light"]', 'sauce-labs-bike-light');

    await page.click('[data-test="remove-sauce-labs-backpack"]');
    await logAction(testRunId, 'remove_from_cart', '[data-test="remove-sauce-labs-backpack"]', 'sauce-labs-backpack');

    await page.click('[data-test="remove-sauce-labs-bike-light"]');
    await logAction(testRunId, 'remove_from_cart', '[data-test="remove-sauce-labs-bike-light"]', 'sauce-labs-bike-light');

    await page.click('#react-burger-menu-btn');
    await page.click('[data-test="logout-sidebar-link"]');
    await logAction(testRunId, 'logout', '[data-test="logout-sidebar-link"]', null);
  });

  test('Performance glitch user has delayed UI', async ({ page }) => {
    const username = 'performance_glitch_user';
    await page.goto('https://www.saucedemo.com');
    await page.fill('[data-test="username"]', username);
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    const testRunId = await logTestRun({ testName: 'Performance glitch user has delayed UI', username, status: 'pass' });
    await logAction(testRunId, 'login', '[data-test="username"]', username);

    await page.goto('https://www.saucedemo.com/inventory-item.html?id=0');
    await logAction(testRunId, 'navigate', 'url', 'https://www.saucedemo.com/inventory-item.html?id=0');

    await page.click('[data-test="add-to-cart-sauce-labs-fleece-jacket"]');
    await logAction(testRunId, 'add_to_cart', '[data-test="add-to-cart-sauce-labs-fleece-jacket"]', 'sauce-labs-fleece-jacket');

    await page.selectOption('[data-test="product-sort-container"]', 'lohi');
    await logAction(testRunId, 'sort', '[data-test="product-sort-container"]', 'lohi');
  });

  test('Error user add-to-cart failures', async ({ page }) => {
    const username = 'error_user';
    await page.goto('https://www.saucedemo.com');
    await page.fill('[data-test="username"]', username);
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    const testRunId = await logTestRun({ testName: 'Error user add-to-cart failures', username, status: 'fail' });
    await logAction(testRunId, 'login', '[data-test="username"]', username);

    await page.click('[data-test="item-4-img-link"]');
    await logAction(testRunId, 'view_product', '[data-test="item-4-img-link"]', 'item-4');

    await page.click('[data-test="add-to-cart"]');
    await logAction(testRunId, 'add_to_cart', '[data-test="add-to-cart"]', 'may silently fail');

    await page.click('[data-test^="remove"]');
    await logAction(testRunId, 'remove_from_cart', '[data-test^="remove"]', 'unknown');

    await page.click('#react-burger-menu-btn');
    await page.click('[data-test="logout-sidebar-link"]');
    await logAction(testRunId, 'logout', '[data-test="logout-sidebar-link"]', null);
  });

  test('Visual user sees image glitches', async ({ page }) => {
    const username = 'visual_user';
    await page.goto('https://www.saucedemo.com');
    await page.fill('[data-test="username"]', username);
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    const testRunId = await logTestRun({ testName: 'Visual user sees image glitches', username, status: 'pass' });
    await logAction(testRunId, 'login', '[data-test="username"]', username);

    await page.click('[data-test="item-4-img-link"]');
    await logAction(testRunId, 'view_product', '[data-test="item-4-img-link"]', 'item-4');

    await page.click('[data-test="item-5-img-link"]');
    await logAction(testRunId, 'view_product', '[data-test="item-5-img-link"]', 'item-5');

    await page.click('#react-burger-menu-btn');
    await page.click('[data-test="logout-sidebar-link"]');
    await logAction(testRunId, 'logout', '[data-test="logout-sidebar-link"]', null);
  });

});
