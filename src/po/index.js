// Central export point for all page objects and components — import from here in tests
const loginComponent = require('./components/login/login.component');
const inventoryPage = require('./pages/inventory.page');
const productDetailsPage = require('./pages/productDetails.page');

module.exports = { loginComponent, inventoryPage, productDetailsPage };
