// Component representing the footer social links section
class FooterComponent {
    // CSS — Twitter social link anchor
    get twitterLink() {
        return $('.social_twitter a');
    }

    // XPath — Facebook social link anchor
    get facebookLink() {
        return $('//li[@class="social_facebook"]/a');
    }

    // CSS — LinkedIn social link anchor
    get linkedInLink() {
        return $('.social_linkedin a');
    }

    // Scrolls the footer into view so social links become interactable
    async scrollToFooter() {
        await $('footer.footer').scrollIntoView();
    }

    // Returns the href attribute value of a given social link element
    async getLinkHref(linkElement) {
        return await linkElement.getAttribute('href');
    }

    // Clicks a social link and returns the URL opened in the new tab
    async getSocialLinkUrl(linkElement) {
        await linkElement.click();

        // Wait for the new tab to open and switch to it
        await browser.waitUntil(async () => (await browser.getWindowHandles()).length > 1);
        const handles = await browser.getWindowHandles();
        await browser.switchToWindow(handles[1]);

        // Wait for the new tab to finish navigating away from about:blank
        await browser.waitUntil(async () => (await browser.getUrl()) !== 'about:blank', { timeout: 10000 });

        // Capture URL then close the new tab and switch back
        const url = await browser.getUrl();
        await browser.closeWindow();
        await browser.switchToWindow(handles[0]);

        return url;
    }
}

module.exports = new FooterComponent();
