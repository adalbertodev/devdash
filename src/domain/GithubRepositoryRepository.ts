import { GitHubRepository, RepositoryId } from "./GitHubRepository";

export interface GithubRepositoryRepository {
	search(repositoryUrls: string[]): Promise<GitHubRepository[]>;
	searchById(repositoryId: RepositoryId): Promise<GitHubRepository | null>;
}
