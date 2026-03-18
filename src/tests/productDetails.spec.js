const { loginComponent, inventoryPage, productDetailsPage, headerComponent } = require('../po');
const logger = require('../configs/utils/logger');
const { users, products } = require('../data/testData');

// Parametrize by changing this to any key from testData.products
const PRODUCT_NAME = products.fleeceJacket;

describe('UC-1: Product Details Verification', () => {
    // Shared data captured from the inventory page and reused across the flow
    let inventoryData;

    // Step 1 — Login once and capture product data from the inventory page
    before(async () => {
        await inventoryPage.open();
        logger.info(`Logging in as "${users.standard.username}"`);
        await loginComponent.login(users.standard.username, users.standard.password);

        // Assert login succeeded by confirming the inventory list is visible
        await expect($('.inventory_list')).toBeDisplayed();

        // Capture product data before navigating away from inventory
        inventoryData = await inventoryPage.getProductDataByName(PRODUCT_NAME);
        logger.info(`Inventory data captured — price: ${inventoryData.price}`);

        // Step 2 — Navigate to the product details page
        await inventoryPage.clickProductTitle(PRODUCT_NAME);
        logger.info(`Navigated to details page for "${PRODUCT_NAME}"`);
    });

    // Step 3 — Verify the price on the details page matches the inventory page
    it(`should display correct price for "${PRODUCT_NAME}" on the details page`, async () => {
        const detailsPrice = await productDetailsPage.getPrice();
        logger.info(`Details price: ${detailsPrice} | Inventory price: ${inventoryData.price}`);

        await expect(detailsPrice).toBe(inventoryData.price);
    });

    // Step 4 — Verify the description on the details page matches the inventory page
    it(`should display correct description for "${PRODUCT_NAME}" on the details page`, async () => {
        const detailsDescription = await productDetailsPage.getDescription();
        logger.info(`Details description matches inventory: ${detailsDescription === inventoryData.description}`);

        await expect(detailsDescription).toBe(inventoryData.description);
    });

    // Step 5 — Add the item to cart and confirm the button switches to "Remove" and cart badge shows 1
    it(`should add "${PRODUCT_NAME}" to cart from the details page`, async () => {
        await productDetailsPage.addToCart();
        logger.info(`"${PRODUCT_NAME}" added to cart`);

        // Confirm the button switched to "Remove" after adding to cart
        await expect(productDetailsPage.removeButton).toBeDisplayed();

        // Confirm the cart badge reflects the correct item count
        const cartCount = await headerComponent.getCartCount();
        logger.info(`Cart badge count: ${cartCount}`);
        await expect(cartCount).toBe(1);
    });
});
