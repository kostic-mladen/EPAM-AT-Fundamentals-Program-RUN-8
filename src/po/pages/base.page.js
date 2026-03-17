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
}

module.exports = BasePage;
