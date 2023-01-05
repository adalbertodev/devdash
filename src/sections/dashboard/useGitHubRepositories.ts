import { useEffect, useState } from "react";

import { GitHubRepository, GithubRepositoryRepository } from "../../domain";

interface GitHubRepositories {
	repositories: GitHubRepository[];
}

export const useGitHubRepositories = (
	repository: GithubRepositoryRepository,
	repositoriesUrls: string[]
): GitHubRepositories => {
	const [repositoryData, setrepositoryData] = useState<GitHubRepository[]>([]);

	useEffect(() => {
		repository
			.search(repositoriesUrls)
			.then((repositoryData) => setrepositoryData(repositoryData))
			.catch((error) => console.error(error));
	}, [repository, repositoriesUrls]);

	return {
		repositories: repositoryData,
	};
};
