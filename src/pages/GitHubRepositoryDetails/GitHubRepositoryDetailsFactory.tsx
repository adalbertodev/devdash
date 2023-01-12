import {
	GitHubApiGitHubRepositoryPullRequestRepository,
	GitHubApiGitHubRepositoryRepository,
} from "../../infrastructure";
import { LocalStorageGitHubAccessTokenRepository } from "../../infrastructure/GitHubAccessToken";
import { LocalStorageRepositoryWidgetRepository } from "../../infrastructure/RepositoryWidget";
import { GitHubRepositoryDetail } from "./GitHubRepositoryDetails";

const ghAccessTokenRepository = new LocalStorageGitHubAccessTokenRepository();
const ghAccessToken = ghAccessTokenRepository.search();
const gitHubRepositoryRepository = new GitHubApiGitHubRepositoryRepository(ghAccessToken);
const gitHubRepositoryPullRequestRepository = new GitHubApiGitHubRepositoryPullRequestRepository(
	ghAccessToken
);
const repositoryWidgetRepository = new LocalStorageRepositoryWidgetRepository();

export const GitHubRepositoryDetailFactory = () => {
	return (
		<GitHubRepositoryDetail
			gitHubRepositoryRepository={gitHubRepositoryRepository}
			gitHubRepositoryPullRequestRepository={gitHubRepositoryPullRequestRepository}
			repositoryWidgetRepository={repositoryWidgetRepository}
		/>
	);
};
