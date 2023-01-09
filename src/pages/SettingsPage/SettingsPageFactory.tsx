import { LocalStorageGitHubAccessTokenRepository } from "../../infrastructure";
import { Config } from "./SettingsPage";

const repository = new LocalStorageGitHubAccessTokenRepository();

export const ConfigFactory = () => {
	return <Config repository={repository} />;
};
