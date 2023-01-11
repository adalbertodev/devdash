import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Layout } from "../../components/Layout";
import { DashboardFactory } from "../Dashboard";
import { GitHubRepositoryDetailFactory } from "../GitHubRepositoryDetails";
import { SettingsPageFactory } from "../SettingsPage";
import { RouterMiddleware } from "./RouterMiddleware";

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<RouterMiddleware>
				<Layout />,
			</RouterMiddleware>
		),
		children: [
			{
				path: "/",
				element: <DashboardFactory />,
			},
			{
				path: "/repository/:organization/:name",
				element: <GitHubRepositoryDetailFactory />,
			},
			{
				path: "/config",
				element: <SettingsPageFactory />,
			},
		],
	},
]);

export const Router = () => {
	return <RouterProvider router={router} />;
};
