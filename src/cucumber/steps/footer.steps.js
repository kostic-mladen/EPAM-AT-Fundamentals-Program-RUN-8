const { When, Then } = require('@cucumber/cucumber');
const { footerComponent } = require('../../po');
const logger = require('../../configs/utils/logger');
const { socialLinks, socialLinkPatterns } = require('../../data/testData');

When('I scroll to the footer', async () => {
    await footerComponent.scrollToFooter();
    logger.info('Scrolled to footer');
});

Then('the Twitter link should be displayed with the Twitter href', async () => {
    await expect(footerComponent.twitterLink).toBeDisplayed();

    // TO DO: Twitter rebranded to X — accept both until Sauce Labs updates the DOM href to x.com
    const href = await footerComponent.getLinkHref(footerComponent.twitterLink);
    logger.info(`Twitter DOM href: ${href}`);
    const isCorrectHref = href === socialLinks.twitter || href === socialLinks.twitterX;
    await expect(isCorrectHref).toBe(true);
});

Then(/^clicking the Twitter link should open the Twitter\/X URL in a new tab$/, async () => {
    const url = await footerComponent.getSocialLinkUrl(footerComponent.twitterLink);
    logger.info(`Twitter new tab URL: ${url}`);

    // Twitter rebranded to X — both domains are valid, parse URL for exact hostname+path match
    const { hostname, pathname } = new URL(url);
    await expect(socialLinkPatterns.twitter).toContain(hostname + pathname);
});

Then('the Facebook link should be displayed with the Facebook href', async () => {
    await expect(footerComponent.facebookLink).toBeDisplayed();

    const href = await footerComponent.getLinkHref(footerComponent.facebookLink);
    logger.info(`Facebook DOM href: ${href}`);
    await expect(href).toBe(socialLinks.facebook);
});

Then('clicking the Facebook link should open the Facebook URL in a new tab', async () => {
    const url = await footerComponent.getSocialLinkUrl(footerComponent.facebookLink);
    logger.info(`Facebook new tab URL: ${url}`);

    // parse URL to get hostname+pathname only — ignores query params and hash that Facebook may append on redirect
    const { hostname, pathname } = new URL(url);
    await expect(hostname + pathname).toBe(socialLinkPatterns.facebook);
});

Then('the LinkedIn link should be displayed with the LinkedIn href', async () => {
    await expect(footerComponent.linkedInLink).toBeDisplayed();

    const href = await footerComponent.getLinkHref(footerComponent.linkedInLink);
    logger.info(`LinkedIn DOM href: ${href}`);
    await expect(href).toBe(socialLinks.linkedIn);
});

Then('clicking the LinkedIn link should open the LinkedIn URL in a new tab', async () => {
    const url = await footerComponent.getSocialLinkUrl(footerComponent.linkedInLink);
    logger.info(`LinkedIn new tab URL: ${url}`);

    // parse URL to get hostname+pathname only — ignores query params and hash that LinkedIn may append on redirect
    const { hostname, pathname } = new URL(url);
    await expect(hostname + pathname).toBe(socialLinkPatterns.linkedIn);
});
