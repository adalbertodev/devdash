import { config } from "../../devdash_config";
import { GitHubApiGithubRepositoryRepository } from "../../infrastructure";
import { Dashboard } from "./Dashboard";

const repository = new GitHubApiGithubRepositoryRepository(config.github_access_token);

export class DashboardFactory {
	static create(): React.ReactNode {
		return <Dashboard repository={repository} />;
	}
}
