const SELECTORS = {
    twitter: '.social_twitter a',
    facebook: '.social_facebook a',
    linkedin: '.social_linkedin a',
    footer: 'footer.footer'
};

class FooterComponent {
    get twitterLink() {
        return $(SELECTORS.twitter);
    }

    get facebookLink() {
        return $(SELECTORS.facebook);
    }

    get linkedInLink() {
        return $(SELECTORS.linkedin);
    }

    async scrollToFooter() {
        await $(SELECTORS.footer).scrollIntoView();
    }

    async getLinkHref(linkElement) {
        return await linkElement.getAttribute('href');
    }

    // Clicks the link, waits for the new tab to open and load, gets the URL, then closes the tab and returns the URL
    async getSocialLinkUrl(linkElement) {
        await linkElement.click();

        // wait for the new tab to open by checking that the number of window handles has increased to 2
        await browser.waitUntil(async () => (await browser.getWindowHandles()).length > 1);
        const handles = await browser.getWindowHandles();
        await browser.switchToWindow(handles[1]);

        // wait for the new page to load by checking that the URL is no longer 'about:blank' (the default for new tabs)
        await browser.waitUntil(async () => (await browser.getUrl()) !== 'about:blank', {
            timeout: 10000
        });

        const url = await browser.getUrl();
        await browser.closeWindow();
        await browser.switchToWindow(handles[0]);

        return url;
    }
}

module.exports = new FooterComponent();
