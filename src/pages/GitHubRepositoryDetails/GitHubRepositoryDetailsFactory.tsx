import { config } from "../../devdash_config";
import {
	GitHubApiGitHubRepositoryPullRequestRepository,
	GitHubApiGitHubRepositoryRepository,
} from "../../infrastructure";
import { GitHubRepositoryDetail } from "./GitHubRepositoryDetails";

const gitHubRepositoryRepository = new GitHubApiGitHubRepositoryRepository(
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
