require('dotenv').config();

// Toggle headless mode via HEADLESS env variable (set in .env)
const isHeadless = process.env.HEADLESS === 'true';

// Shared browser capabilities — reused across Mocha and Cucumber configs
const capabilities = [
    {
        // Chrome — headless controlled via HEADLESS env variable
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [
                ...(isHeadless ? ['--headless=new', '--disable-gpu'] : []),
                '--window-size=1920,1080'
            ]
        }
    },
    {
        // Firefox — headless controlled via HEADLESS env variable
        browserName: 'firefox',
        'moz:firefoxOptions': {
            args: [
                ...(isHeadless ? ['-headless'] : []),
                '--width=1920',
                '--height=1080'
            ]
        }
    }
];

// Shared config — extended by wdio.conf.js and wdio.cucumber.conf.js
const baseConfig = {
    runner: 'local',

    // 2 = one instance per browser running in parallel
    maxInstances: 2,

    capabilities,

    logLevel: 'error',
    baseUrl: 'https://www.saucedemo.com',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    reporters: ['spec'],

    // Runs once before all tests — maximize browser window for consistent viewport
    before: function () {
        browser.maximizeWindow();
    }
};

module.exports = { baseConfig };
