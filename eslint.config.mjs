import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// Resolve __filename and __dirname in an ES module environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize the compatibility object for extending ESLint configurations
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// ESLint configuration array
const eslintConfig = [
  // Extending Next.js and TypeScript core rules
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  
  {
    rules: {
      // Turn off the specific TypeScript rules
      '@typescript-eslint/no-explicit-any': 'off', // Disable "no-explicit-any" rule
      '@typescript-eslint/ban-ts-comment': 'off', // Disable "ban-ts-comment" rule
      '@typescript-eslint/no-unused-vars': 'off', // Disable "no-unused-vars" rule
      '@typescript-eslint/no-require-imports': 'off', // Disable "no-require-imports" rule
      '@typescript-eslint/no-unsafe-function-type': 'off', // Disable "no-unsafe-function-type" rule
      'react-hooks/exhaustive-deps': 'off', // Disable the rule globally
    },
  },
];

export default eslintConfig;
