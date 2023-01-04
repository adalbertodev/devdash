import { config } from "./devdash_config";
import { GitHubApiGithubRepositoryRepository } from "./infrastructure";
import { Dashboard } from "./sections/dashboard";

const repository = new GitHubApiGithubRepositoryRepository(config.github_access_token);

export function App() {
	return <Dashboard repository={repository} />;
}
