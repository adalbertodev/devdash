import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";

TopBarProgress.config({
	barColors: {
		"0": "#3cff64",
	},
	shadowBlur: 5,
});

export const TopBarProgressByLocation = () => {
	const [progress, setProgress] = useState(false);
	const [previousLocation, setPreviousLocation] = useState("");
	const location = useLocation();

	useEffect(() => {
		setPreviousLocation(location.pathname);
	}, [location.pathname]);

	useEffect(() => {
		if (previousLocation !== location.pathname) {
			setProgress(true);
		}
	}, [location.pathname, previousLocation]);

	useEffect(() => {
		const disableTopBar = () => {
			setProgress(false);
		};

		document.addEventListener("pageLoaded", disableTopBar);

		return () => {
			document.removeEventListener("pageLoaded", disableTopBar);
		};
	}, []);

	if (!progress) {
		return <></>;
	}

	return <TopBarProgress />;
};
