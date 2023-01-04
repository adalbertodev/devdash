import { FC, useEffect, useState } from "react";

import { config } from "../../devdash_config";
import { GitHubRepository, GithubRepositoryRepository } from "../../domain";
import styles from "./Dashboard.module.scss";
import { GitHubRepositoryWidget } from "./GitHubRepositoryWidget";
import { Brand } from "./svgs";

const title = "DevDash";

interface Props {
	repository: GithubRepositoryRepository;
}

export const Dashboard: FC<Props> = ({ repository }) => {
	const [repositoryData, setrepositoryData] = useState<GitHubRepository[]>([]);

	// eslint-disable-next-line no-console
	console.log(repositoryData);

	useEffect(() => {
		repository
			.search(config.widgets.map((widget) => widget.repository_url))
			.then((repositoryData) => {
				setrepositoryData(repositoryData);
			})
			.catch((error) => console.error(error));
	}, [repository]);

	return (
		<>
			<header className={styles.header}>
				<section className={styles.header__container}>
					<Brand />
					<h1 className={styles.app__brand}>{title}</h1>
				</section>
			</header>
			{repositoryData.length === 0 ? (
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
