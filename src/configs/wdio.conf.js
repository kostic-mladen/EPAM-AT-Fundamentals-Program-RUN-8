const { baseConfig } = require('./wdio.base.conf');

exports.config = {
    ...baseConfig,

    // Explicit order — UC-1 runs before UC-2 in each browser
    specs: [
        '../tests/productDetails.spec.js',
        '../tests/footer.spec.js'
    ],

    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
};
