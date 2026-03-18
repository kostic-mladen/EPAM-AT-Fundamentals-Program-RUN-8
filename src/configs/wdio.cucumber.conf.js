const path = require('path');
const { baseConfig } = require('./wdio.base.conf');

exports.config = {
    ...baseConfig,

    // Explicit order — UC-1 runs before UC-2 in each browser
    specs: [
        '../cucumber/features/productDetails.feature',
        '../cucumber/features/footer.feature'
    ],

    framework: 'cucumber',
    cucumberOpts: {
        require: [
            path.join(__dirname, '../cucumber/steps/hooks.js'),
            path.join(__dirname, '../cucumber/steps/common.steps.js'),
            path.join(__dirname, '../cucumber/steps/productDetails.steps.js'),
            path.join(__dirname, '../cucumber/steps/footer.steps.js')
        ],
        timeout: 60000
    }
};
