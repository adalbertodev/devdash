import { RepositoryWidget } from "../../../domain/RepositoryWidget";
import { RepositoryWidgetRepository } from "../../../domain/RepositoryWidgetRepository";

interface AddRepositoryWidgetTools {
	save: (widget: RepositoryWidget) => Promise<void>;
}

export const useAddRepositoryWidget = (
	repository: RepositoryWidgetRepository
): AddRepositoryWidgetTools => {
	const save = async (widget: RepositoryWidget) => {
		await repository.save(widget);
	};

	return { save };
};
