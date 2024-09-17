import { useState, useEffect } from 'react';
import api from '../api';
import Note from '../components/Note';
const Home = () => {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    //alternative - just use try and catch. and remember you can destructure from res instead like this:

    //const { data } = await api.get('/api/notes/')

    // instead of doing two lines like below

    // const res = await api.get('/api/notes/');
    // const data = await res.data;

    api
      .get('/api/notes/')
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteNote = async (id) => {
    try {
      const { status } = await api.delete(`/api/notes/delete/${id}/`);
      if (status === 204) alert('Note deleted!');
      else alert('failed to delete note');
      getNotes(); //not optimal, should just remove from list and filter etc
    } catch (error) {
      alert(error);
    }
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post('/api/notes/', { content, title })
      .then((res) => {
        if (res.status === 201) alert('note created');
        else alert('failed to make note.');
        getNotes(); //not optimal
      })
      .catch((err) => alert(err));
  };
  return (
    <>
      <div>
        <h2>Notes</h2>
        {notes.map((note) => (
          <Note key={note.id} note={note} onDelete={deleteNote} />
        ))}
      </div>
      <form onSubmit={createNote}>
        <label htmlFor='title'>Title</label>
        <br />
        <input
          type='text'
          id='title'
          name='title'
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <label htmlFor='content'>Content</label>
        <br />
        <textarea
          name='content'
          id='content'
          required
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <br />
        <input type='submit' value='submit' />
      </form>
    </>
  );
};

export default Home;
