import { useEffect, useState } from "react";

import { GitHubRepository, GithubRepositoryRepository, RepositoryId } from "../../domain";

interface GitHubRepositoryData {
	repositoryData: GitHubRepository | null | undefined;
}

export const useGitHubRepository = (
	repository: GithubRepositoryRepository,
	repositoryId: RepositoryId
): GitHubRepositoryData => {
	const [repositoryData, setRepositoryData] = useState<GitHubRepository | null | undefined>();

	useEffect(() => {
		repository
			.searchById(repositoryId)
			.then((repositoryData) => {
				setRepositoryData(repositoryData);
			})
			.catch((error) => console.error(error));
	}, [repository, repositoryId]);

	return {
		repositoryData,
	};
};
