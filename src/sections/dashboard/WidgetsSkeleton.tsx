import "react-loading-skeleton/dist/skeleton.css";

import { FC } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import styles from "./gitHubRepositoryWidget/GitHubRepositoryWidget.module.scss";
import { Forks, IssueOpened, PullRequests, Start, Watchers } from "./svgs";

const WidgetSkeleton = () => {
	return (
		<article className={styles.widget}>
			<header
				className={styles.widget__header}
				style={{ display: "block", paddingTop: "1.15rem", paddingBottom: "1.15rem" }}
			>
				<Skeleton baseColor="#3CFF64" highlightColor="#D1FFDA" width="70%" />
			</header>
			<div className={styles.widget__body}>
				<p style={{ marginTop: "1rem", marginBottom: "2rem" }}>
					<Skeleton inline={true} width="60%" />
				</p>
				<p className={styles.widget__description} style={{ paddingBottom: "0.65rem" }}>
					<Skeleton height={35} />
				</p>
			</div>
			<footer className={styles.widget__footer}>
				<div className={styles.widget__stat}>
					<Start />
					<span>
						<Skeleton width={35} />
					</span>
				</div>
				<div className={styles.widget__stat}>
					<Watchers />
					<span>
						<Skeleton width={25} />
					</span>
				</div>
				<div className={styles.widget__stat}>
					<Forks />
					<span>
						<Skeleton width={15} />
					</span>
				</div>
				<div className={styles.widget__stat}>
					<IssueOpened />
					<span>
						<Skeleton width={15} />
					</span>
				</div>
				<div className={styles.widget__stat}>
					<PullRequests />
					<span>
						<Skeleton width={15} />
					</span>
				</div>
			</footer>
		</article>
	);
};

interface Props {
	numberOfWidgets: number;
}

export const WidgetsSkeleton: FC<Props> = ({ numberOfWidgets }) => {
	return (
		<SkeletonTheme baseColor="#1A2233" highlightColor="#535966">
			{[...new Array<number[]>(numberOfWidgets)].map((_, i) => (
				<WidgetSkeleton key={`WidgetSkeletor_${i}`} />
			))}
		</SkeletonTheme>
	);
};
