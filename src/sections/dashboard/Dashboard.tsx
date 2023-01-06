import { FC, useEffect, useMemo } from "react";

import { config } from "../../devdash_config";
import { GithubRepositoryRepository, RepositoryWidgetRepository } from "../../domain";
import styles from "./Dashboard.module.scss";
import { GitHubRepositoryWidget } from "./gitHubRepositoryWidget/GitHubRepositoryWidget";
import { useGitHubRepositories } from "./gitHubRepositoryWidget/useGitHubRepositories";
import { AddWidgetForm } from "./repositoryWidget/AddRepositoryWidgetForm";
import { WidgetsSkeleton } from "./WidgetsSkeleton";

interface Props {
	repository: GithubRepositoryRepository;
	repositoryWidgetRepository: RepositoryWidgetRepository;
}

export const Dashboard: FC<Props> = ({ repository, repositoryWidgetRepository }) => {
	const gitHubRepositoryUrls = useMemo(
		() => config.widgets.map((widget) => widget.repository_url),
		[]
	);

	const { repositoryData, isLoading } = useGitHubRepositories(repository, gitHubRepositoryUrls);

	useEffect(() => {
		if (!isLoading) {
			document.dispatchEvent(new CustomEvent("pageLoaded"));
		}
	}, [isLoading]);

	return (
		<>
			{isLoading && (
				<section className={styles.container}>
					<WidgetsSkeleton numberOfWidgets={gitHubRepositoryUrls.length} />
				</section>
			)}

			{!isLoading && repositoryData.length === 0 ? (
				<div className={styles.empty}>
					<span>No hay widgets configurados.</span>
				</div>
			) : (
				<section className={styles.container}>
					{repositoryData.map((widget) => (
						<GitHubRepositoryWidget
							key={`${widget.id.organization}/${widget.id.name}`}
							widget={widget}
						/>
					))}

					<AddWidgetForm repository={repositoryWidgetRepository} />
				</section>
			)}
		</>
	);
};
