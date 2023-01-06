import { useEffect, useState } from "react";

import { GitHubRepository, GithubRepositoryRepository, RepositoryId } from "../../domain";

interface GitHubRepositoryData {
	repositoryData: GitHubRepository | null | undefined;
	isLoading: boolean;
}

export const useGitHubRepository = (
	repository: GithubRepositoryRepository,
	repositoryId: RepositoryId
): GitHubRepositoryData => {
	const [repositoryData, setRepositoryData] = useState<GitHubRepository | null | undefined>();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);
		repository
			.searchById(repositoryId)
			.then((repositoryData) => {
				setRepositoryData(repositoryData);
				setIsLoading(false);
			})
			.catch((error) => console.error(error));
	}, [repository, repositoryId]);

	return {
		repositoryData,
		isLoading,
	};
};
