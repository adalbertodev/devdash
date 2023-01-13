import { FC } from "react";
import { Link } from "react-router-dom";

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
} from "../../../../assets/svgs";
import { GitHubRepository } from "../../../../domain/GitHubRepository";
import { isoToReadableDate, toPrefixedNumber } from "../../../../utils";
import styles from "./GitHubRepositoryWidget.module.scss";

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
					<Star />
					<span>{toPrefixedNumber(widget.stars)}</span>
				</div>
				<div className={styles.widget__stat}>
					<Watchers />
					<span>{toPrefixedNumber(widget.watchers)}</span>
				</div>
				<div className={styles.widget__stat}>
					<Forks />
					<span>{toPrefixedNumber(widget.forks)}</span>
				</div>
				<div className={styles.widget__stat}>
					<IssueOpened />
					<span>{toPrefixedNumber(widget.issues)}</span>
				</div>
				<div className={styles.widget__stat}>
					<PullRequests />
					<span>{toPrefixedNumber(widget.pullRequests)}</span>
				</div>
			</footer>
		</article>
	);
};
