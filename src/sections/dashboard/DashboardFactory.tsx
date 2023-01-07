import { config } from "../../devdash_config";
import {
	GitHubApiGithubRepositoryRepository,
	LocalStorageRepositoryWidgetRepository,
} from "../../infrastructure";
import { Dashboard } from "./Dashboard";
import { useRepositoryWidgetContext } from "./repositoryWidget";

const gitHubRepositoryRepository = new GitHubApiGithubRepositoryRepository(
	config.github_access_token
);
const repositoryWidgetRepository = new LocalStorageRepositoryWidgetRepository();

export const DashboardFactory = () => {
	const { repositoryWidgets } = useRepositoryWidgetContext();

	return (
		<Dashboard
			repositoryWidgets={repositoryWidgets}
			gitHubRepositoryRepository={gitHubRepositoryRepository}
			repositoryWidgetRepository={repositoryWidgetRepository}
		/>
	);
};
