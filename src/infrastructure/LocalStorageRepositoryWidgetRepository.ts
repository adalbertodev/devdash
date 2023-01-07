import { RepositoryWidget } from "../domain";
import { RepositoryWidgetRepository } from "../domain/RepositoryWidgetRepository";

export class LocalStorageRepositoryWidgetRepository implements RepositoryWidgetRepository {
	public save = async (widget: RepositoryWidget): Promise<void> => {
		await Promise.resolve();
	};

	public search = (): Promise<RepositoryWidget[]> => {
		return Promise.resolve([]);
	};
}
