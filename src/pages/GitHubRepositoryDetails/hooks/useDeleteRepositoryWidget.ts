import { RepositoryId } from "../../../domain/GitHubRepository";
import { RepositoryWidgetRepository } from "../../../domain/RepositoryWidget";

interface RemoveRepositoryWidgetTools {
	deleteRepositoryWidget: (repositoryId: RepositoryId) => Promise<void>;
}

export const useDeleteRepositoryWidget = (
	repository: RepositoryWidgetRepository
): RemoveRepositoryWidgetTools => {
	const deleteRepository = async (repositoryId: RepositoryId) => {
		const repositoryWidget = await repository.searchByRepositoryId(repositoryId);

		if (repositoryWidget) {
			await repository.delete(repositoryWidget).catch((error: Error) => console.error(error));
		}
	};

	return { deleteRepositoryWidget: deleteRepository };
};
