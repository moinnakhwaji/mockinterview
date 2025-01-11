module.exports = {
  extends: [
    'next/core-web-vitals', 
    'next/typescript'
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off', // Disable "no-explicit-any" rule
    '@typescript-eslint/ban-ts-comment': 'off', // Disable "ban-ts-comment" rule
    '@typescript-eslint/no-unused-vars': 'off', // Disable "no-unused-vars" rule
    '@typescript-eslint/no-require-imports': 'off', // Disable "no-require-imports" rule
    '@typescript-eslint/no-unsafe-function-type': 'off', // Disable "no-unsafe-function-type" rule
    'react-hooks/exhaustive-deps': 'off', // Disable the rule globally
  },
};
