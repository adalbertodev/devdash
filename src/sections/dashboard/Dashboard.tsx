import { useEffect, useMemo, useState } from "react";

import { config } from "../../devdash_config";
import { GithubApiGithubRepositoryRepository, GithubApiResponse } from "../../infrastructure";
import styles from "./Dashboard.module.scss";
import {
	Brand,
	Check,
	Error,
	Forks,
	IssueOpened,
	Lock,
	PullRequests,
	Start,
	Unlock,
	Watchers,
} from "./svgs";

const isoToReadableDate = (lastUpdate: string): string => {
	const lastUpdateDate = new Date(lastUpdate);
	const currentDate = new Date();
	const diffTime = currentDate.getTime() - lastUpdateDate.getTime();
	const diffDays = Math.round(diffTime / (1000 * 3600 * 24));

	if (diffDays === 0) {
		return "today";
	}

	if (diffDays > 30) {
		return "more than a month ago";
	}

	return `${diffDays} days ago`;
};

const title = "DevDash";

export const Dashboard = () => {
	const repository = useMemo(
		() => new GithubApiGithubRepositoryRepository(config.github_access_token),
		[]
	);
	const [repositoryData, setrepositoryData] = useState<GithubApiResponse[]>([]);

	useEffect(() => {
		repository
			.search(config.widgets.map((widget) => widget.repository_url))
			.then((responses) => {
				setrepositoryData(responses);
			})
			.catch((error) => console.error(error));
	}, [repository]);

	return (
		<>
			<header className={styles.header}>
				<section className={styles.header__container}>
					<Brand />
					<h1 className={styles.app__brand}>{title}</h1>
				</section>
			</header>
			{repositoryData.length === 0 ? (
				<div className={styles.empty}>
					<span>No hay widgets configurados.</span>
				</div>
			) : (
				<section className={styles.container}>
					{repositoryData.map((widget) => (
						<article key={widget.repositoryData.id} className={styles.widget}>
							<header className={styles.widget__header}>
								<h2 className={styles.widget__title}>
									<a
										href={widget.repositoryData.html_url}
										target="_blank"
										title={`${widget.repositoryData.organization.login}/${widget.repositoryData.name}`}
										rel="noreferrer"
									>
										{widget.repositoryData.organization.login}/{widget.repositoryData.name}
									</a>
								</h2>
								{widget.repositoryData.private ? <Lock /> : <Unlock />}
							</header>

							<div className={styles.widget__body}>
								<div className={styles.widget__status}>
									<p>Last update {isoToReadableDate(widget.repositoryData.updated_at)}</p>
									{widget.CiStatus.workflow_runs.length > 0 && (
										<div>
											{widget.CiStatus.workflow_runs[0].status === "completed" ? (
												<Check />
											) : (
												<Error />
											)}
										</div>
									)}
								</div>

								<p className={styles.widget__description}>{widget.repositoryData.description}</p>
							</div>

							<footer className={styles.widget__footer}>
								<div className={styles.widget__stat}>
									<Start />
									<span>{widget.repositoryData.stargazers_count}</span>
								</div>
								<div className={styles.widget__stat}>
									<Watchers />
									<span>{widget.repositoryData.watchers_count}</span>
								</div>
								<div className={styles.widget__stat}>
									<Forks />
									<span>{widget.repositoryData.forks_count}</span>
								</div>
								<div className={styles.widget__stat}>
									<IssueOpened />
									<span>{widget.repositoryData.open_issues_count}</span>
								</div>
								<div className={styles.widget__stat}>
									<PullRequests />
									<span>{widget.pullRequest.length}</span>
								</div>
							</footer>
						</article>
					))}
				</section>
			)}
		</>
	);
};
