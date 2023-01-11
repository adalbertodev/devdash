import { RepositoryId } from "../../domain/GitHubRepository";
import {
	GitHubRepositoryPullRequest,
	GitHubRepositoryPullRequestRepository,
} from "../../domain/GitHubRepositoryPullRequest";
import { PullRequest } from "../GitHubApiResponse";

export class GitHubApiGitHubRepositoryPullRequestRepository
	implements GitHubRepositoryPullRequestRepository
{
	private readonly endpoints = "https://api.github.com/repos/$organization/$name/pulls";

	constructor(private readonly personalAccessToken: string) {}

	public search = async (repositoryId: RepositoryId): Promise<GitHubRepositoryPullRequest[]> => {
		const url = this.endpoints
			.replace("$organization", repositoryId.organization)
			.replace("$name", repositoryId.name);

		return fetch(url, { headers: { Authorization: `Bearer ${this.personalAccessToken}` } })
			.then<PullRequest[]>((response) => response.json())
			.then((response) => {
				return response.map((pr) => ({
					id: pr.id,
					title: pr.title,
					url: pr.html_url,
					createdAt: new Date(pr.created_at),
				}));
			});
	};
}
