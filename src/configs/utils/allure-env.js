require('dotenv').config({ override: true });
const fs = require('fs');
const os = require('os');

const browser = process.env.BROWSER
    ? process.env.BROWSER.charAt(0).toUpperCase() + process.env.BROWSER.slice(1)
    : 'Chrome, Firefox';

const properties = [
    `Browser=${browser}`,
    `Headless=${process.env.HEADLESS === 'true' ? 'true' : 'false'}`,
    `BaseUrl=https://www.saucedemo.com`,
    `NodeVersion=${process.version}`,
    `OS=${os.type()} ${os.release()}`
].join('\n');

fs.mkdirSync('allure-results', { recursive: true });
fs.writeFileSync('allure-results/environment.properties', properties);
fs.copyFileSync('src/configs/allure/categories.json', 'allure-results/categories.json');
