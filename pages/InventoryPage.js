const { expect } = require('@playwright/test');

exports.InventoryPage = class InventoryPage {
    
  constructor(page) {
    this.page = page;
    this.cartIcon = page.locator('.shopping_cart_link');

    // Use proper XPath to directly target each item's container and its button
    this.items = {
      "Sauce Labs Backpack": page.locator('//div[text()="Sauce Labs Backpack"]/ancestor::div[@class="inventory_item"]//button'),
      "Sauce Labs Bike Light": page.locator('//div[text()="Sauce Labs Bike Light"]/ancestor::div[@class="inventory_item"]//button'),
      "Sauce Labs Bolt T-Shirt": page.locator('//div[text()="Sauce Labs Bolt T-Shirt"]/ancestor::div[@class="inventory_item"]//button'),
      "Sauce Labs Fleece Jacket": page.locator('//div[text()="Sauce Labs Fleece Jacket"]/ancestor::div[@class="inventory_item"]//button'),
      "Sauce Labs Onesie": page.locator('//div[text()="Sauce Labs Onesie"]/ancestor::div[@class="inventory_item"]//button'),
      "Test.allTheThings() T-Shirt (Red)": page.locator('//div[text()="Test.allTheThings() T-Shirt (Red)"]/ancestor::div[@class="inventory_item"]//button'),
    };
  }

  async addItemToCart(itemName) {
    const button = this.items[itemName];
    await button.click();
  }

  async removeItemFromCart(itemName) {
    const button = this.items[itemName];
    await button.click(); // Button text toggles between 'Add to cart' and 'Remove'
  }

  async goToCart() {
    await this.cartIcon.click();
  }

  async addMultipleItems(items) {
    for (const item of items) {
      await this.addItemToCart(item);
    }
  }

  async verifyCartCount(expectedCount) {
    const cartBadge = this.page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText(expectedCount.toString());
  }
};
