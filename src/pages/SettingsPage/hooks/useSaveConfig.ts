import { GitHubAccessTokenRepository } from "../../../domain/GitHubAccessToken";

interface SaveConfig {
	save: (token: string) => void;
}

export const useSaveConfig = (repository: GitHubAccessTokenRepository): SaveConfig => {
	function save(token: string): void {
		repository.save(token);
	}

	return { save };
};
