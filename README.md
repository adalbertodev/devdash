## 🚀 Run the app

- `npm install`: Install dependencies
- Rename .env.template to .env
- `code .env`: Specify your GitHub Personal access token ([how to get it](https://docs.github.com/en/enterprise-server@3.4/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) -> [your tokens](https://github.com/settings/tokens) -> Enable `Repo.public_repo`)
- `vim src/devdash_config.ts`: Set the repository URLs you want to show on your DevDash\_\_
- `npm start`: Run in dev mode on [localhost:3000](http://localhost:3000)
- `npm run build`: Generate production build

## ✅ Testing

### Unit tests

`npm run test`: Run unit tests with Jest and React Testing Library

### End-to-end tests

- Rename cypress.env.template.json to cypress.env.json
- `npm start`: Run in dev mode on [localhost:3000](http://localhost:3000)
- Run end-to-end tests with Cypress choosing one of the following options:
  - `npm run cy:open`: Open Cypress in dev mode
  - `npm run cy:run`: Execute Cypress in CLI

## 🔦 Linting

- `npm run lint`: Run linter
- `npm run lint:fix`: Fix lint issues

## 🌈 Tech Stack

- [TypeScript](https://www.typescriptlang.org)
- [ESLint](https://eslint.org) and [Prettier](https://prettier.io) already configured with the [🤏 Codely's configuration](https://github.com/CodelyTV/eslint-config-codely)
- [Jest](https://jestjs.io) with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) for the unit tests
- [Cypress](https://www.cypress.io) with [Testing Library](https://testing-library.com/docs/cypress-testing-library) for the end-to-end tests
- [GitHub Action Workflows](https://github.com/features/actions) set up to run tests and linting on push
- [Makefile](https://github.com/CodelyTV/cra-template-codely/blob/main/template/Makefile) for standardize how to run projects
- [Sass](https://sass-lang.com) to supercharge CSS with nested classes and more fun
- [.editorconfig](https://editorconfig.org) for sharing the IDE config

## 🔀 Related information

This application was generated using the [🌱⚛️ Create React App Codely template](https://github.com/CodelyTV/cra-template-codely). Feel free to check it out and star the repo! 🌟😊🙌
