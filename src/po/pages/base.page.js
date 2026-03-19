// Base page class — all page objects extend this to inherit common navigation and shared behaviour
class BasePage {
    // Override in subclasses to define the page-specific path (e.g. '/inventory.html')
    get url() {
        return '';
    }

    // Navigates to the page using the subclass-defined url getter
    open() {
        return browser.url(this.url);
    }

    // Returns the current browser URL
    getUrl() {
        return browser.getUrl();
    }

    // Waits for the page to reach a 'complete' ready state
    async waitForPageLoad() {
        await browser.waitUntil(
            () => browser.execute('return document.readyState === "complete"'),
            { timeout: 10000, timeoutMsg: 'Page did not reach ready state within 10s' }
        );
    }
}

module.exports = BasePage;
