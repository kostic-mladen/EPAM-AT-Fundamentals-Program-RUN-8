const BasePage = require('./base.page');

const SELECTORS = {
    item: '[data-test="inventory-item"]',
    name: '[data-test="inventory-item-name"]',
    price: '[data-test="inventory-item-price"]',
    desc: '[data-test="inventory-item-desc"]'
};

class InventoryPage extends BasePage {
    get url() {
        return '/inventory.html';
    }

    get inventoryItems() {
        return $$(SELECTORS.item);
    }

    // loops through all inventory items and returns price + description for the matching product
    async getProductDataByName(productName) {
        const items = await this.inventoryItems;
        for (const item of items) {
            const name = await item.$(SELECTORS.name).getText();
            if (name.trim() === productName) {
                const price = await item.$(SELECTORS.price).getText();
                const description = await item.$(SELECTORS.desc).getText();
                return { price, description };
            }
        }
        throw new Error(`Product "${productName}" not found on inventory page`);
    }

    // JS click bypasses GeckoDriver's strict interactability checks in Firefox headless
    // Filters by text in JS to safely handle product names with quotes or special characters
    async clickProductTitle(productName) {
        const links = await $$(SELECTORS.name);
        for (const link of links) {
            if ((await link.getText()).trim() === productName) {
                await browser.execute((el) => el.click(), link);
                await this.waitForPageLoad();
                return;
            }
        }
        throw new Error(`Product title "${productName}" not found`);
    }
}

module.exports = new InventoryPage();
