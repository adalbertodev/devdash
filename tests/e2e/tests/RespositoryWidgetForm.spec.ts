import { RepositoryWidgetMother } from "../../domain/RepositoryWidget/RepositoryWidgetMother";

describe("Repository Widget Form", () => {
	it("Add new repository with url", () => {
		cy.intercept("https://api.github.com/repos/**").as("getRepos");

		const newWidget = RepositoryWidgetMother.create({
			repositoryUrl: "https://github.com/CodelyTV/DevDash",
		});

		cy.visit("/");

		cy.wait("@getRepos").then(() => {
			cy.findByRole("button", {
				name: /Añadir/i,
			}).click();

			cy.findByLabelText(/Url del repositorio/i).type(newWidget.repositoryUrl);

			cy.findByRole("button", {
				name: /Añadir/i,
			}).click();

			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const widget = cy.findByText("CodelyTV/DevDash");

			widget.should("exist");
		});
	});

	it("Show error when repository already exists in Dashboard", () => {
		cy.intercept("https://api.github.com/repos/**").as("getRepos");

		const newWidget = RepositoryWidgetMother.create({
			repositoryUrl: "https://github.com/CodelyTV/DevDash",
		});

		cy.visit("/");

		cy.wait("@getRepos").then(() => {
			cy.findByRole("button", {
				name: /Añadir/i,
			}).click();

			cy.findByLabelText(/Url del repositorio/i).type(newWidget.repositoryUrl);

			cy.findByRole("button", {
				name: /Añadir/i,
			}).click();

			cy.findByRole("button", {
				name: /Añadir/i,
			}).click();

			cy.findByLabelText(/Url del repositorio/i).type(newWidget.repositoryUrl);

			cy.findByRole("button", {
				name: /Añadir/i,
			}).click();

			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const errorMessage = cy.findByText("Repositorio duplicado");

			errorMessage.should("exist");
		});
	});
});
