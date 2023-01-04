import { render, screen } from "@testing-library/react";

import { GitHubApiGithubRepositoryRepository } from "../src/infrastructure/GitHubApiGitHubRepositoryRepository";
import { Dashboard } from "../src/sections/dashboard/Dashboard";
import { GitHubRepositoryMother } from "./GitHubRepositoryMother";

jest.mock("../src/infrastructure/GitHubApiGitHubRepositoryRepository");
const mockRepository =
	GitHubApiGithubRepositoryRepository as jest.Mock<GitHubApiGithubRepositoryRepository>;

describe("Dashboard section", () => {
	it("show all widgets", async () => {
		const gitHubRepository = GitHubRepositoryMother.create();

		mockRepository.mockImplementationOnce(() => {
			return {
				search: () => Promise.resolve([gitHubRepository]),
			} as unknown as GitHubApiGithubRepositoryRepository;
		});

		render(<Dashboard />);

		const title = await screen.findByRole("heading", {
			name: new RegExp("DevDash", "i"),
		});

		const firstWidgetTitle = `${gitHubRepository.id.organization}/${gitHubRepository.id.name}`;
		const firstWidgetHeader = await screen.findByRole("heading", {
			name: new RegExp(firstWidgetTitle, "i"),
		});

		expect(title).toBeInTheDocument();
		expect(firstWidgetHeader).toBeInTheDocument();
	});

	it("show not results message when there are no widgets", async () => {
		mockRepository.mockImplementationOnce(() => {
			return {
				search: () => Promise.resolve([]),
			} as unknown as GitHubApiGithubRepositoryRepository;
		});

		render(<Dashboard />);

		const noResults = await screen.findByText(new RegExp("No hay widgets configurados", "i"));

		expect(noResults).toBeInTheDocument();
	});

	it("show last modified date in human readable format", async () => {
		const gitHubRepository = GitHubRepositoryMother.create({ updatedAt: new Date() });

		mockRepository.mockImplementationOnce(() => {
			return {
				search: () => Promise.resolve([gitHubRepository]),
			} as unknown as GitHubApiGithubRepositoryRepository;
		});

		render(<Dashboard />);

		const modificationDate = await screen.findByText(new RegExp("today", "i"));

		expect(modificationDate).toBeInTheDocument();
	});
});
