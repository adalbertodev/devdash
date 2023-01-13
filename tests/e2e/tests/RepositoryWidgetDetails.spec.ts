import { RepositoryWidgetMother } from "../../domain/RepositoryWidget/RepositoryWidgetMother";

const setGitHubToken = () => {
	// eslint-disable-next-line no-console
	console.log(Cypress.env());

	cy.get("input#ghAccessToken").type(Cypress.env("GITHUB_TOKEN") as string);

	cy.findByRole("button", {
		name: /Guardar/i,
	}).click();
};

const addNewRepositoryWidget = (repositoryUrl: string) => {
	cy.findByRole("button", {
		name: /Añadir/i,
	}).click();

	cy.findByLabelText(/Url del repositorio/i).type(repositoryUrl);

	cy.findByRole("button", {
		name: /Añadir/i,
	}).click();
};

describe("Repository Widget Form", () => {
	it("Add new repository with url", () => {
		const newWidget = RepositoryWidgetMother.create({
			repositoryUrl: "https://github.com/CodelyTV/DevDash",
		});

		cy.visit("/");

		setGitHubToken();

		cy.intercept("https://api.github.com/repos/**").as("getRepos");

		cy.wait("@getRepos").then(() => {
			addNewRepositoryWidget(newWidget.repositoryUrl);

			cy.findByRole("link", {
				name: /CodelyTV\/DevDash/i,
			}).click();

			cy.findByRole("button", {
				name: "Delete Button",
			}).click();

			cy.findByRole("button", {
				name: "Borrar",
			}).click();

			cy.findByRole("link", {
				name: /CodelyTV\/DevDash/i,
			}).should("not.exist");
		});
	});
});
