import { FC, useMemo } from "react";

import { config } from "../../devdash_config";
import { GithubRepositoryRepository } from "../../domain";
import styles from "./Dashboard.module.scss";
import { GitHubRepositoryWidget } from "./GitHubRepositoryWidget";
import { useGitHubRepositories } from "./useGitHubRepositories";
import { WidgetsSkeleton } from "./WidgetsSkeleton";

interface Props {
	repository: GithubRepositoryRepository;
}

export const Dashboard: FC<Props> = ({ repository }) => {
	const gitHubRepositoryUrls = useMemo(
		() => config.widgets.map((widget) => widget.repository_url),
		[]
	);

	const { repositoryData, isLoading } = useGitHubRepositories(repository, gitHubRepositoryUrls);

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
				</section>
			)}
		</>
	);
};
