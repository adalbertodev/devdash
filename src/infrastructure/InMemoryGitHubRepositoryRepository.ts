import { gitHubApiResponses } from "../github_api_response";

export class InMemoryGitHubRepositoryRepository {
	search(): typeof gitHubApiResponses {
		return gitHubApiResponses;
	}
}
