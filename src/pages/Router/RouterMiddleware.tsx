import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { LocalStorageGitHubAccessTokenRepository } from "../../infrastructure/GitHubAccessToken";

const ghAccessTokenRepository = new LocalStorageGitHubAccessTokenRepository();

interface Props {
	children: React.ReactNode;
}

export const RouterMiddleware: FC<Props> = ({ children }) => {
	const navigate = useNavigate();

	const ghAccessToken = ghAccessTokenRepository.search();

	useEffect(() => {
		if (!ghAccessToken) {
			navigate("/config");
		}
	}, [ghAccessToken, navigate]);

	return <>{children}</>;
};
