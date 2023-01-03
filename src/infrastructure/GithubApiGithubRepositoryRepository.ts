import { CiStatus, GithubApiResponse, PullRequest, RepositoryData } from "./GithubApiResponse";

interface RepositoryId {
	organization: string;
	name: string;
}

export class GithubApiGithubRepositoryRepository {
	private readonly endpoints = [
		"https://api.github.com/repos/$organization/$name",
		"https://api.github.com/repos/$organization/$name/pulls",
		"https://api.github.com/repos/$organization/$name/actions/runs?page=16&per_page=1",
	];

	constructor(private readonly personalAccessToken: string) {}

	public async search(repositoryUrls: string[]): Promise<GithubApiResponse[]> {
		const responsePromises = repositoryUrls
			.map((url) => this.urlToId(url))
			.map((id) => this.searchById(id));

		return Promise.all(responsePromises);
	}

	private urlToId(url: string): RepositoryId {
		const splitUrl = url.split("/");

		return {
			name: splitUrl.pop() as string,
			organization: splitUrl.pop() as string,
		};
	}

	private async searchById(repositoryId: RepositoryId): Promise<GithubApiResponse> {
		const repositoryRequests = this.endpoints
			.map((endpoint) => endpoint.replace("$organization", repositoryId.organization))
			.map((endpoint) => endpoint.replace("$name", repositoryId.name))
			.map((url) =>
				fetch(url, {
					headers: { Authorization: `Bearer ${this.personalAccessToken}` },
				})
			);

		return Promise.all(repositoryRequests)
			.then((responses) => Promise.all(responses.map((response) => response.json())))
			.then(([repositoryData, pullRequests, ciStatus]) => ({
				repositoryData: repositoryData as RepositoryData,
				pullRequests: pullRequests as PullRequest[],
				ciStatus: ciStatus as CiStatus,
			}));
	}
}
