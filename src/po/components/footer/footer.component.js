class FooterComponent {
    // CSS — targets the Twitter link by its social list item class
    get twitterLink() {
        return $('.social_twitter a');
    }

    // XPath — targets the Facebook link by its list item class
    get facebookLink() {
        return $('//li[@class="social_facebook"]/a');
    }

    // CSS — targets the LinkedIn link by its social list item class
    get linkedInLink() {
        return $('.social_linkedin a');
    }

    // Scrolls the footer into view so the links can be interacted with
    async scrollToFooter() {
        await $('footer.footer').scrollIntoView();
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
