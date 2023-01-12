import { FC, useEffect, useMemo } from "react";

import { DomainEvents } from "../../domain/DomainEvents";
import { GitHubRepositoryRepository } from "../../domain/GitHubRepository";
import { RepositoryWidget, RepositoryWidgetRepository } from "../../domain/RepositoryWidget";
import { AddRepositoryWidgetForm } from "./components/AddRepositoryWidgetForm";
import {
	GitHubRepositoryWidget,
	RepositoryWidgetsSkeleton,
} from "./components/GitHubRepositoryWidget";
import styles from "./Dashboard.module.scss";
import { useGitHubRepositories } from "./hooks";

interface Props {
	repositoryWidgets: RepositoryWidget[];
	gitHubRepositoryRepository: GitHubRepositoryRepository;
	repositoryWidgetRepository: RepositoryWidgetRepository;
}

export const Dashboard: FC<Props> = ({
	repositoryWidgets,
	gitHubRepositoryRepository,
	repositoryWidgetRepository,
}) => {
	const gitHubRepositoryUrls = useMemo(
		() => repositoryWidgets.map((widget) => widget.repositoryUrl),
		[repositoryWidgets]
	);

	const { gitHubRepositories: repositoryData, isLoading } = useGitHubRepositories(
		gitHubRepositoryRepository,
		gitHubRepositoryUrls
	);

	useEffect(() => {
		if (!isLoading) {
			document.dispatchEvent(new CustomEvent(DomainEvents.pageLoaded));
		}
	}, [isLoading]);

	return (
		<>
			<section className={styles.container}>
				{!isLoading && repositoryData.length === 0 && (
					<div className={styles.empty}>
						<span>No hay widgets configurados.</span>
					</div>
				)}

				{isLoading ? (
					<RepositoryWidgetsSkeleton numberOfWidgets={gitHubRepositoryUrls.length} />
				) : (
					repositoryData.map((widget) => (
						<GitHubRepositoryWidget
							key={`${widget.id.organization}/${widget.id.name}`}
							widget={widget}
						/>
					))
				)}
				<AddRepositoryWidgetForm repository={repositoryWidgetRepository} />
			</section>
		</>
	);
};
