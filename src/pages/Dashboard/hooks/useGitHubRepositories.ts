import { useEffect, useState } from "react";

import { GitHubRepository, GitHubRepositoryRepository } from "../../../domain";

interface GitHubRepositories {
	gitHubRepositories: GitHubRepository[];
	isLoading: boolean;
}

export const useGitHubRepositories = (
	repository: GitHubRepositoryRepository,
	repositoryUrls: string[]
): GitHubRepositories => {
	const [gitHubRepositories, setGitHubRepositories] = useState<GitHubRepository[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);

		repository
			.search(repositoryUrls)
			.then((repositoryData) => {
				setGitHubRepositories(repositoryData);
				setIsLoading(false);
			})
			.catch((error: Error) => console.error(error));
	}, [repository, repositoryUrls]);

	return {
		gitHubRepositories,
		isLoading,
	};
};
