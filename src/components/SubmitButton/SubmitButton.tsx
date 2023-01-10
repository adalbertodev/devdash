import { FC } from "react";

import styles from "./SubmitButton.module.scss";

interface Props {
	children?: React.ReactNode;
	className?: string;
}

export const SubmitButton: FC<Props> = ({ children, className }) => {
	return (
		<button className={`${styles["submit-button"]} ${className ?? ""}`} type="submit">
			{children}
		</button>
	);
};
