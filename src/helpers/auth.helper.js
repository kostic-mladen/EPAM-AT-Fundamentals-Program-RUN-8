const { loginComponent, inventoryPage } = require('../po');
const { users } = require('../data/testData');
const logger = require('../configs/utils/logger');

// Shared login helper for Mocha specs
async function loginAsStandardUser() {
    const { username, password } = users.standard;

    if (!username || !password) {
        logger.error('Missing credentials — check STANDARD_USER and STANDARD_PASSWORD in .env');
        throw new Error('Login credentials are not provided');
    }

    logger.info(`Logging in as "${username}"`);
    await inventoryPage.open();
    await loginComponent.login(username, password);

    await expect($('.inventory_list')).toBeDisplayed();
    logger.info('Login successful — inventory page loaded');
}

module.exports = { loginAsStandardUser };
