import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import closeImage from "../../assets/imgs/close.png";
import {
	Check,
	Error,
	Forks,
	IssueOpened,
	Lock,
	PullRequests,
	Star,
	Unlock,
	Watchers,
} from "../../assets/svgs";
import { Modal } from "../../components/Modal";
import { DomainEvents } from "../../domain";
import { GitHubRepositoryRepository } from "../../domain/GitHubRepository";
import { GitHubRepositoryPullRequestRepository } from "../../domain/GitHubRepositoryPullRequest";
import { RepositoryWidgetRepository } from "../../domain/RepositoryWidget";
import { useInViewport } from "../../hooks";
import { GitHubRepositoryPullRequests } from "./components";
import styles from "./GitHubRepositoryDetails.module.scss";
import { useDeleteRepositoryWidget, useGitHubRepository } from "./hooks";

interface Props {
	gitHubRepositoryRepository: GitHubRepositoryRepository;
	gitHubRepositoryPullRequestRepository: GitHubRepositoryPullRequestRepository;
	repositoryWidgetRepository: RepositoryWidgetRepository;
}

export const GitHubRepositoryDetail: FC<Props> = ({
	gitHubRepositoryRepository,
	gitHubRepositoryPullRequestRepository,
	repositoryWidgetRepository,
}) => {
	const { isInViewport, ref } = useInViewport();
	const navigate = useNavigate();
	const { organization, name } = useParams() as { organization: string; name: string };
	const [isCheckDeleteModalOpen, setIsCheckDeleteModalOpen] = useState(false);

	const repositoryId = useMemo(() => ({ organization, name }), [organization, name]);

	const { repository, isLoading } = useGitHubRepository(gitHubRepositoryRepository, repositoryId);
	const { deleteRepositoryWidget } = useDeleteRepositoryWidget(repositoryWidgetRepository);

	const deleteRepository = useCallback(async () => {
		await deleteRepositoryWidget(repositoryId);

		document.dispatchEvent(new CustomEvent(DomainEvents.repositoryWidgetsChanged));

		navigate("/");
	}, [deleteRepositoryWidget, navigate, repositoryId]);

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
				<div className={styles.header__title}>
					<a href={repository.url} target="_blank" rel="noreferrer">
						<h2>
							{repository.id.organization}/{repository.id.name}
						</h2>
					</a>
					{repository.private ? <Lock /> : <Unlock />}
				</div>

				<button className={styles.deleteButton} onClick={() => setIsCheckDeleteModalOpen(true)}>
					<img src={closeImage} alt="Delete Button" />
				</button>

				{isCheckDeleteModalOpen && (
					<Modal setIsOpen={setIsCheckDeleteModalOpen} deleteAction={deleteRepository} />
				)}
			</header>

			<main>
				<section>
					<h3>Descripción</h3>
					<p>{repository.description}</p>
				</section>

				<section>
					<h3>Estadísticas del Repositorio</h3>

					<table className={styles.detail__table}>
						<thead>
							<tr>
								<th>
									<Star /> Stars
								</th>
								<th>
									<Watchers /> Watchers
								</th>
								<th>
									<Forks /> Forks
								</th>
								<th>
									<IssueOpened /> Issues
								</th>
								<th>
									<PullRequests /> Pull Requests
								</th>
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
				</section>

				<section>
					<h3>Estado de Workflow Runs</h3>

					{repository.workflowRunsStatus.length > 0 ? (
						<>
							<p className={styles.middle}>
								⏱️Última workflow run:{" "}
								{repository.workflowRunsStatus[0].createdAt.toLocaleDateString("es-ES")}
							</p>

							<table className={styles.detail__table}>
								<thead>
									<tr>
										<th>Nombre</th>
										<th>Titulo</th>
										<th>Fecha</th>
										<th>Estado</th>
										<th>Conclusión</th>
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
											<td>{run.status === "completed" ? <Check /> : <Error />}</td>
											<td>{run.conclusion === "sucess" ? <Check /> : <Error />}</td>
										</tr>
									))}
								</tbody>
							</table>
						</>
					) : (
						<p>There are no workflow runs</p>
					)}
				</section>

				<section ref={ref}>
					{isInViewport && (
						<GitHubRepositoryPullRequests
							repository={gitHubRepositoryPullRequestRepository}
							repositoryId={repositoryId}
						/>
					)}
				</section>
			</main>
		</section>
	);
};
