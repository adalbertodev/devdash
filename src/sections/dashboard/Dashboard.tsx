import { useEffect, useMemo, useState } from "react";

import { config } from "../../devdash_config";
import { GitHubRepository } from "../../domain";
import { GitHubApiGithubRepositoryRepository } from "../../infrastructure";
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

const isoToReadableDate = (lastUpdateDate: Date): string => {
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
		() => new GitHubApiGithubRepositoryRepository(config.github_access_token),
		[]
	);
	const [repositoryData, setrepositoryData] = useState<GitHubRepository[]>([]);

	// eslint-disable-next-line no-console
	console.log(repositoryData);

	useEffect(() => {
		repository
			.search(config.widgets.map((widget) => widget.repository_url))
			.then((repositoryData) => {
				setrepositoryData(repositoryData);
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
						<article key={`${widget.id.organization}/${widget.id.name}`} className={styles.widget}>
							<header className={styles.widget__header}>
								<h2 className={styles.widget__title}>
									<a
										href={widget.url}
										target="_blank"
										title={`${widget.id.organization}/${widget.id.name}`}
										rel="noreferrer"
									>
										{widget.id.organization}/{widget.id.name}
									</a>
								</h2>
								{widget.private ? <Lock /> : <Unlock />}
							</header>

							<div className={styles.widget__body}>
								<div className={styles.widget__status}>
									<p>Last update {isoToReadableDate(widget.updatedAt)}</p>
									{widget.hasWorkflows && (
										<div>{widget.isLastWorkflowSuccess ? <Check /> : <Error />}</div>
									)}
								</div>

								<p className={styles.widget__description}>{widget.description}</p>
							</div>

							<footer className={styles.widget__footer}>
								<div className={styles.widget__stat}>
									<Start />
									<span>{widget.stars}</span>
								</div>
								<div className={styles.widget__stat}>
									<Watchers />
									<span>{widget.watchers}</span>
								</div>
								<div className={styles.widget__stat}>
									<Forks />
									<span>{widget.forks}</span>
								</div>
								<div className={styles.widget__stat}>
									<IssueOpened />
									<span>{widget.issues}</span>
								</div>
								<div className={styles.widget__stat}>
									<PullRequests />
									<span>{widget.pullRequests}</span>
								</div>
							</footer>
						</article>
					))}
				</section>
			)}
		</>
	);
};
