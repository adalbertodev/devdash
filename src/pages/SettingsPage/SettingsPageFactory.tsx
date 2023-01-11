import { LocalStorageGitHubAccessTokenRepository } from "../../infrastructure";
import { SettingsPage } from "./SettingsPage";

const repository = new LocalStorageGitHubAccessTokenRepository();

export const SettingsPageFactory = () => {
	return <SettingsPage repository={repository} />;
};
