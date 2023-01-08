import {
	oldGitHubApiGitHubRepositoryRepository,
	LocalStorageGitHubAccessTokenRepository,
	LocalStorageRepositoryWidgetRepository,
} from "../../infrastructure";
import { GitHubAccessTokenSearcher } from "../config";
import { Dashboard } from "./Dashboard";
import { useRepositoryWidgetContext } from "./repositoryWidget";

const ghAccessTokenRepository = new LocalStorageGitHubAccessTokenRepository();
const ghAccessTokenSearcher = new GitHubAccessTokenSearcher(ghAccessTokenRepository);
const gitHubRepositoryRepository = new oldGitHubApiGitHubRepositoryRepository(
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
