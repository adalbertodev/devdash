import {
	GitHubAccessTokenSearcher,
	LocalStorageGitHubAccessTokenRepository,
} from "../../infrastructure/GitHubAccessToken";
import { GitHubApiGitHubRepositoryRepository } from "../../infrastructure/GitHubRepository";
import { LocalStorageRepositoryWidgetRepository } from "../../infrastructure/RepositoryWidget";
import { useRepositoryWidgetContext } from "./components/GitHubRepositoryWidget";
import { Dashboard } from "./Dashboard";

const ghAccessTokenRepository = new LocalStorageGitHubAccessTokenRepository();
const ghAccessTokenSearcher = new GitHubAccessTokenSearcher(ghAccessTokenRepository);
const gitHubRepositoryRepository = new GitHubApiGitHubRepositoryRepository(
	ghAccessTokenSearcher.search()
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
