import React, { FC, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Add } from "../../../assets/svgs";
import { RepositoryWidgetRepository } from "../../../domain";
import styles from "./AddRepositoryWidgetForm.module.scss";
import { useAddRepositoryWidget } from "./useAddRepositoryWidget";

type FormEvent<T> = React.FormEvent<HTMLFormElement> & {
	target: { elements: { [key in keyof T]: { value: T[key] } } };
};

type FormFields = {
	repositoryUrl: string;
};

interface Props {
	repository: RepositoryWidgetRepository;
}

export const AddRepositoryWidgetForm: FC<Props> = ({ repository }) => {
	const [isFormActive, setIsFormActive] = useState(false);
	const { save } = useAddRepositoryWidget(repository);

	const submitForm = async (event: FormEvent<FormFields>): Promise<void> => {
		event.preventDefault();

		const { repositoryUrl } = event.target.elements;
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
							<label htmlFor="repositoryUrl">URL del repositorio</label>
							<input type="text" name="repositoryUrl" id="repositoryUrl" />
						</div>

						<div>
							<button type="submit">Añadir</button>
						</div>
					</form>
				)}
			</div>
		</article>
	);
};
