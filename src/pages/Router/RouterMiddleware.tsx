import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { LocalStorageGitHubAccessTokenRepository } from "../../infrastructure";
import { GitHubAccessTokenSearcher } from "../../infrastructure/GitHubAccessToken";

const ghAccessTokenRepository = new LocalStorageGitHubAccessTokenRepository();
const ghAccessTokenSearcher = new GitHubAccessTokenSearcher(ghAccessTokenRepository);

interface Props {
	children: React.ReactNode;
}

export const RouterMiddleware: FC<Props> = ({ children }) => {
	const navigate = useNavigate();

	const ghAccessToken = ghAccessTokenSearcher.search();

	useEffect(() => {
		if (!ghAccessToken) {
			navigate("/config");
		}
	}, [ghAccessToken, navigate]);

	return <>{children}</>;
};
