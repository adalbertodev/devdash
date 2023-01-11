import { FC } from "react";

import styles from "./TextField.module.scss";

interface Props {
	children?: React.ReactNode;
	className?: string;
	mode?: "light" | "dark";
	error?: string;
	id?: string;
	name?: string;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	value?: string;
	placeholder?: string;
}

export const TextField: FC<Props> = ({ children, className, mode = "dark", error, ...props }) => {
	return (
		<div className={styles.container}>
			<input
				autoComplete="off"
				className={`${mode === "dark" ? styles.dark : styles.light} ${styles.textfield} ${
					className ?? ""
				}`}
				type="text"
				{...props}
			>
				{children}
			</input>

			{error && error !== "" && (
				<p className={styles.error} role="alert">
					{error}
				</p>
			)}
		</div>
	);
};
