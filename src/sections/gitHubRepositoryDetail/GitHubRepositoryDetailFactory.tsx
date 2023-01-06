import { config } from "../../devdash_config";
import {
	GitHubApiGitHubRepositoryPullRequestRepository,
	GitHubApiGithubRepositoryRepository,
} from "../../infrastructure";
import { GitHubRepositoryDetail } from "./GitHubRepositoryDetail";

const gitHubRepositoryRepository = new GitHubApiGithubRepositoryRepository(
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
