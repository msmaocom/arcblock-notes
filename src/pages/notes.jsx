import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, Header } from 'semantic-ui-react'
import { fetchNotes, delNote } from '../libs/api';

function Notes() {

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes().then((res) => setNotes(res.data || []));
  }, []);

  const deleleNote = (id) => {

  }

  const renderNote = (note, index) => {
    return (
      <>
        <Header as='h3'>
          <Link to={`/notes/view/${note.id}`}>{index+1}. {note.title}</Link>
        </Header>
        <p>{note.content.length > 200 ? `${note.content.slice(0, 200)}...` : note.content}</p>
      </>
    )
  }

  return (
    <div>
      <Header as='h4' textAlign='right'>
        <Link to={`/notes/write`}>write</Link>
      </Header>
      <List>
        {notes.map((note, index) => {
          return (
            <ListItem key={note.id} content={renderNote(note, index)} />
          )
        })}
      </List>
    </div>
  );
}

export default Notes;
