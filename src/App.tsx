import { Router } from "./Router";
import { RepositoryWidgetContextProvider } from "./sections/dashboard";

export function App() {
	return (
		<RepositoryWidgetContextProvider>
			<Router />
		</RepositoryWidgetContextProvider>
	);
}
