module.exports = {
  root: true,
  extends: ['@react-native-community'],
  rules: {
    'array-bracket-spacing': ['error', 'never'],
    'react/require-default-props': ['error'],
    'react/default-props-match-prop-types': ['error'],
    'react/sort-prop-types': ['error'],
    'prettier/prettier': ['error', {endOfLine: 'auto'}],
  },
};
