import { createContext, FC, useContext, useEffect, useState } from "react";

import { config } from "../../../devdash_config";
import { RepositoryWidget } from "../../../domain";

interface ContextProps {
	repositoryWidgets: RepositoryWidget[];
}

const RepositoryWidgetContext = createContext<ContextProps>({} as ContextProps);

interface Props {
	children: React.ReactNode;
}

export const RepositoryWidgetContextProvider: FC<Props> = ({ children }) => {
	const [repositoryWidgets, setRepositoryWidgets] = useState<RepositoryWidget[]>([]);

	useEffect(() => {
		setRepositoryWidgets(
			config.widgets.map((widget) => ({ id: widget.id, repositoryUrl: widget.repository_url }))
		);
	}, []);

	return (
		<RepositoryWidgetContext.Provider value={{ repositoryWidgets }}>
			{children}
		</RepositoryWidgetContext.Provider>
	);
};

export const useRepositoryWidgetContext = () => useContext(RepositoryWidgetContext);
