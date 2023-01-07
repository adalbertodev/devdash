import { LocalStorageRepositoryWidgetRepository } from "./infrastructure";
import { Router } from "./Router";
import { RepositoryWidgetContextProvider } from "./sections/dashboard";

const repository = new LocalStorageRepositoryWidgetRepository();

export function App() {
	return (
		<RepositoryWidgetContextProvider repository={repository}>
			<Router />
		</RepositoryWidgetContextProvider>
	);
}
