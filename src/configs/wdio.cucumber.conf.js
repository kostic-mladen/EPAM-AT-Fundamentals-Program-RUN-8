const path = require('path');
const { baseConfig } = require('./wdio.base.conf');

exports.config = {
    ...baseConfig,

    // Explicit order — UC-1 runs before UC-2 in each browser
    specs: [
        '../features/productDetails.feature',
        '../features/footer.feature'
    ],

    framework: 'cucumber',
    cucumberOpts: {
        require: [
            path.join(__dirname, '../steps/common.steps.js'),
            path.join(__dirname, '../steps/productDetails.steps.js'),
            path.join(__dirname, '../steps/footer.steps.js')
        ],
        timeout: 60000
    }
};
