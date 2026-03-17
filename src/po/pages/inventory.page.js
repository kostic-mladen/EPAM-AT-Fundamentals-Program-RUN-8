const BasePage = require('./base.page');

// Page object for the Inventory (products listing) page (/inventory.html)
class InventoryPage extends BasePage {
    // Path used by BasePage.open() to navigate to this page
    get url() {
        return '/inventory.html';
    }

    // Iterates all inventory items and returns price + description for the matching product name
    async getProductDataByName(productName) {
        const items = await $$('.inventory_item');
        for (const item of items) {
            const name = await item.$('.inventory_item_name').getText();
            if (name.trim() === productName) {
                const price = await item.$('.inventory_item_price').getText();
                const description = await item.$('.inventory_item_desc').getText();
                return { price, description };
            }
        }
        throw new Error(`Product "${productName}" not found on inventory page`);
    }

    // Clicks the product title link to navigate to the Product Details page
    async clickProductTitle(productName) {
        const titleLink = await $(`//a[normalize-space(.)='${productName}']`);
        await titleLink.click();
    }
}

module.exports = new InventoryPage();
