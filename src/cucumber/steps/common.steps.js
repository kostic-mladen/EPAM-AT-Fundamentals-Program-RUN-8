const { Given } = require('@cucumber/cucumber');
const { loginComponent, inventoryPage } = require('../../po');
const logger = require('../../configs/utils/logger');
const { users } = require('../../data/testData');

// used by both feature files
Given('I am logged in as standard user', async () => {
    await inventoryPage.open();
    logger.info(`Logging in as "${users.standard.username}"`);
    await loginComponent.login(users.standard.username, users.standard.password);
    await expect($('.inventory_list')).toBeDisplayed();
});
