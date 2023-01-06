import React, { FC, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { RepositoryWidgetRepository } from "../../../domain";
import { Add } from "../svgs";
import styles from "./AddRepositoryWidgetForm.module.scss";
import { useAddRepositoryWidget } from "./useAddRepositoryWidget";

type FormEvent<T extends { [key: string]: string }> = React.FormEvent<HTMLFormElement> & {
	target: { [key in keyof T]: { value: T[key] } };
};

type FormFields = {
	repositoryUrl: string;
};

interface Props {
	repository: RepositoryWidgetRepository;
}

export const AddWidgetForm: FC<Props> = ({ repository }) => {
	const [isFormActive, setIsFormActive] = useState(false);
	const { save } = useAddRepositoryWidget(repository);

	const submitForm = async (event: FormEvent<FormFields>): Promise<void> => {
		event.preventDefault();

		const { repositoryUrl } = event.target;
		await save({ id: uuidv4().toString(), repositoryUrl: repositoryUrl.value });

		setIsFormActive(false);
	};

	return (
		<article className={styles.add_widget}>
			<div className={styles.container}>
				{!isFormActive ? (
					<button onClick={() => setIsFormActive(true)} className={styles.add_button}>
						<Add />
						<p>Añadir repositorio</p>
					</button>
				) : (
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					<form className={styles.form} onSubmit={submitForm}>
						<div>
							<label htmlFor="url">URL del repositorio</label>
							<input type="text" name="repositoryUrl" id="repositoryUrl" />
						</div>

						<div>
							<input type="submit" value={"Añadir"} />
						</div>
					</form>
				)}
			</div>
		</article>
	);
};
