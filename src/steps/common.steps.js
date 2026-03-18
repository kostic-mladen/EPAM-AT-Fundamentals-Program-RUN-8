const { Given } = require('@cucumber/cucumber');
const { loginComponent, inventoryPage } = require('../po');
const logger = require('../configs/utils/logger');
const { users } = require('../data/testData');

// Shared step — reused across all feature files that require authentication
// Deletes cookies first to ensure each scenario starts unauthenticated
Given('I am logged in as standard user', async () => {
    await browser.deleteCookies();
    await inventoryPage.open();
    logger.info(`Logging in as "${users.standard.username}"`);
    await loginComponent.login(users.standard.username, users.standard.password);

    // Assert login succeeded by confirming the inventory list is visible
    await expect($('.inventory_list')).toBeDisplayed();
});
