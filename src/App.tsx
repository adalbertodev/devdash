import { LocalStorageRepositoryWidgetRepository } from "./infrastructure";
import { RepositoryWidgetContextProvider } from "./pages/Dashboard";
import { Router } from "./pages/Router";

const repository = new LocalStorageRepositoryWidgetRepository();

export function App() {
	return (
		<RepositoryWidgetContextProvider repository={repository}>
			<Router />
		</RepositoryWidgetContextProvider>
	);
}
