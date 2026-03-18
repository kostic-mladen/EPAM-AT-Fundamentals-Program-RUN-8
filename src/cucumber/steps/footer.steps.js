const { When, Then } = require('@cucumber/cucumber');
const { footerComponent } = require('../../po');
const logger = require('../../configs/utils/logger');
const { socialLinks } = require('../../data/testData');

// Scroll to the footer so social links are in view
When('I scroll to the footer', async () => {
    await footerComponent.scrollToFooter();
    logger.info('Scrolled to footer');
});

// Assert Twitter link is visible and has the correct href
Then('the Twitter link should be displayed with the correct href', async () => {
    await expect(footerComponent.twitterLink).toBeDisplayed();
    await expect(await footerComponent.getLinkHref(footerComponent.twitterLink)).toBe(socialLinks.twitter);
});

// Assert clicking Twitter opens the correct URL in a new tab
Then('clicking the Twitter link should open the correct URL in a new tab', async () => {
    const url = await footerComponent.getSocialLinkUrl(footerComponent.twitterLink);
    logger.info(`Twitter new tab URL: ${url}`);

    // Twitter rebranded to X — accept both twitter.com and x.com redirects
    const isCorrectUrl = url.includes('twitter.com/saucelabs') || url.includes('x.com/saucelabs');
    await expect(isCorrectUrl).toBe(true);
});

// Assert Facebook link is visible and has the correct href
Then('the Facebook link should be displayed with the correct href', async () => {
    await expect(footerComponent.facebookLink).toBeDisplayed();
    await expect(await footerComponent.getLinkHref(footerComponent.facebookLink)).toBe(socialLinks.facebook);
});

// Assert clicking Facebook opens the correct URL in a new tab
Then('clicking the Facebook link should open the correct URL in a new tab', async () => {
    const url = await footerComponent.getSocialLinkUrl(footerComponent.facebookLink);
    logger.info(`Facebook new tab URL: ${url}`);

    await expect(url).toContain('facebook.com/saucelabs');
});

// Assert LinkedIn link is visible and has the correct href
Then('the LinkedIn link should be displayed with the correct href', async () => {
    await expect(footerComponent.linkedInLink).toBeDisplayed();
    await expect(await footerComponent.getLinkHref(footerComponent.linkedInLink)).toBe(socialLinks.linkedIn);
});

// Assert clicking LinkedIn opens the correct URL in a new tab
Then('clicking the LinkedIn link should open the correct URL in a new tab', async () => {
    const url = await footerComponent.getSocialLinkUrl(footerComponent.linkedInLink);
    logger.info(`LinkedIn new tab URL: ${url}`);

    await expect(url).toContain('linkedin.com/company/sauce-labs');
});
