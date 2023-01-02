// import { config } from "../../devdash_config";
import { githubApiResponses } from "../../github_api_response";
import styles from "./Dashboard.module.scss";
import { ReactComponent as Brand } from "./svgs/brand.svg";
import { ReactComponent as Check } from "./svgs/check.svg";
import { ReactComponent as Error } from "./svgs/error.svg";
import { ReactComponent as PullRequests } from "./svgs/git-pull-request.svg";
import { ReactComponent as IssueOpened } from "./svgs/issue-opened.svg";
import { ReactComponent as Lock } from "./svgs/lock.svg";
import { ReactComponent as Forks } from "./svgs/repo-forked.svg";
import { ReactComponent as Start } from "./svgs/star.svg";
import { ReactComponent as Unlock } from "./svgs/unlock.svg";
import { ReactComponent as Watchers } from "./svgs/watchers.svg";

const isoToReadableDate = (lastUpdate: string): string => {
	const lastUpdateDate = new Date(lastUpdate);
	const currentDate = new Date();
	const diffDays = Math.abs(currentDate.getDate() - lastUpdateDate.getDate());

	return diffDays === 0
		? "today"
		: diffDays > 30
		? "more than a month ago"
		: `${diffDays} days ago`;
};

export const Dashboard = () => {
	const title = "DevDash";

	return (
		<>
			<header className={styles.header}>
				<section className={styles.header__container}>
					<Brand />
					<h1 className={styles.app__brand}>{title}</h1>
				</section>
			</header>

			<section className={styles.container}>
				{githubApiResponses.map((widget) => (
					<article key={widget.repositoryData.id} className={styles.widget}>
						<header className={styles.widget__header}>
							<a
								className={styles.widget__title}
								href={widget.repositoryData.html_url}
								target="_blank"
								title={`${widget.repositoryData.organization.login}/${widget.repositoryData.name}`}
								rel="noreferrer"
							>
								{widget.repositoryData.organization.login}/{widget.repositoryData.name}
							</a>
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
		</>
	);
};
