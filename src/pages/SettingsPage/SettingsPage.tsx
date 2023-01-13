import { FC, useCallback, useEffect } from "react";

import { SubmitButton, TextField } from "../../components";
import { DomainEvents } from "../../domain";
import { FormEvent } from "../../domain/FormEvent";
import { GitHubAccessTokenRepository } from "../../domain/GitHubAccessToken";
import { useSaveConfig } from "./hooks";
import styles from "./SettingsPage.module.scss";

type FormFields = { ghAccessToken: string };

interface Props {
	repository: GitHubAccessTokenRepository;
}

export const SettingsPage: FC<Props> = ({ repository }) => {
	const { save } = useSaveConfig(repository);

	const submitForm = useCallback(
		(ev: FormEvent<FormFields>) => {
			ev.preventDefault();
			const { ghAccessToken } = ev.target.elements;
			save(ghAccessToken.value);

			window.location.href = "/";
		},
		[save]
	);

	useEffect(() => {
		document.dispatchEvent(new CustomEvent(DomainEvents.pageLoaded));
	}, []);

	return (
		<section className={styles.config}>
			<h2>Configuración</h2>
			<p>
				⚙️ Aquí puedes configurar tu GitHub Access Token para que <i>DevDash_</i> obtenga los datos
				de los repositorios de Github.
			</p>
			<p>
				Puedes obtener más info sobre cómo obtener el token{" "}
				<a
					target="_blank"
					href="https://docs.github.com/en/enterprise-server@3.4/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token"
					rel="noreferrer"
				>
					aquí
				</a>
			</p>

			<form className={styles.form} onSubmit={submitForm}>
				<label htmlFor="ghAccessToken">GitHub Access Token</label>
				<TextField
					id="ghAccessToken"
					name="ghAccessToken"
					mode="light"
					placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
				/>

				<div className={styles.submit_section}>
					<SubmitButton>Guardar</SubmitButton>
				</div>
			</form>
		</section>
	);
};
