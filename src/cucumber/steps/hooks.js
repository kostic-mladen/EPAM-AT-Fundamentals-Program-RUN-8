const { Before, After } = require('@cucumber/cucumber');
const logger = require('../../configs/utils/logger');

Before(async () => {
    await browser.deleteCookies();
    logger.info('Cookies cleared before scenario');
});

After(async () => {
    await browser.deleteCookies();
    logger.info('Cookies cleared after scenario');
});
