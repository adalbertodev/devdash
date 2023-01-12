import { RepositoryId } from "../GitHubRepository";
import { RepositoryWidget } from "./RepositoryWidget";

export interface RepositoryWidgetRepository {
	search: () => Promise<RepositoryWidget[]>;
	searchByRepositoryId: (repositoryId: RepositoryId) => Promise<RepositoryWidget | undefined>;
	save: (widget: RepositoryWidget) => Promise<void>;
	delete: (widget: RepositoryWidget) => Promise<void>;
}
