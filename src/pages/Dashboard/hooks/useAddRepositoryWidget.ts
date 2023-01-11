import { DomainEvents } from "../../../domain";
import { NotUrlValidError } from "../../../domain/errors";
import {
	RepositoryAlreadyExistsError,
	RepositoryWidget,
	RepositoryWidgetRepository,
} from "../../../domain/RepositoryWidget";

interface AddRepositoryWidgetTools {
	save: (
		widget: RepositoryWidget
	) => Promise<void | RepositoryAlreadyExistsError | NotUrlValidError>;
}

export const useAddRepositoryWidget = (
	repository: RepositoryWidgetRepository
): AddRepositoryWidgetTools => {
	const save = async (
		widget: RepositoryWidget
	): Promise<void | RepositoryAlreadyExistsError | NotUrlValidError> => {
		const urlRegExp = /https:\/\/github.com\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)/i;
		const widgetRepositories = await repository.search();

		if (!urlRegExp.test(widget.repositoryUrl)) {
			return new NotUrlValidError(widget.repositoryUrl);
		}

		if (
			widgetRepositories.some((repository) => repository.repositoryUrl === widget.repositoryUrl)
		) {
			return new RepositoryAlreadyExistsError(widget.repositoryUrl);
		}

		await repository.save(widget);
		document.dispatchEvent(new CustomEvent(DomainEvents.repositoryWidgetAdded));
	};

	return { save };
};
