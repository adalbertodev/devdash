import { RepositoryWidget } from "../../domain";
import { RepositoryWidgetRepository } from "../../domain/RepositoryWidget";

export class LocalStorageRepositoryWidgetRepository implements RepositoryWidgetRepository {
	private readonly localStorageKey = "repositoryWidgets";

	public search = (): Promise<RepositoryWidget[]> => {
		const data = localStorage.getItem(this.localStorageKey);

		if (!data) {
			return Promise.resolve([]);
		}

		return Promise.resolve(JSON.parse(data) as RepositoryWidget[]);
	};

	public save = async (widget: RepositoryWidget): Promise<void> => {
		const currentRepositoryWidget = await this.search();

		localStorage.setItem(
			this.localStorageKey,
			JSON.stringify(currentRepositoryWidget.concat(widget))
		);
	};

	public delete = async (widget: RepositoryWidget): Promise<void> => {
		const currentRepositoryWidget = await this.search();

		localStorage.setItem(
			this.localStorageKey,
			JSON.stringify(
				currentRepositoryWidget.filter((repositoryWidget) => repositoryWidget.id !== widget.id)
			)
		);
	};
}
