import { FC } from "react";
import { Link } from "react-router-dom";

import {
	Check,
	Error,
	Forks,
	IssueOpened,
	Lock,
	PullRequests,
	Start,
	Unlock,
	Watchers,
} from "../../../../assets/svgs";
import { GitHubRepository } from "../../../../domain";
import styles from "./GitHubRepositoryWidget.module.scss";

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

const adjustStatNumber = (stat: number): string => {
	const cutNumbers = new Map<number, string>([
		[1_000, "k"],
		[1_000_000, "M"],
	]);

	let adjustedStat = `${stat}`;

	for (const [cutNumber, suffix] of Array.from(cutNumbers.entries())) {
		const result = Math.round(stat / cutNumber);

		if (result < 1) {
			break;
		}

		adjustedStat = `${result}${suffix}`;
	}

	return adjustedStat;
};

interface Props {
	widget: GitHubRepository;
}

export const GitHubRepositoryWidget: FC<Props> = ({ widget }) => {
	return (
		<article key={`${widget.id.organization}/${widget.id.name}`} className={styles.widget}>
			<header className={styles.widget__header}>
				<h2 className={styles.widget__title}>
					<Link to={`/repository/${widget.id.organization}/${widget.id.name}`}>
						{widget.id.organization}/{widget.id.name}
					</Link>
				</h2>
				{widget.private ? <Lock /> : <Unlock />}
			</header>

			<div className={styles.widget__body}>
				<div className={styles.widget__status}>
					<p>Last update {isoToReadableDate(widget.updatedAt)}</p>
					{widget.hasWorkflows && <div>{widget.isLastWorkflowSuccess ? <Check /> : <Error />}</div>}
				</div>

				<p className={styles.widget__description}>{widget.description}</p>
			</div>

			<footer className={styles.widget__footer}>
				<div className={styles.widget__stat}>
					<Start />
					<span>{adjustStatNumber(widget.stars)}</span>
				</div>
				<div className={styles.widget__stat}>
					<Watchers />
					<span>{adjustStatNumber(widget.watchers)}</span>
				</div>
				<div className={styles.widget__stat}>
					<Forks />
					<span>{adjustStatNumber(widget.forks)}</span>
				</div>
				<div className={styles.widget__stat}>
					<IssueOpened />
					<span>{adjustStatNumber(widget.issues)}</span>
				</div>
				<div className={styles.widget__stat}>
					<PullRequests />
					<span>{adjustStatNumber(widget.pullRequests)}</span>
				</div>
			</footer>
		</article>
	);
};
