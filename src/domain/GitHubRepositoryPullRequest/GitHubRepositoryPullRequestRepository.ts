import { RepositoryId } from "../GitHubRepository/GitHubRepository";
import { GitHubRepositoryPullRequest } from "./GitHubRepositoryPullRequest";

export interface GitHubRepositoryPullRequestRepository {
	search(repositoryId: RepositoryId): Promise<GitHubRepositoryPullRequest[]>;
}
