import { githubApiResponses } from "../github_api_response";

export class InMemoryGitHubRepositoryRepository {
	search(): typeof githubApiResponses {
		return githubApiResponses;
	}
}
