import React, { FC, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Add } from "../../../assets/svgs";
import {
	NotUrlValidError,
	RepositoryAlreadyExistsError,
	RepositoryWidgetRepository,
} from "../../../domain";
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
	const [hasAlreadyExistsError, setHasAlreadyExistsError] = useState(false);
	const [hasUrlError, setHasUrlError] = useState(false);
	const { save } = useAddRepositoryWidget(repository);

	const submitForm = async (event: FormEvent<FormFields>): Promise<void> => {
		event.preventDefault();

		const { repositoryUrl } = event.target.elements;
		const error = await save({ id: uuidv4().toString(), repositoryUrl: repositoryUrl.value });

		setHasAlreadyExistsError(error instanceof RepositoryAlreadyExistsError);
		setHasUrlError(error instanceof NotUrlValidError);

		setIsFormActive(false);
	};

	return (
		<article className={styles.add_widget}>
			<div className={styles.container}>
				{!isFormActive && !hasAlreadyExistsError && !hasUrlError ? (
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

						{hasAlreadyExistsError && (
							<p className={styles.error} role="alert" aria-describedby="duplicated-error">
								<span id="duplicated-error">Repositorio duplicado</span>
							</p>
						)}

						{hasUrlError && (
							<p className={styles.error} role="alert" aria-describedby="url-error">
								<span id="url-error">URL invalida</span>
							</p>
						)}

						<div>
							<button type="submit">Añadir</button>
						</div>
					</form>
				)}
			</div>
		</article>
	);
};
