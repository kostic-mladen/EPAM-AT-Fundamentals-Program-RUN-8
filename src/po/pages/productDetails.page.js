const BasePage = require('./base.page');

const SELECTORS = {
    price: '[data-test="inventory-item-price"]',
    desc: '[data-test="inventory-item-desc"]',
    addToCart: '//button[starts-with(@data-test,"add-to-cart")]',
    remove: '//button[starts-with(@data-test,"remove")]'
};

class ProductDetailsPage extends BasePage {
    get priceEl() {
        return $(SELECTORS.price);
    }

    get descriptionEl() {
        return $(SELECTORS.desc);
    }

    get addToCartButton() {
        return $(SELECTORS.addToCart);
    }

    get removeButton() {
        return $(SELECTORS.remove);
    }

    async getPrice() {
        return await this.priceEl.getText();
    }

    async getDescription() {
        return await this.descriptionEl.getText();
    }

    async addToCart() {
        await this.addToCartButton.click();
    }
}

module.exports = new ProductDetailsPage();
