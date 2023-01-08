import { LocalStorageGitHubAccessTokenRepository } from "../../infrastructure";
import { Config } from "./Config";

const repository = new LocalStorageGitHubAccessTokenRepository();

export const ConfigFactory = () => {
	return <Config repository={repository} />;
};
