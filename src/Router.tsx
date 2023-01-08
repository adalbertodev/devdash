import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ConfigFactory } from "./sections/config";
import { DashboardFactory } from "./sections/dashboard/DashboardFactory";
import { GitHubRepositoryDetailFactory } from "./sections/gitHubRepositoryDetail/GitHubRepositoryDetailFactory";
import { Layout } from "./sections/layout";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
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
