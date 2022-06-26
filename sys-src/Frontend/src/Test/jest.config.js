// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
    verbose: true,
    testEnvironment: 'jsdom',
    "transform": {
        "\\.js$": "<rootDir>/node_modules/babel-jest"
    },
};

module.exports = config;

// Or async function
module.exports = async () => {
    return {
        verbose: true,


    };
};



