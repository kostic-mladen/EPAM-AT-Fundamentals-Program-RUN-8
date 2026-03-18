const { When, Then } = require('@cucumber/cucumber');
const { inventoryPage, productDetailsPage, headerComponent } = require('../../po');
const logger = require('../../configs/utils/logger');

// Navigate to the details page and capture inventory data into the World object
// Using regular functions (not arrow functions) to access Cucumber's `this` (World) context
When('I navigate to the details page for {string}', async function (productName) {
    this.inventoryData = await inventoryPage.getProductDataByName(productName);
    logger.info(`Inventory data captured — price: ${this.inventoryData.price}`);

    await inventoryPage.clickProductTitle(productName);
    logger.info(`Navigated to details page for "${productName}"`);
});

// Assert price on details page matches the inventory page
Then('the price on the details page should match the inventory page', async function () {
    const detailsPrice = await productDetailsPage.getPrice();
    logger.info(`Details price: ${detailsPrice} | Inventory price: ${this.inventoryData.price}`);

    await expect(detailsPrice).toBe(this.inventoryData.price);
});

// Assert description on details page matches the inventory page
Then('the description on the details page should match the inventory page', async function () {
    const detailsDescription = await productDetailsPage.getDescription();
    logger.info(`Details description matches inventory: ${detailsDescription === this.inventoryData.description}`);

    await expect(detailsDescription).toBe(this.inventoryData.description);
});

// Add the product to the cart from the details page
Then('I add the product to the cart from the details page', async () => {
    await productDetailsPage.addToCart();
});

// Assert the Remove button is displayed and cart badge shows 1 after adding to cart
Then('the Remove button should be displayed', async () => {
    await expect(productDetailsPage.removeButton).toBeDisplayed();

    // Confirm the cart badge reflects the correct item count
    const cartCount = await headerComponent.getCartCount();
    await expect(cartCount).toBe(1);
});
