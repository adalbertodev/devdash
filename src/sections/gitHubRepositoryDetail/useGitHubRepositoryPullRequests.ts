import { useEffect, useState } from "react";

import {
	GitHubRepositoryPullRequest,
	GitHubRepositoryPullRequestRepository,
	RepositoryId,
} from "../../domain";

interface GitHubRepositoryPullRequestsData {
	pullRequests: GitHubRepositoryPullRequest[];
	isLoading: boolean;
}

export const useGitHubRepositoryPullRequests = (
	repository: GitHubRepositoryPullRequestRepository,
	repositoryId: RepositoryId
): GitHubRepositoryPullRequestsData => {
	const [pullRequests, setPullRequests] = useState<GitHubRepositoryPullRequest[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		setIsLoading(true);

		repository
			.search(repositoryId)
			.then((pullRequests) => {
				setPullRequests(pullRequests);
				setIsLoading(false);
			})
			.catch((error) => console.error(error));
	}, [repository, repositoryId]);

	return {
		pullRequests,
		isLoading,
	};
};
