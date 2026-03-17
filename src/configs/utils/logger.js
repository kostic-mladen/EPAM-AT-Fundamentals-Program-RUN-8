// Lightweight logger utility — wraps console methods with log level prefix and ISO timestamp
// Extend with additional levels (e.g. debug) or transports (e.g. file output) as the project grows
const logger = {
    // Informational messages — test flow steps and state changes
    info(msg) {
        console.log(`[INFO]  ${new Date().toISOString()} - ${msg}`);
    },

    // Non-critical issues that don't fail the test but are worth flagging
    warn(msg) {
        console.warn(`[WARN]  ${new Date().toISOString()} - ${msg}`);
    },

    // Errors — unexpected failures or caught exceptions
    error(msg) {
        console.error(`[ERROR] ${new Date().toISOString()} - ${msg}`);
    },
};

module.exports = logger;
