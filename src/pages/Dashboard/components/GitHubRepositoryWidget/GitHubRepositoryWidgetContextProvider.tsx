import { createContext, FC, useContext, useEffect, useState } from "react";

import { config } from "../../../../devdash_config";
import { DomainEvents, RepositoryWidget, RepositoryWidgetRepository } from "../../../../domain";

interface ContextProps {
	repositoryWidgets: RepositoryWidget[];
}

const initialState: ContextProps = {
	repositoryWidgets: [],
};

const RepositoryWidgetContext = createContext<ContextProps>(initialState);

interface Props {
	children: React.ReactNode;
	repository: RepositoryWidgetRepository;
}

export const RepositoryWidgetContextProvider: FC<Props> = ({ children, repository }) => {
	const [repositoryWidgets, setRepositoryWidgets] = useState<RepositoryWidget[]>([]);

	useEffect(() => {
		repository
			.search()
			.then((repositoryWidgets) => {
				if (repositoryWidgets.length === 0) {
					setRepositoryWidgets(
						config.widgets.map((widget) => ({
							id: widget.id,
							repositoryUrl: widget.repository_url,
						}))
					);

					return;
				}

				setRepositoryWidgets(repositoryWidgets);
			})
			.catch((error) => console.error(error));
	}, [repository]);

	useEffect(() => {
		const reloadRepositoryWidgets = () => {
			repository
				.search()
				.then(setRepositoryWidgets)
				.catch((error) => console.error(error));
		};

		document.addEventListener(DomainEvents.repositoryWidgetAdded, reloadRepositoryWidgets);

		return () => {
			document.removeEventListener(DomainEvents.repositoryWidgetAdded, reloadRepositoryWidgets);
		};
	}, [repository]);

	return (
		<RepositoryWidgetContext.Provider value={{ repositoryWidgets }}>
			{children}
		</RepositoryWidgetContext.Provider>
	);
};

export const useRepositoryWidgetContext = () => useContext(RepositoryWidgetContext);
