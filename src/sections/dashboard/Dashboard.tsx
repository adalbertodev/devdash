import { FC } from "react";

import { config } from "../../devdash_config";
import { GithubRepositoryRepository } from "../../domain";
import styles from "./Dashboard.module.scss";
import { GitHubRepositoryWidget } from "./GitHubRepositoryWidget";
import { Brand } from "./svgs";
import { useGitHubRepositories } from "./useGitHubRepositories";

const title = "DevDash";
const gitHubRepositoriesUrls = config.widgets.map((widget) => widget.repository_url);

interface Props {
	repository: GithubRepositoryRepository;
}

export const Dashboard: FC<Props> = ({ repository }) => {
	const { repositories } = useGitHubRepositories(repository, gitHubRepositoriesUrls);

	return (
		<>
			<header className={styles.header}>
				<section className={styles.header__container}>
					<Brand />
					<h1 className={styles.app__brand}>{title}</h1>
				</section>
			</header>
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
