module.exports = {
  "env": {
      "browser": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
      "ecmaVersion": 6
  },
  "rules": {
      "no-console": ["error", {"allow":["log"]}],
      "indent": [
          "error",
          2
      ],
      "linebreak-style": [
          "error",
          "unix"
      ],
      "quotes": [
          "error",
          "single"
      ],
      "semi": [
          "error",
          "always"
      ]
  }
};