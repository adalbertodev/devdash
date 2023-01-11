import {
	GitHubApiGitHubRepositoryPullRequestRepository,
	GitHubApiGitHubRepositoryRepository,
} from "../../infrastructure";
import {
	GitHubAccessTokenSearcher,
	LocalStorageGitHubAccessTokenRepository,
} from "../../infrastructure/GitHubAccessToken";
import { GitHubRepositoryDetail } from "./GitHubRepositoryDetails";

const ghAccessTokenRepository = new LocalStorageGitHubAccessTokenRepository();
const ghAccessTokenSearcher = new GitHubAccessTokenSearcher(ghAccessTokenRepository);
const ghAccessToken = ghAccessTokenSearcher.search();
const gitHubRepositoryRepository = new GitHubApiGitHubRepositoryRepository(ghAccessToken);
const gitHubRepositoryPullRequestRepository = new GitHubApiGitHubRepositoryPullRequestRepository(
	ghAccessToken
);

export const GitHubRepositoryDetailFactory = () => {
	return (
		<GitHubRepositoryDetail
			gitHubRepositoryRepository={gitHubRepositoryRepository}
			gitHubRepositoryPullRequestRepository={gitHubRepositoryPullRequestRepository}
		/>
	);
};
