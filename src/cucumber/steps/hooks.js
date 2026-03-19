const { Before, After } = require('@cucumber/cucumber');
const logger = require('../../configs/utils/logger');

Before(async () => {
    await browser.deleteCookies();
    logger.info('Cookies cleared before scenario');
});

After(async function () {
    await browser.deleteCookies();

    if (this.result?.status === 'FAILED') {
        logger.error(`Scenario failed: ${this.pickle?.name}`);
    } else {
        logger.info('Cookies cleared after scenario');
    }
});
