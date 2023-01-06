import { config } from "../../devdash_config";
import {
	GitHubApiGithubRepositoryRepository,
	LocalStorageRepositoryWidgetRepository,
} from "../../infrastructure";
import { Dashboard } from "./Dashboard";

const repository = new GitHubApiGithubRepositoryRepository(config.github_access_token);
const repositoryWidgetRepository = new LocalStorageRepositoryWidgetRepository();

export class DashboardFactory {
	static create(): React.ReactNode {
		return (
			<Dashboard repository={repository} repositoryWidgetRepository={repositoryWidgetRepository} />
		);
	}
}
