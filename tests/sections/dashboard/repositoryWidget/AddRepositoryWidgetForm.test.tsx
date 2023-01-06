import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mock } from "jest-mock-extended";

import { RepositoryWidget } from "../../../../src/domain/RepositoryWidget";
import { LocalStorageRepositoryWidgetRepository } from "../../../../src/infrastructure";
import { AddRepositoryWidgetForm } from "../../../../src/sections/dashboard/repositoryWidget/AddRepositoryWidgetForm";

const mockRepository = mock<LocalStorageRepositoryWidgetRepository>();

describe("AddRepositoryWidgetForm", () => {
	it("show widget form when add button is clicked", async () => {
		render(<AddRepositoryWidgetForm repository={mockRepository} />);

		const button = await screen.findByRole("button", {
			name: new RegExp("Añadir", "i"),
		});
		userEvent.click(button);

		const url = screen.getByLabelText(/URL del repositorio/i);

		expect(url).toBeInTheDocument();
	});

	it("save new widget when form is submitted", async () => {
		const newWidget: RepositoryWidget = {
			id: "[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}",
			repositoryUrl: "https://github.com/CodelyTV/DevDash",
		};

		render(<AddRepositoryWidgetForm repository={mockRepository} />);

		const button = await screen.findByRole("button", {
			name: new RegExp("Añadir", "i"),
		});
		userEvent.click(button);

		const url = screen.getByLabelText(/URL del repositorio/i);
		userEvent.type(url, newWidget.repositoryUrl);

		const submitButton = await screen.findByRole("button", {
			name: /Añadir/i,
		});
		userEvent.click(submitButton);

		const addAnotherRepositoryFormButton = await screen.findByRole("button", {
			name: new RegExp("Añadir repositorio", "i"),
		});

		expect(addAnotherRepositoryFormButton).toBeInTheDocument();
		// eslint-disable-next-line @typescript-eslint/unbound-method
		expect(mockRepository.save).toHaveBeenCalledWith({
			...newWidget,
			id: expect.stringMatching(new RegExp(newWidget.id, "i")) as string,
		});
	});
});
