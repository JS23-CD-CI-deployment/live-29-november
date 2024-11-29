import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe } from "vitest";
import CreateNote from "./CreateNote";
import { Provider } from "react-redux";
import store from "../../store/store";
import { configureStore } from "@reduxjs/toolkit";

// const mockStore = configureStore(() => ({
//   notes: { username: "ada" },
// }));

describe("CreateNote", () => {
  it("should create a note successfully", async () => {
    render(
      <Provider store={store}>
        <CreateNote />
      </Provider>
    );

    const titleInput = screen.getByPlaceholderText("Titel");
    const noteInput = screen.getByPlaceholderText("Anteckning");
    const saveNoteButton = screen.getByText("Spara");

    fireEvent.keyUp(titleInput, {
      target: { value: "Test" },
    });

    fireEvent.keyUp(noteInput, {
      target: { value: "Skriver test" },
    });

    fireEvent.click(saveNoteButton);

    await waitFor(() => {
      expect(screen.getByText("Anteckning skapad!")).toBeInTheDocument();
    });
  });

  it("should show an error if note creation failed", async () => {
    render(
      <Provider store={store}>
        <CreateNote />
      </Provider>
    );

    const titleInput = screen.getByPlaceholderText("Titel");
    const saveNoteButton = screen.getByText("Spara");

    fireEvent.keyUp(titleInput, {
      target: { value: "Test" },
    });

    fireEvent.click(saveNoteButton);

    await waitFor(() => {
      expect(screen.getByText("Missing data")).toBeInTheDocument();
    });
  });
});
