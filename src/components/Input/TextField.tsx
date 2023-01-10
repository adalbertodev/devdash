import { FC } from "react";

import styles from "./TextField.module.scss";

interface Props {
	children?: React.ReactNode;
	className?: string;
	mode?: "light" | "dark";
	id?: string;
	name?: string;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	value?: string;
}

export const TextField: FC<Props> = ({ children, className, mode = "dark", ...props }) => {
	return (
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
	);
};
