import { screen } from "@testing-library/react";
import { mock } from "jest-mock-extended";

import { GitHubRepositoryRepository } from "../../../src/domain/GitHubRepository/GitHubRepositoryRepository";
import { RepositoryWidgetRepository } from "../../../src/domain/RepositoryWidget/RepositoryWidgetRepository";
import { Dashboard } from "../../../src/pages/Dashboard/Dashboard";
import { GitHubRepositoryMother } from "../../domain/GitHubRepository/GitHubRepositoryMother";
import { RepositoryWidgetMother } from "../../domain/RepositoryWidget/RepositoryWidgetMother";
import { renderWithRouter } from "../../utils/renderWithRouter";

const mockGitHubRepositoryRepository = mock<GitHubRepositoryRepository>();
const mockWidgetRepository = mock<RepositoryWidgetRepository>();

describe("Dashboard section", () => {
	it("show all widgets", async () => {
		const gitHubRepository = GitHubRepositoryMother.create();
		const repositoryWidget = RepositoryWidgetMother.create();

		mockGitHubRepositoryRepository.search.mockResolvedValue([gitHubRepository]);

		renderWithRouter(
			<Dashboard
				repositoryWidgets={[repositoryWidget]}
				gitHubRepositoryRepository={mockGitHubRepositoryRepository}
				repositoryWidgetRepository={mockWidgetRepository}
			/>
		);

		const firstWidgetTitle = `${gitHubRepository.id.organization}/${gitHubRepository.id.name}`;
		const firstWidgetHeader = await screen.findByRole("heading", {
			name: new RegExp(firstWidgetTitle, "i"),
		});

		expect(firstWidgetHeader).toBeInTheDocument();
	});

	it("show not results message when there are no widgets", async () => {
		mockGitHubRepositoryRepository.search.mockResolvedValue([]);

		renderWithRouter(
			<Dashboard
				repositoryWidgets={[]}
				gitHubRepositoryRepository={mockGitHubRepositoryRepository}
				repositoryWidgetRepository={mockWidgetRepository}
			/>
		);

		const noResults = await screen.findByText(new RegExp("No hay widgets configurados", "i"));

		expect(noResults).toBeInTheDocument();
	});

	it("show last modified date in human readable format", async () => {
		const gitHubRepository = GitHubRepositoryMother.create({ updatedAt: new Date() });
		const repositoryWidget = RepositoryWidgetMother.create();

		mockGitHubRepositoryRepository.search.mockResolvedValue([gitHubRepository]);

		renderWithRouter(
			<Dashboard
				repositoryWidgets={[repositoryWidget]}
				gitHubRepositoryRepository={mockGitHubRepositoryRepository}
				repositoryWidgetRepository={mockWidgetRepository}
			/>
		);

		const modificationDate = await screen.findByText(new RegExp("today", "i"));

		expect(modificationDate).toBeInTheDocument();
	});
});
