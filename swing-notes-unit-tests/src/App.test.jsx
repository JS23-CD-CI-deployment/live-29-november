import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe } from "vitest";
import { Provider } from "react-redux";
import store from "./store/store";
import App from "./App";

describe("App", () => {
  it("should fetch and display notes", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const usernameInput = screen.getByPlaceholderText("Användarnamn");
    const getNotesButton = screen.getByText("Hämta anteckningar");

    fireEvent.keyUp(usernameInput, {
      target: { value: "ada" },
    });

    fireEvent.click(getNotesButton);

    await waitFor(() => {
      screen.debug();
      expect(screen.getByText("Första anteckningen")).toBeInTheDocument();
      expect(screen.getByText("Andra anteckningen")).toBeInTheDocument();
    });
  });
});
