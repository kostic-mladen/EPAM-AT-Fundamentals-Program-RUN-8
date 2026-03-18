// Common header component — present on all pages after login
class HeaderComponent {
    // CSS — cart badge showing number of items currently in the cart
    get cartBadge() {
        return $('.shopping_cart_badge');
    }

    // Returns the current cart item count as a number
    async getCartCount() {
        return parseInt(await this.cartBadge.getText(), 10);
    }
}

module.exports = new HeaderComponent();
