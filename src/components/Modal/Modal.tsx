import { FC, useCallback } from "react";

import styles from "./Modal.module.scss";

interface Props {
	setIsOpen: (newState: boolean) => void;
	deleteAction: () => Promise<void>;
}

export const Modal: FC<Props> = ({ setIsOpen, deleteAction }) => {
	const handleDelete = useCallback(() => {
		setIsOpen(false);
		deleteAction().catch((error: Error) => console.error(error));
	}, [deleteAction, setIsOpen]);

	return (
		<>
			<div className={styles.darkBG} onClick={() => setIsOpen(false)} />

			<div className={styles.centered}>
				<div className={styles.modal}>
					<div className={styles.modalHeader}>
						<h5 className={styles.heading}>¿Estás seguro de borrar este repositorio?</h5>
					</div>

					<p className={styles.modalContent}>
						Se borrará este repositorio de tu lista de repositorios
					</p>

					<div className={styles.modalActions}>
						<button className={styles.cancelBtn} onClick={() => setIsOpen(false)}>
							Cancelar
						</button>

						<button className={styles.deleteBtn} onClick={handleDelete}>
							Borrar
						</button>
					</div>
				</div>
			</div>
		</>
	);
};
