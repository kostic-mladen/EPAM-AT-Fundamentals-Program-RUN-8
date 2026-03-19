const { When, Then } = require('@cucumber/cucumber');
const { inventoryPage, productDetailsPage, headerComponent } = require('../../po');
const logger = require('../../configs/utils/logger');
const { pages } = require('../../data/testData');

// regular function (not arrow) so we can use `this` to share data between steps
When('I navigate to the details page for {string}', async function (productName) {
    this.inventoryData = await inventoryPage.getProductDataByName(productName);
    logger.info(`Inventory data captured — price: ${this.inventoryData.price}`);

    await inventoryPage.clickProductTitle(productName);
    await expect(await productDetailsPage.getUrl()).toContain(pages.productDetails);
    logger.info(`Navigated to details page for "${productName}"`);
});

Then('the price on the details page should match the inventory page', async function () {
    const detailsPrice = await productDetailsPage.getPrice();
    logger.info(`Details price: ${detailsPrice} | Inventory price: ${this.inventoryData.price}`);

    await expect(detailsPrice).toBe(this.inventoryData.price);
});

Then('the description on the details page should match the inventory page', async function () {
    const detailsDescription = await productDetailsPage.getDescription();
    logger.info(`Details description: "${detailsDescription}"`);
    logger.info(`Inventory description: "${this.inventoryData.description}"`);

    await expect(detailsDescription).toBe(this.inventoryData.description);
});

Then('I add the product to the cart from the details page', async () => {
    await productDetailsPage.addToCart();
});

Then('the cart count should be {int}', async (expectedCount) => {
    const cartCount = await headerComponent.getCartCount();
    await expect(cartCount).toBe(expectedCount);
});
