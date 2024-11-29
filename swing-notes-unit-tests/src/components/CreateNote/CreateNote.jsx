import { useState } from "react";
import { useSelector } from "react-redux";

function CreateNote() {
  const [title, setTitle] = useState("");
  const [noteText, setNoteText] = useState("");
  const [noteCreated, setNoteCreated] = useState(false);
  const [noteError, setNoteError] = useState("");
  const username = useSelector((state) => {
    return state.notes.username;
  });

  async function postNote() {
    setNoteError("");

    const note = {
      username: username,
      title: title,
      note: noteText,
    };

    let response = await fetch(
      "https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com/api/notes",
      {
        method: "POST",
        body: JSON.stringify(note), // Gör om till ett JSON objekt
        headers: {
          "Content-Type": "application/json", // Berätta för servern att det vi skickar med är ett JSON objekt
        },
      }
    );
    const data = await response.json();

    if (data.success) {
      setNoteCreated(true);

      setTimeout(() => {
        setNoteCreated(false);
      }, 3000);
    } else {
      setNoteError(data.message);
    }
  }

  return (
    <section>
      <input
        type="text"
        placeholder="Titel"
        onKeyUp={(event) => {
          setTitle(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Anteckning"
        onKeyUp={(event) => {
          setNoteText(event.target.value);
        }}
      />
      <button onClick={postNote}>Spara</button>
      {noteCreated ? <h2>Anteckning skapad!</h2> : ""}
      {noteError ? <h2>{noteError}</h2> : ""}
    </section>
  );
}

export default CreateNote;
