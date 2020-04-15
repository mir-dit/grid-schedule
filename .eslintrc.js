module.exports = {
    "env": {
        "browser": true,
        "es6": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "google",
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 2019,
        "sourceType": "module",
        "project": "./tsconfig.json",
    },
    "plugins": [
        "@typescript-eslint",
    ],
    "rules": {
        "linebreak-style": ["error", "windows"],
        "require-jsdoc": "off",
        "@typescript-eslint/interface-name-prefix": ["error", { "prefixWithI": "always" }],
        "no-invalid-this": "off",
        "max-len": "off",
        "@typescript-eslint/prefer-optional-chain": "error",
        "@typescript-eslint/restrict-plus-operands": "error",
        "@typescript-eslint/array-type": "error",
        "@typescript-eslint/no-var-requires": "off",
    }
};