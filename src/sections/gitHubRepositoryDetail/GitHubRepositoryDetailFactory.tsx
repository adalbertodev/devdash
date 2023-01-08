import { config } from "../../devdash_config";
import {
	GitHubApiGitHubRepositoryPullRequestRepository,
	oldGitHubApiGitHubRepositoryRepository,
} from "../../infrastructure";
import { GitHubRepositoryDetail } from "./GitHubRepositoryDetail";

const gitHubRepositoryRepository = new oldGitHubApiGitHubRepositoryRepository(
	config.github_access_token
);
const gitHubRepositoryPullRequestRepository = new GitHubApiGitHubRepositoryPullRequestRepository(
	config.github_access_token
);

export class GitHubRepositoryDetailFactory {
	static create(): React.ReactNode {
		return (
			<GitHubRepositoryDetail
				gitHubRepositoryRepository={gitHubRepositoryRepository}
				gitHubRepositoryPullRequestRepository={gitHubRepositoryPullRequestRepository}
			/>
		);
	}
}
