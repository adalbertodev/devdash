import { GitHubRepositoryDetail } from "./GitHubRepositoryDetail";

export class GitHubRepositoryDetailFactory {
	static create(): React.ReactNode {
		return <GitHubRepositoryDetail />;
	}
}
