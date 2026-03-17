require('dotenv').config();

// User credentials loaded from .env — extend with additional roles as needed
const users = {
    standard: {
        username: process.env.STANDARD_USER,
        password: process.env.STANDARD_PASSWORD,
    },
};

// Extend with additional products as more tests are added
const products = {
    fleeceJacket: 'Sauce Labs Fleece Jacket',
};

// Expected social media URLs used in footer link verification
const socialLinks = {
    twitter: 'https://twitter.com/saucelabs',
    facebook: 'https://www.facebook.com/saucelabs',
    linkedIn: 'https://www.linkedin.com/company/sauce-labs/',
};

module.exports = { users, products, socialLinks };
