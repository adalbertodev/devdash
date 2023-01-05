import { FC } from "react";

import { config } from "../../devdash_config";
import { GithubRepositoryRepository } from "../../domain";
import styles from "./Dashboard.module.scss";
import { GitHubRepositoryWidget } from "./GitHubRepositoryWidget";
import { useGitHubRepositories } from "./useGitHubRepositories";

const gitHubRepositoriesUrls = config.widgets.map((widget) => widget.repository_url);

interface Props {
	repository: GithubRepositoryRepository;
}

export const Dashboard: FC<Props> = ({ repository }) => {
	const { repositories } = useGitHubRepositories(repository, gitHubRepositoriesUrls);

	return (
		<>
			{repositories.length === 0 ? (
				<div className={styles.empty}>
					<span>No hay widgets configurados.</span>
				</div>
			) : (
				<section className={styles.container}>
					{repositories.map((widget) => (
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
