import { FC, useMemo } from "react";
import { Navigate, useParams } from "react-router-dom";

import { GithubRepositoryRepository } from "../../domain";
import { useGitHubRepository } from "./useGitHubRepository";

interface Props {
	repository: GithubRepositoryRepository;
}

export const GitHubRepositoryDetail: FC<Props> = ({ repository }) => {
	const { organization, name } = useParams() as { organization: string; name: string };
	const repositoryId = useMemo(() => ({ organization, name }), [organization, name]);

	const { repositoryData } = useGitHubRepository(repository, repositoryId);

	if (repositoryData === undefined) {
		return <span>Cargando...</span>;
	}

	if (repositoryData === null) {
		return <Navigate to="../" />;
	}

	return <span>{repositoryData.url}</span>;
};
