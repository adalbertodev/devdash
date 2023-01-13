import { GitHubAccessTokenRepository } from "../../domain";

export class LocalStorageGitHubAccessTokenRepository implements GitHubAccessTokenRepository {
	localStorageKey = "github_access_token";

	public search = (): string => {
		const token = localStorage.getItem(this.localStorageKey);

		return token ?? "";
	};

	public save = (token: string): void => {
		localStorage.setItem(this.localStorageKey, token);
	};
}
