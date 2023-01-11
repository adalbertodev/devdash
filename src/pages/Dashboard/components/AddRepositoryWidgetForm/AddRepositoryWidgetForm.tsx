/* eslint-disable @typescript-eslint/no-misused-promises */
import { FC, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Add, BackArrow } from "../../../../assets/svgs";
import { SubmitButton, TextField } from "../../../../components";
import { FormEvent } from "../../../../domain";
import { NotUrlValidError } from "../../../../domain/errors";
import {
	RepositoryAlreadyExistsError,
	RepositoryWidgetRepository,
} from "../../../../domain/RepositoryWidget";
import { useAddRepositoryWidget } from "../../hooks";
import styles from "./AddRepositoryWidgetForm.module.scss";

type FormFields = {
	repositoryUrl: string;
};

interface Props {
	repository: RepositoryWidgetRepository;
}

export const AddRepositoryWidgetForm: FC<Props> = ({ repository }) => {
	const [isFormActive, setIsFormActive] = useState(false);
	const [error, setError] = useState("");
	const { save } = useAddRepositoryWidget(repository);

	const submitForm = async (event: FormEvent<FormFields>): Promise<void> => {
		event.preventDefault();

		const { repositoryUrl } = event.target.elements;
		const error = await save({ id: uuidv4().toString(), repositoryUrl: repositoryUrl.value });

		const errorMessage =
			error instanceof RepositoryAlreadyExistsError
				? "Repositorio duplicado"
				: error instanceof NotUrlValidError
				? "URL inválida"
				: "";
		setError(errorMessage);

		setIsFormActive(false);
	};

	return (
		<article className={styles.add_widget}>
			<div className={styles.container}>
				{!isFormActive && error === "" ? (
					<button onClick={() => setIsFormActive(true)} className={styles.add_button}>
						<Add />
						<p>Añadir repositorio</p>
					</button>
				) : (
					<>
						<button className={styles.back_button} onClick={() => setIsFormActive(false)}>
							<BackArrow />
						</button>

						<form className={styles.form} onSubmit={submitForm}>
							<div>
								<label htmlFor="repositoryUrl">URL del repositorio</label>
								<TextField name="repositoryUrl" id="repositoryUrl" error={error} />
							</div>

							<div className={styles.submit_section}>
								<SubmitButton>Añadir</SubmitButton>
							</div>
						</form>
					</>
				)}
			</div>
		</article>
	);
};
