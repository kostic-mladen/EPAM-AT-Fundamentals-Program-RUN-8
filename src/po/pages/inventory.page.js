const BasePage = require('./base.page');

class InventoryPage extends BasePage {
    get url() {
        return '/inventory.html';
    }

    // loops through all inventory items and returns price + description for the matching product
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

    // XPath — normalize-space handles any extra whitespace in the link text
    // JS click bypasses GeckoDriver's strict interactability checks in Firefox headless
    async clickProductTitle(productName) {
        const titleLink = await $(`//a[normalize-space(.)='${productName}']`);
        await browser.execute((el) => el.click(), titleLink);
        await this.waitForPageLoad();
    }
}

module.exports = new InventoryPage();
