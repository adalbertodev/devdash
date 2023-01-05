import { Outlet } from "react-router-dom";

import styles from "./Layout.module.scss";
import { Brand } from "./svgs";

const title = "DevDash";

export const Layout = () => {
	return (
		<>
			<header className={styles.header}>
				<section className={styles.header__container}>
					<Brand />
					<h1 className={styles.header__brand}>{title}</h1>
				</section>
			</header>

			<Outlet />
		</>
	);
};
