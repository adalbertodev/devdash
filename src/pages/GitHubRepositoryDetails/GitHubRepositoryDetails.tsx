import { FC, useEffect, useMemo } from "react";
import { Navigate, useParams } from "react-router-dom";

import { Lock, Unlock } from "../../assets/svgs";
import { DomainEvents } from "../../domain";
import { GitHubRepositoryRepository } from "../../domain/GitHubRepository";
import { GitHubRepositoryPullRequestRepository } from "../../domain/GitHubRepositoryPullRequest";
import { useInViewport } from "../../hooks";
import { GitHubRepositoryPullRequests } from "./components";
import styles from "./GitHubRepositoryDetails.module.scss";
import { useGitHubRepository } from "./hooks";

interface Props {
	gitHubRepositoryRepository: GitHubRepositoryRepository;
	gitHubRepositoryPullRequestRepository: GitHubRepositoryPullRequestRepository;
}

export const GitHubRepositoryDetail: FC<Props> = ({
	gitHubRepositoryRepository,
	gitHubRepositoryPullRequestRepository,
}) => {
	const { isInViewport, ref } = useInViewport();
	const { organization, name } = useParams() as { organization: string; name: string };

	const repositoryId = useMemo(() => ({ organization, name }), [organization, name]);

	const { repository, isLoading } = useGitHubRepository(gitHubRepositoryRepository, repositoryId);

	useEffect(() => {
		if (!isLoading) {
			document.dispatchEvent(new CustomEvent(DomainEvents.pageLoaded));
		}
	}, [isLoading]);

	if (repository === undefined) {
		return <span>Cargando...</span>;
	}

	if (repository === null) {
		return <Navigate to="../" />;
	}

	return (
		<section className={styles["repository-detail"]}>
			<header className={styles.header}>
				<a href={repository.url} target="_blank" rel="noreferrer">
					<h2 className={styles.header__title}>
						{repository.id.organization}/{repository.id.name}
					</h2>
				</a>
				{repository.private ? <Lock /> : <Unlock />}
			</header>

			<p>{3 / 0}</p>
			<p>{repository.description}</p>

			<h3>Repository stats</h3>
			<table className={styles.detail__table}>
				<thead>
					<tr>
						<th>Stars</th>
						<th>Watchers</th>
						<th>Forks</th>
						<th>Issues</th>
						<th>Pull Requests</th>
					</tr>
				</thead>

				<tbody>
					<tr>
						<td>{repository.stars}</td>
						<td>{repository.watchers}</td>
						<td>{repository.forks}</td>
						<td>{repository.issues}</td>
						<td>{repository.pullRequests}</td>
					</tr>
				</tbody>
			</table>

			<h3>Workflow runs status</h3>

			{repository.workflowRunsStatus.length > 0 ? (
				<>
					<p>
						⏱️Last workflow run:{" "}
						{repository.workflowRunsStatus[0].createdAt.toLocaleDateString("es-ES")}
					</p>
					<table className={styles.detail__table}>
						<thead>
							<tr>
								<th>Name</th>
								<th>Title</th>
								<th>Date</th>
								<th>Status</th>
								<th>Conclusion</th>
							</tr>
						</thead>
						<tbody>
							{repository.workflowRunsStatus.map((run) => (
								<tr key={run.id}>
									<td>{run.name}</td>
									<td>
										<a href={run.url} target="_blank" rel="noreferrer">
											{run.title}
										</a>
									</td>
									<td>{run.createdAt.toLocaleDateString("es-ES")}</td>
									<td>{run.status}</td>
									<td>{run.conclusion}</td>
								</tr>
							))}
						</tbody>
					</table>
				</>
			) : (
				<p>There are no workflow runs</p>
			)}

			<section ref={ref}>
				{isInViewport && (
					<GitHubRepositoryPullRequests
						repository={gitHubRepositoryPullRequestRepository}
						repositoryId={repositoryId}
					/>
				)}
			</section>
		</section>
	);
};
