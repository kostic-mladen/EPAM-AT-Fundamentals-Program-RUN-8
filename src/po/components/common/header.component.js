class HeaderComponent {
    // CSS — targets the cart badge by its class name
    get cartBadge() {
        return $('.shopping_cart_badge');
    }

    // parseInt because getText() returns a string
    async getCartCount() {
        return parseInt(await this.cartBadge.getText(), 10);
    }
}

module.exports = new HeaderComponent();
