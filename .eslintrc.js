module.exports = {
	extends: ["react-app", "react-app/jest", "eslint-config-codely/typescript"],
	parserOptions: {
		project: ["./tsconfig.json"],
	},
	settings: {
		"import/resolver": {
			node: {
				extensions: [".js", ".jsx", ".ts", ".tsx"],
			},
		},
	},
	overrides: [
		{
			files: ["**/tests/e2e/**/*.spec.ts"],
			rules: {
				"testing-library/await-async-query": 0,
				"@typescript-eslint/no-unsafe-member-access": 0,
				"@typescript-eslint/no-unsafe-call": 0,
				"testing-library/prefer-screen-queries": 0,
			},
		},
		{
			files: ["tests/*.test.ts"],
			extends: [
				"plugin:jest/recommended",
				"plugin:jest-dom/recommended",
				"plugin:testing-library/dom",
			],
		},
	],
};
