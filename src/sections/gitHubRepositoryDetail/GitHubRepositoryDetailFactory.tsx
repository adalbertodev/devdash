import { config } from "../../devdash_config";
import {
	GitHubApiGitHubRepositoryPullRequestRepository,
	GitHubApiGithubRepositoryRepository,
} from "../../infrastructure";
import { GitHubRepositoryDetail } from "./GitHubRepositoryDetail";

const repository = new GitHubApiGithubRepositoryRepository(config.github_access_token);
const gitHubRepositoryPullRequestRepository = new GitHubApiGitHubRepositoryPullRequestRepository(
	config.github_access_token
);

export class GitHubRepositoryDetailFactory {
	static create(): React.ReactNode {
		return (
			<GitHubRepositoryDetail
				repository={repository}
				gitHubRepositoryPullRequestRepository={gitHubRepositoryPullRequestRepository}
			/>
		);
	}
}
