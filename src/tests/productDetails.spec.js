const { inventoryPage, productDetailsPage, headerComponent } = require('../po');
const { loginAsStandardUser } = require('../helpers/auth.helper');
const logger = require('../configs/utils/logger');
const { products, pages } = require('../data/testData');

// Parametrize by changing this to any key from testData.products
const PRODUCT_NAME = products.fleeceJacket;

describe('UC-1: Product Details Verification', () => {
    let inventoryData;

    before(async () => {
        await loginAsStandardUser();

        // Capture product data before navigating away from inventory
        inventoryData = await inventoryPage.getProductDataByName(PRODUCT_NAME);
        logger.info(`Inventory data captured — price: ${inventoryData.price}`);

        // Navigate to the product details page
        await inventoryPage.clickProductTitle(PRODUCT_NAME);
        await expect(await productDetailsPage.getUrl()).toContain(pages.productDetails);
        logger.info(`Navigated to details page for "${PRODUCT_NAME}"`);
    });

    after(async () => {
        await browser.deleteCookies();
        logger.info('Cookies cleared after UC-1 suite');
    });

    it(`should display correct price for "${PRODUCT_NAME}" on the details page`, async () => {
        const detailsPrice = await productDetailsPage.getPrice();
        logger.info(`Details price: ${detailsPrice} | Inventory price: ${inventoryData.price}`);

        await expect(detailsPrice).toBe(inventoryData.price);
    });

    it(`should display correct description for "${PRODUCT_NAME}" on the details page`, async () => {
        const detailsDescription = await productDetailsPage.getDescription();
        logger.info(`Details description: "${detailsDescription}"`);
        logger.info(`Inventory description: "${inventoryData.description}"`);

        await expect(detailsDescription).toBe(inventoryData.description);
    });

    it(`should add "${PRODUCT_NAME}" to cart from the details page`, async () => {
        await productDetailsPage.addToCart();
        logger.info(`"${PRODUCT_NAME}" added to cart`);

        const cartCount = await headerComponent.getCartCount();
        logger.info(`Cart badge count: ${cartCount}`);
        await expect(cartCount).toBe(1);
    });
});
