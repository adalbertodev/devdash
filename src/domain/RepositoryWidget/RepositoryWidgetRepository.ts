import { RepositoryWidget } from "./RepositoryWidget";

export interface RepositoryWidgetRepository {
	save: (widget: RepositoryWidget) => Promise<void>;
	search: () => Promise<RepositoryWidget[]>;
	delete: (widget: RepositoryWidget) => Promise<void>;
}
