import { useMemo } from "react";
import { Link, Outlet } from "react-router-dom";

import { ErrorBoundary, TopBarProgressByLocation } from "./components";
import styles from "./Layout.module.scss";

export const Layout = () => {
	const title = useMemo(() => "DevDash_", []);

	return (
		<>
			<TopBarProgressByLocation />

			<header className={styles.header}>
				<section className={styles.header__container}>
					<div className={styles.brand__container}>
						<Link to="/">
							<h1 className={styles.app__brand}>{title}</h1>
						</Link>
					</div>

					<Link to="/config">
						<span>⚙️</span>
					</Link>
				</section>
			</header>

			<ErrorBoundary>
				<Outlet />
			</ErrorBoundary>
		</>
	);
};
