module.exports = {
  extends: ['./node_modules/eslint-config-airbnb/index.js', 'airbnb', 'airbnb/hooks'],
  env: {
    browser: true,
  },
  overrides: [
    {
      rules: {
        'react/prop-types': 'off',
      },
    },
  ],
};
