import { LocalStorageGitHubAccessTokenRepository } from "../../infrastructure/GitHubAccessToken";
import { GitHubApiGitHubRepositoryRepository } from "../../infrastructure/GitHubRepository";
import { LocalStorageRepositoryWidgetRepository } from "../../infrastructure/RepositoryWidget";
import { useRepositoryWidgetContext } from "./components/GitHubRepositoryWidget";
import { Dashboard } from "./Dashboard";

const ghAccessTokenRepository = new LocalStorageGitHubAccessTokenRepository();
const gitHubRepositoryRepository = new GitHubApiGitHubRepositoryRepository(
	ghAccessTokenRepository.search()
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
