import { FC } from "react";

import { Loader } from "../../../../components/Loader";
import { GitHubRepositoryPullRequestRepository, RepositoryId } from "../../../../domain";
import styles from "../../GitHubRepositoryDetails.module.scss";
import { useGitHubRepositoryPullRequests } from "../../hooks";

interface Props {
	repository: GitHubRepositoryPullRequestRepository;
	repositoryId: RepositoryId;
}

export const GitHubRepositoryPullRequests: FC<Props> = ({ repository, repositoryId }) => {
	const { isLoading, pullRequests } = useGitHubRepositoryPullRequests(repository, repositoryId);

	return (
		<>
			<h3>Pull requests</h3>
			<table className={styles.detail__table}>
				<thead>
					<tr>
						<th>Título</th>
						<th>Fecha</th>
					</tr>
				</thead>
				<tbody>
					{!isLoading &&
						pullRequests.map((pullRequest) => (
							<tr key={pullRequest.id}>
								<td>
									<a target="_blank" href={pullRequest.url} rel="noreferrer">
										{pullRequest.title}
									</a>
								</td>
								<td>{pullRequest.createdAt.toLocaleDateString("es-ES")}</td>
							</tr>
						))}
				</tbody>
			</table>

			{isLoading && <Loader />}
		</>
	);
};
