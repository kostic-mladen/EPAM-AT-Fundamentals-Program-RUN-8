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

module.exports = { users, products };
