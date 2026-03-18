const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
    js.configs.recommended,
    {
        files: ['src/**/*.js'],
        languageOptions: {
            ecmaVersion: 2022,
            globals: {
                ...globals.node,
                browser: 'readonly',
                $: 'readonly',
                $$: 'readonly',
                expect: 'readonly',
                describe: 'readonly',
                it: 'readonly',
                before: 'readonly',
                after: 'readonly',
                beforeEach: 'readonly',
                afterEach: 'readonly'
            }
        },
        rules: {
            // Warn on console usage — logger.js should be used instead
            'no-console': 'warn',
            // Error if async function has no await — prevents accidental missing awaits
            'require-await': 'error'
        }
    }
];
