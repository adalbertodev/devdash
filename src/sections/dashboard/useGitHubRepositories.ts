import { useEffect, useState } from "react";

import { GitHubRepository, GithubRepositoryRepository } from "../../domain";

interface GitHubRepositories {
	repositories: GitHubRepository[];
}

export const useGitHubRepositories = (
	repository: GithubRepositoryRepository,
	repositoriesUrls: string[]
): GitHubRepositories => {
	const [repositoryData, setRepositoryData] = useState<GitHubRepository[]>([]);

	useEffect(() => {
		repository
			.search(repositoriesUrls)
			.then((repositoryData) => {
				setRepositoryData(repositoryData);
			})
			.catch((error) => console.error(error));
	}, [repository, repositoriesUrls]);

	return {
		repositories: repositoryData,
	};
};
