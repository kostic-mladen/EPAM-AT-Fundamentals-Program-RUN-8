const { footerComponent } = require('../po');
const { loginAsStandardUser } = require('../helpers/auth.helper');
const logger = require('../configs/utils/logger');
const { socialLinks, socialLinkPatterns } = require('../data/testData');

describe('UC-2: Footer & Social Links', () => {
    beforeEach(async () => {
        await loginAsStandardUser();

        await footerComponent.scrollToFooter();
        logger.info('Scrolled to footer');
    });

    afterEach(async () => {
        await browser.deleteCookies();
        logger.info('Cookies cleared after test');
    });

    it('should display Twitter link and open Twitter/X URL in a new tab', async () => {
        await expect(footerComponent.twitterLink).toBeDisplayed();

        // TO DO: Twitter rebranded to X — accept both until Sauce Labs updates the DOM href to x.com
        const href = await footerComponent.getLinkHref(footerComponent.twitterLink);
        logger.info(`Twitter DOM href: ${href}`);
        const isCorrectHref = href === socialLinks.twitter || href === socialLinks.twitterX;
        await expect(isCorrectHref).toBe(true);

        const url = await footerComponent.getSocialLinkUrl(footerComponent.twitterLink);
        logger.info(`Twitter/X new tab URL: ${url}`);

        // Also accept both after redirect — parse URL for exact hostname+path match
        const { hostname, pathname } = new URL(url);
        await expect(socialLinkPatterns.twitter).toContain(hostname + pathname);
    });

    it('should display Facebook link and open Facebook URL in a new tab', async () => {
        await expect(footerComponent.facebookLink).toBeDisplayed();

        const href = await footerComponent.getLinkHref(footerComponent.facebookLink);
        logger.info(`Facebook DOM href: ${href}`);
        await expect(href).toBe(socialLinks.facebook);

        const url = await footerComponent.getSocialLinkUrl(footerComponent.facebookLink);
        logger.info(`Facebook new tab URL: ${url}`);
        const { hostname, pathname } = new URL(url);
        await expect(hostname + pathname).toBe(socialLinkPatterns.facebook);
    });

    it('should display LinkedIn link and open LinkedIn URL in a new tab', async () => {
        await expect(footerComponent.linkedInLink).toBeDisplayed();

        const href = await footerComponent.getLinkHref(footerComponent.linkedInLink);
        logger.info(`LinkedIn DOM href: ${href}`);
        await expect(href).toBe(socialLinks.linkedIn);

        const url = await footerComponent.getSocialLinkUrl(footerComponent.linkedInLink);
        logger.info(`LinkedIn new tab URL: ${url}`);
        const { hostname, pathname } = new URL(url);
        await expect(hostname + pathname).toBe(socialLinkPatterns.linkedIn);
    });
});
