const BasePage = require('./base.page');

class ProductDetailsPage extends BasePage {
    // XPath — targets the price element by its class attribute
    get priceEl() {
        return $('//div[@class="inventory_details_price"]');
    }

    // CSS — targets the description element by its class name
    get descriptionEl() {
        return $('.inventory_details_desc');
    }

    // XPath — starts-with so it matches regardless of which product name is in the data-test attribute
    get addToCartButton() {
        return $('//button[starts-with(@data-test,"add-to-cart")]');
    }

    // XPath — starts-with to match the remove button for any product
    get removeButton() {
        return $('//button[starts-with(@data-test,"remove")]');
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
