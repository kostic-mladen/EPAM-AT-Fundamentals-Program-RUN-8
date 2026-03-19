// Central export point for all page objects and components — import from here in tests
const loginComponent = require('./components/login/login.component');
const footerComponent = require('./components/footer/footer.component');
const headerComponent = require('./components/common/header.component');
const inventoryPage = require('./pages/inventory.page');
const productDetailsPage = require('./pages/productDetails.page');

module.exports = {
    loginComponent,
    footerComponent,
    headerComponent,
    inventoryPage,
    productDetailsPage
};
