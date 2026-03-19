require('dotenv').config({ override: true });

const isHeadless = process.env.HEADLESS === 'true';

// Select browsers via BROWSER env variable: 'chrome', 'firefox', or unset for both
const browserFilter = process.env.BROWSER?.toLowerCase();

const chromeCapability = {
    browserName: 'chrome',
    'goog:chromeOptions': {
        args: [
            ...(isHeadless ? ['--headless=new', '--disable-gpu'] : []),
            '--window-size=1920,1080'
        ]
    }
};

const firefoxCapability = {
    browserName: 'firefox',
    'moz:firefoxOptions': {
        args: [...(isHeadless ? ['-headless'] : []), '--width=1920', '--height=1080']
    }
};

// Shared browser capabilities — reused across Mocha and Cucumber configs
const capabilities =
    browserFilter === 'chrome'
        ? [chromeCapability]
        : browserFilter === 'firefox'
          ? [firefoxCapability]
          : [chromeCapability, firefoxCapability];

// Shared config — extended by wdio.conf.js and wdio.cucumber.conf.js
const baseConfig = {
    runner: 'local',

    // 4 = 2 spec files x 2 browsers running in parallel
    maxInstances: 4,

    capabilities,

    logLevel: 'error',
    baseUrl: 'https://www.saucedemo.com',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    reporters: [
        'spec',
        [
            'allure',
            {
                outputDir: 'allure-results',
                disableWebdriverStepsReporting: true,
                disableWebdriverScreenshotsReporting: false
            }
        ]
    ],

    // Runs once before all tests — maximize browser window for consistent viewport
    before: function () {
        browser.maximizeWindow();
    }
};

module.exports = { baseConfig };
