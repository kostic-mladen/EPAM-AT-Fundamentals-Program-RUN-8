const pages = {
    inventory: '/inventory.html',
    productDetails: '/inventory-item.html'
};

// credentials come from .env
const users = {
    standard: {
        username: process.env.STANDARD_USER,
        password: process.env.STANDARD_PASSWORD
    }
};

const products = {
    fleeceJacket: 'Sauce Labs Fleece Jacket'
};

// expected hrefs for the footer social links
const socialLinks = {
    twitter: 'https://twitter.com/saucelabs',
    twitterX: 'https://x.com/saucelabs',
    facebook: 'https://www.facebook.com/saucelabs',
    linkedIn: 'https://www.linkedin.com/company/sauce-labs/'
};

// exact hostname+path for new-tab URL validation (strips query params and hash from redirected URLs)
// twitter is an array because the domain may resolve to either twitter.com or x.com after the rebrand
// facebook and linkedin are strings because they have a single stable domain
const socialLinkPatterns = {
    twitter: ['twitter.com/saucelabs', 'x.com/saucelabs'],
    facebook: 'www.facebook.com/saucelabs',
    linkedIn: 'www.linkedin.com/company/sauce-labs/'
};

module.exports = { users, products, socialLinks, socialLinkPatterns, pages };
