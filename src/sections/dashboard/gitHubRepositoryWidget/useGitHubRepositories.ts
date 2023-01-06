import { useEffect, useState } from "react";

import { GitHubRepository, GithubRepositoryRepository } from "../../../domain";

interface GitHubRepositories {
	repositoryData: GitHubRepository[];
	isLoading: boolean;
}

export const useGitHubRepositories = (
	repository: GithubRepositoryRepository,
	repositoryUrls: string[]
): GitHubRepositories => {
	const [repositoryData, setRepositoryData] = useState<GitHubRepository[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);

		repository
			.search(repositoryUrls)
			.then((repositoryData) => {
				setRepositoryData(repositoryData);
				setIsLoading(false);
			})
			.catch((error) => console.error(error));
	}, [repository, repositoryUrls]);

	return {
		repositoryData,
		isLoading,
	};
};
