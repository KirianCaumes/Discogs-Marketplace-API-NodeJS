module.exports = {
    // An array of directory names to be searched recursively up from the requiring module's location
    moduleDirectories: [
        'node_modules', 'src',
    ],

    // The test environment that will be used for testing
    testEnvironment: 'node',

    // A map from regular expressions to paths to transformers
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
}
