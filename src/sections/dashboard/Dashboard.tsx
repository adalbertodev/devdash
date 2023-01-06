import { FC, useEffect, useMemo } from "react";

import { config } from "../../devdash_config";
import { GitHubRepositoryRepository, RepositoryWidgetRepository } from "../../domain";
import styles from "./Dashboard.module.scss";
import { GitHubRepositoryWidget } from "./gitHubRepositoryWidget/GitHubRepositoryWidget";
import { useGitHubRepositories } from "./gitHubRepositoryWidget/useGitHubRepositories";
import { AddRepositoryWidgetForm } from "./repositoryWidget/AddRepositoryWidgetForm";
import { RepositoryWidgetsSkeleton } from "./repositoryWidget/RepositoryWidgetsSkeleton";

interface Props {
	gitHubRepositoryRepository: GitHubRepositoryRepository;
	repositoryWidgetRepository: RepositoryWidgetRepository;
}

export const Dashboard: FC<Props> = ({
	gitHubRepositoryRepository,
	repositoryWidgetRepository,
}) => {
	const gitHubRepositoryUrls = useMemo(
		() => config.widgets.map((widget) => widget.repository_url),
		[]
	);

	const { gitHubRepositories: repositoryData, isLoading } = useGitHubRepositories(
		gitHubRepositoryRepository,
		gitHubRepositoryUrls
	);

	useEffect(() => {
		if (!isLoading) {
			document.dispatchEvent(new CustomEvent("pageLoaded"));
		}
	}, [isLoading]);

	return (
		<>
			<section className={styles.container}>
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

			{!isLoading && repositoryData.length === 0 && (
				<div className={styles.empty}>
					<span>No hay widgets configurados.</span>
				</div>
			)}
		</>
	);
};
