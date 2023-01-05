import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { DashboardFactory } from "./sections/dashboard/DashboardFactory";
import { GitHubRepositoryDetailFactory } from "./sections/detail/GitHubRepositoryDetailFactory";

const router = createBrowserRouter([
	{
		path: "/",
		element: DashboardFactory.create(),
	},
	{
		path: "/repository/:organization/:name",
		element: GitHubRepositoryDetailFactory.create(),
	},
]);

export const Router = () => {
	return <RouterProvider router={router} />;
};
