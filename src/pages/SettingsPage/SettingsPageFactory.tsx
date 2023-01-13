import { LocalStorageGitHubAccessTokenRepository } from "../../infrastructure/GitHubAccessToken";
import { SettingsPage } from "./SettingsPage";

const repository = new LocalStorageGitHubAccessTokenRepository();

export const SettingsPageFactory = () => {
	return <SettingsPage repository={repository} />;
};
