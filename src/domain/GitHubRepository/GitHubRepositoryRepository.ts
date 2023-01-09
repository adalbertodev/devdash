import { GitHubRepository, RepositoryId } from "./GitHubRepository";

export interface GitHubRepositoryRepository {
	search(repositoryUrls: string[]): Promise<GitHubRepository[]>;
	searchById(repositoryId: RepositoryId): Promise<GitHubRepository | null>;
}
