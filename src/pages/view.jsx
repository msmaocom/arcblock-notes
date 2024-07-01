import { Link, useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import {
  Header,
  Button,
  ModalContent,
  ModalActions,
  Modal,
} from 'semantic-ui-react'

import { delNote, fetchNote } from '../libs/api';

function View() {

  const params = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState({});
  const [delModalVisble, setDelModalVisble] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchNote(params.id).then((res) => {
        if (res.code === 0) {
          setNote(res.data);
        }
      });
    }
  }, []);

  const onConfirmDelete = (e) => {
    if (note && note.id) {
      delNote(note.id).then(() => {
        setDelModalVisble(false);
        navigate('/notes');
      });
    }
  };

  return (
    <div>
      <Header as='h2'>{note.title}</Header>
      <Header as='h4' textAlign='right'>
        <Link to={`/notes/write/${note.id}`} style={{ marginRight: '5px' }}>edit</Link>
        <Link to={'#'} onClick={() => setDelModalVisble(true) }>del</Link>
      </Header>
      <div>
        {note.content && note.content.length > 200 ? `${note.content.slice(0, 200)}...` : note.content}
      </div>

      {delModalVisble && (
        <Modal
          size={'tiny'}
          open={delModalVisble}
          onClose={() => setDelModalVisble(false)}
        >
          <ModalContent>
            <p>Are you sure you want to delete this note?</p>
          </ModalContent>
          <ModalActions>
            <Button negative onClick={() => setDelModalVisble(false)}>
              Cancel
            </Button>
            <Button positive onClick={onConfirmDelete}>
              Confirm
            </Button>
          </ModalActions>
        </Modal>
      )}
    </div>
  );
}

export default View;
