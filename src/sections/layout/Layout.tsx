import { Link, Outlet } from "react-router-dom";

import { ErrorBoundary } from "./ErrorBoundary";
import styles from "./Layout.module.scss";
import { TopBarProgressByLocation } from "./TopBarProgressByLocation";

const title = "DevDash_";

export const Layout = () => {
	return (
		<>
			<TopBarProgressByLocation />

			<header className={styles.header}>
				<section className={styles.header__container}>
					<Link to="/">
						<h1 className={styles.header__brand}>{title}</h1>
					</Link>
				</section>
			</header>

			<ErrorBoundary>
				<Outlet />
			</ErrorBoundary>
		</>
	);
};
