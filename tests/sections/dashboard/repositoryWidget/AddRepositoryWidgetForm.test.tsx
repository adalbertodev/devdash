import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mock } from "jest-mock-extended";

import { RepositoryWidget } from "../../../../src/domain/RepositoryWidget";
import { RepositoryWidgetRepository } from "../../../../src/domain/RepositoryWidgetRepository";
import { AddRepositoryWidgetForm } from "../../../../src/sections/dashboard/repositoryWidget/AddRepositoryWidgetForm";

const mockRepository = mock<RepositoryWidgetRepository>();

describe("AddRepositoryWidgetForm", () => {
	beforeEach(() => {
		mockRepository.save.mockReset();
	});

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
		const dispatchEventSpy = jest.spyOn(document, "dispatchEvent");
		mockRepository.search.mockResolvedValue([]);

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
		await waitFor(() =>
			expect(mockRepository.save).toHaveBeenCalledWith({
				...newWidget,
				id: expect.stringMatching(new RegExp(newWidget.id, "i")) as string,
			})
		);

		expect(dispatchEventSpy).toHaveBeenCalledWith(expect.any(Event));
		expect(dispatchEventSpy.mock.calls[0][0].type).toBe("repositoryWidgetAdded");
	});

	it("show error when repository already exist in Dashboard", async () => {
		const existingWidget: RepositoryWidget = {
			id: "existingWidgetId",
			repositoryUrl: "https://github.com/CodelyTV/DevDash",
		};
		mockRepository.search.mockResolvedValue([existingWidget]);

		const newWidgetWithSameUrl: RepositoryWidget = {
			id: "newWidgetId",
			repositoryUrl: "https://github.com/CodelyTV/DevDash",
		};

		render(<AddRepositoryWidgetForm repository={mockRepository} />);

		const button = await screen.findByRole("button", {
			name: new RegExp("Añadir", "i"),
		});
		userEvent.click(button);

		const url = screen.getByLabelText(/URL del repositorio/i);
		userEvent.type(url, newWidgetWithSameUrl.repositoryUrl);

		const submitButton = await screen.findByRole("button", {
			name: /Añadir/i,
		});
		userEvent.click(submitButton);

		const errorMessage = await screen.findByRole("alert", {
			description: /Repositorio duplicado/i,
		});

		expect(errorMessage).toBeInTheDocument();
		await waitFor(() => expect(mockRepository.save).not.toHaveBeenCalled());
	});

	it("validate the typed url on submit", async () => {
		mockRepository.search.mockResolvedValue([]);

		const newWidget: RepositoryWidget = {
			id: "[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}",
			repositoryUrl: "anyWordThatNotBeUrl",
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

		const errorMessage = await screen.findByRole("alert", {
			description: /URL invalida/i,
		});

		expect(errorMessage).toBeInTheDocument();
		await waitFor(() => expect(mockRepository.save).not.toHaveBeenCalled());
	});

	it("disable add button while data is isvalid", async () => {
		// TODO
	});
});
