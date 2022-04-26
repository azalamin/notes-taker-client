import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import InputForm from "./components/inputForm/InputForm";
import NoteCard from "./components/noteCard/NoteCard";

function App() {
  const [notes, setNotes] = useState([]);
  const [noteRes, setNoteRes] = useState({});

  const handleSearchNotes = (event) => {
    event.preventDefault();
    const queryText = event.target.searchText.value;
    if (queryText) {
      fetch(`http://localhost:5000/notes?user_name=${queryText}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
    }
  }

   useEffect(() => {
     fetch("http://localhost:5000/notes")
       .then((res) => res.json())
       .then((data) => setNotes(data));
   }, [noteRes]);

  // Delete POST
  const handleDeletePost = (id) => {
    fetch(`http://localhost:5000/note/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setNoteRes(data);
      });
  };

  /*
3. there will be a function named handleUpdate
    to update data, and it will be passed as props to NoteCard and 
   later it will be passed to Update modal using props.
 */

  // POST Data
  const handlePost = (event) => {
    event.preventDefault();
    const user_name = event.target.user_name.value;
    const text = event.target.text.value;
    const newNote = { user_name, text };

    fetch("http://localhost:5000/notes", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newNote),
    })
      .then((res) => res.json())
      .then((data) => {
        event.target.reset();
        setNoteRes(data);
      });
  };

  return (
    <div className="App">
      <Header handleSearchNotes={handleSearchNotes} />
      <InputForm handlePost={handlePost} />
      <div className="row row-cols-1 row-cols-md-3 g-4 m-2">
        {notes.map((note) => (
          <NoteCard
            key={note._id}
            handleDeletePost={handleDeletePost}
            note={note}
            setNoteRes={setNoteRes}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
