export interface DevDashConfig {
	github_access_token: string;
	widgets: {
		id: string;
		repository_url: string;
	}[];
}

export const config: DevDashConfig = {
	github_access_token: process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN as string,
	widgets: [
		{
			id: "fce4975a-8466-4add-bbcf-90027e3e8133",
			repository_url: "https://github.com/CodelyTV/cra-template-codely",
		},
		{
			id: "2085c265-dba4-49c4-b1ce-234d02923d34",
			repository_url: "https://github.com/reactjs/reactjs.org",
		},
		{
			id: "5607c9a8-e2f3-44f0-bf24-9c833b05068e",
			repository_url: "https://github.com/jwasham/coding-interview-university",
		},
	],
};
