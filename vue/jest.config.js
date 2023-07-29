module.exports = {
    preset: '@vue/cli-plugin-unit-jest',
    testMatch: [
        "<rootDir>/test/specs/*.spec.js"
    ],
    "moduleNameMapper": {
        "\\.(css|less)$": "identity-obj-proxy",
        "^@/(.*)$": "<rootDir>/src/$1",
        "^@p/(.*)$": "<rootDir>/packages/$1"
    }
}
