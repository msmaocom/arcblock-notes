import { Link, useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import {
  FormGroup,
  FormField,
  Button,
  Checkbox,
  Form,
  Input,
  Radio,
  Select,
  TextArea,
} from 'semantic-ui-react'

import { addNote, updateNote, fetchNote } from '../libs/api';

function Write() {

  const params = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState({});
  const [profile, setProfile] = useState({});

  useEffect(() => {
    setProfile(JSON.parse(localStorage.getItem('user') || '{}'));
    if (params.id) {
      fetchNote(params.id).then((res) => {
        if (res.code === 0) {
          setNote(res.data);
          setFormData(res.data);
        }
      });
    }
  }, []);

  const [formError, setFormError] = useState({})
  const [formData, setFormData] = useState({
    user_id: '',
    id: '',
    title: '',
    content: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (['title', 'content'].includes(name)) {
      setFormError(prevError => ({
        ...prevError,
        [name]: !value.length ? `${name} is required` : false
      }))
    }

    if (name === 'title' && value) {
      setFormError(prevError => ({
        ...prevError,
        [name]: value.length > 255 ? 'Max size is 255' : false
      }))
    }

    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(formError).some(v => v)) {
      return
    }
    if (profile && profile.id) {
      formData.user_id = profile.id;
    }
    if (note && note.id) {
      await updateNote(note.id, formData);
    } else {
      await addNote(formData);
    }
    navigate('/notes');
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FormField
          control={Input}
          label='Title'
          placeholder='title'
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          error={formError.title}
        />
        <FormField
          control={TextArea}
          label='Content'
          placeholder='Tell us more about you...'
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          error={formError.content}
        />
        <FormField control={Button} disabled={Object.values(formError).some(v => v)}>Save</FormField>
      </Form>
    </div>
  );
}

export default Write;
