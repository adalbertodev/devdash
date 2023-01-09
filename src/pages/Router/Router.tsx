import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Layout } from "../../components/Layout";
import { DashboardFactory } from "../Dashboard/DashboardFactory";
import { GitHubRepositoryDetailFactory } from "../GitHubRepositoryDetails";
import { ConfigFactory } from "../SettingsPage";
import { RouterMiddleware } from "./RouterMiddleware";

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<RouterMiddleware>
				<Layout />
			</RouterMiddleware>
		),
		children: [
			{
				path: "/",
				element: <DashboardFactory />,
			},
			{
				path: "/repository/:organization/:name",
				element: GitHubRepositoryDetailFactory.create(),
			},
			{
				path: "/config",
				element: <ConfigFactory />,
			},
		],
	},
]);

export const Router = () => {
	return <RouterProvider router={router} />;
};
