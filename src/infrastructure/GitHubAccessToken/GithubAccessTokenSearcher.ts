import { GitHubAccessTokenRepository } from "../../domain";

export class GitHubAccessTokenSearcher {
	constructor(private readonly repository: GitHubAccessTokenRepository) {}

	search(): string {
		const token = this.repository.search();

		return token;
	}
}
