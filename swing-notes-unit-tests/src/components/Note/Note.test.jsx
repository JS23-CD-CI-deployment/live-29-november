import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Note from "./Note";
import { describe } from "vitest";

const mockGetNotes = vi.fn();

describe("Note", () => {
  it("should call getNotes after successfully deleting a note", async () => {
    const note = {
      createdAt: "5/23/2024",
      id: "US0oobQukoiu8C8qmQxyM",
      note: "Min första anteckning",
      title: "Första anteckningen",
      username: "ada",
    };

    render(<Note note={note} getNotes={mockGetNotes} />);

    const deleteButton = screen.getByText("Ta bort");

    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockGetNotes).toHaveBeenCalledTimes(1);
    });
  });
});
