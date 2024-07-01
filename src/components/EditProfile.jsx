import React, { useEffect, useState } from 'react'
import {
  FormGroup,
  FormField,
  Button,
  Form,
  Input,
  TextArea,
} from 'semantic-ui-react'

import { updateProfile } from '../libs/api';

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
]

function EditProfile(props) {
  const { profile, onOk } = props;

  const [formData, setFormData] = useState({
    username: '',
    age: '',
    email: '',
    phone: '',
    summary: '',
  });
  const [formError, setFormError] = useState({})

  useEffect(() => {
    if (profile && Object.keys(profile).length > 0) {
      setFormData(profile);
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (['username', 'age', 'phone', 'email'].includes(name)) {
      setFormError(prevError => ({
        ...prevError,
        [name]: !value.length ? `${name} is required` : false
      }))
    }
    
    if (name === 'phone') {
      setFormError(prevError => ({
        ...prevError,
        [name]: !/^1[3-9]\d{9}$/.test(value) ? 'Invalid phone number' : false
      }))
    }

    if (name === 'email') {
      setFormError(prevError => ({
        ...prevError,
        [name]: !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value) ? 'Invalid email' : false
      }))
    }

    if (name === 'summary' && value) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(formError).some(v => v)) {
      return
    }
    if (profile && profile.id && Object.keys(formData).length > 0) {
      updateProfile(profile.id, formData).then(() => {
        if (onOk) onOk();
      });
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FormGroup widths='equal'>
          <FormField
            control={Input}
            label='Username'
            placeholder='username'
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            error={formError.username}
          />
          <FormField
            control={Input}
            type="number"
            label='Age'
            placeholder='age'
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            error={formError.age}
          />
        </FormGroup>
        <FormGroup widths='equal'>
          <FormField
            control={Input}
            label='Phone'
            placeholder='phone'
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            error={formError.phone}
          />
          <FormField
            control={Input}
            label='Email'
            placeholder='email'
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            error={formError.email}
          />
        </FormGroup>
        <FormField
          control={TextArea}
          label='summary'
          placeholder='Tell us more about you...'
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          error={formError.summary}
        />
        <FormField control={Button} disabled={Object.values(formError).some(v => v)}>Save</FormField>
      </Form>
    </div>
  );
}

export default EditProfile;
