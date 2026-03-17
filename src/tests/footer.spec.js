const { loginComponent, inventoryPage, footerComponent } = require('../po');
const logger = require('../configs/utils/logger');
const { users, socialLinks } = require('../data/testData');

describe('UC-2: Footer & Social Links', () => {
    // Login once and scroll to footer — shared state for all tests in this suite
    before(async () => {
        await inventoryPage.open();
        await loginComponent.login(users.standard.username, users.standard.password);
        await expect($('.inventory_list')).toBeDisplayed();

        // Scroll to footer so social links are in view for all tests
        await footerComponent.scrollToFooter();
        logger.info('Scrolled to footer');
    });

    // Step 1 — Verify Twitter link is visible, has correct href, and opens correct URL in new tab
    it('should display Twitter link and open correct URL in a new tab', async () => {
        await expect(footerComponent.twitterLink).toBeDisplayed();
        await expect(await footerComponent.getLinkHref(footerComponent.twitterLink)).toBe(socialLinks.twitter);

        const url = await footerComponent.getSocialLinkUrl(footerComponent.twitterLink);
        logger.info(`Twitter new tab URL: ${url}`);

        // Twitter rebranded to X — accept both twitter.com and x.com redirects
        const isCorrectUrl = url.includes('twitter.com/saucelabs') || url.includes('x.com/saucelabs');
        await expect(isCorrectUrl).toBe(true);
    });

    // Step 2 — Verify Facebook link is visible, has correct href, and opens correct URL in new tab
    it('should display Facebook link and open correct URL in a new tab', async () => {
        await expect(footerComponent.facebookLink).toBeDisplayed();
        await expect(await footerComponent.getLinkHref(footerComponent.facebookLink)).toBe(socialLinks.facebook);

        const url = await footerComponent.getSocialLinkUrl(footerComponent.facebookLink);
        logger.info(`Facebook new tab URL: ${url}`);

        await expect(url).toContain('facebook.com/saucelabs');
    });

    // Step 3 — Verify LinkedIn link is visible, has correct href, and opens correct URL in new tab
    it('should display LinkedIn link and open correct URL in a new tab', async () => {
        await expect(footerComponent.linkedInLink).toBeDisplayed();
        await expect(await footerComponent.getLinkHref(footerComponent.linkedInLink)).toBe(socialLinks.linkedIn);

        const url = await footerComponent.getSocialLinkUrl(footerComponent.linkedInLink);
        logger.info(`LinkedIn new tab URL: ${url}`);

        await expect(url).toContain('linkedin.com/company/sauce-labs');
    });
});
