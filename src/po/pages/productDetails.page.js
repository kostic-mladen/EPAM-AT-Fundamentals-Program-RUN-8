const BasePage = require('./base.page');

// Page object for the Product Details page (/inventory-item.html)
class ProductDetailsPage extends BasePage {
    // XPath — locate price by its class attribute
    get priceEl() {
        return $('//div[@class="inventory_details_price"]');
    }

    // CSS — description element by class name
    get descriptionEl() {
        return $('.inventory_details_desc');
    }

    // XPath — matches any add-to-cart button regardless of the product name in data-test
    get addToCartButton() {
        return $('//button[starts-with(@data-test,"add-to-cart")]');
    }

    // XPath — appears after adding to cart, confirms the item is in the cart
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
