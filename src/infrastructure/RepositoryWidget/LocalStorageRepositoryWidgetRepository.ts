import { RepositoryId } from "../../domain/GitHubRepository";
import { RepositoryWidget, RepositoryWidgetRepository } from "../../domain/RepositoryWidget";

export class LocalStorageRepositoryWidgetRepository implements RepositoryWidgetRepository {
	private readonly localStorageKey = "repositoryWidgets";

	public search = (): Promise<RepositoryWidget[]> => {
		const data = localStorage.getItem(this.localStorageKey);

		if (!data) {
			return Promise.resolve([]);
		}

		return Promise.resolve(JSON.parse(data) as RepositoryWidget[]);
	};

	public searchByRepositoryId = (
		repositoryId: RepositoryId
	): Promise<RepositoryWidget | undefined> => {
		const gitHubUrlTemplate = "https://github.com/$organization/$name";
		const repositoryUrl = gitHubUrlTemplate
			.replace("$organization", repositoryId.organization)
			.replace("$name", repositoryId.name);

		const data = localStorage.getItem(this.localStorageKey);
		const repositoryWidgets = data ? (JSON.parse(data) as RepositoryWidget[]) : null;

		const repositoryWidget = repositoryWidgets
			? repositoryWidgets.find(
					(repositoryWidget) => repositoryWidget.repositoryUrl === repositoryUrl
			  )
			: null;

		if (!repositoryWidget) {
			return Promise.resolve(undefined);
		}

		return Promise.resolve(repositoryWidget);
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
