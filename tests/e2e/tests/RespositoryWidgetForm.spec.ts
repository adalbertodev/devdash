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

			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const widget = cy.contains("CodelyTV/DevDash");

			widget.should("exist");
		});
	});

	it("Show error when repository already exists in Dashboard", () => {
		const newWidget = RepositoryWidgetMother.create({
			repositoryUrl: "https://github.com/CodelyTV/DevDash",
		});

		cy.visit("/");

		setGitHubToken();

		cy.intercept("https://api.github.com/repos/**").as("getRepos");

		cy.wait("@getRepos").then(() => {
			addNewRepositoryWidget(newWidget.repositoryUrl);
			addNewRepositoryWidget(newWidget.repositoryUrl);

			const errorMessage = cy.contains("Repositorio duplicado");

			errorMessage.should("exist");
		});
	});
});
