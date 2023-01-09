import styles from "./Loader.module.scss";

//https://loading.io/css/
export const Loader = () => {
	return (
		<div className={styles.loader__container}>
			<div className={styles["lds-ellipsis"]}>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
};
