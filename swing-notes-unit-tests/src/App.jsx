import { useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { setUsername } from "./reducers/notesReducer";

import Note from "./components/Note/Note";
import CreateNote from "./components/CreateNote/CreateNote";

function App() {
  const [notes, setNotes] = useState([]);
  //const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const username = useSelector((state) => {
    return state.notes.username;
  });

  async function getNotes() {
    const response = await fetch(
      `https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com/api/notes/${username}`
    );
    const data = await response.json();
    setNotes(data.notes);
  }

  const noteComponents = notes.map((note) => {
    return <Note note={note} key={note.id} getNotes={getNotes} />;
  });

  return (
    <main>
      <section>
        <input
          type="text"
          placeholder="Användarnamn"
          onKeyUp={(event) => {
            dispatch(setUsername(event.target.value));
          }}
        />
        <button onClick={getNotes}>Hämta anteckningar</button>
      </section>
      <CreateNote />
      <section>{noteComponents}</section>
    </main>
  );
}

export default App;
