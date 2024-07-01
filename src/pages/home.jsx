import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem } from 'semantic-ui-react'
import EditProfile from '../components/EditProfile';
import logo from '../logo.svg';
import { fetchProfile } from '../libs/api';

function Home() {
  const [profile, setProfile] = useState({});
  const [edit, setEdit] = useState(false);

  const saveAuthUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  }

  useEffect(() => {
    fetchProfile().then((res) => {
      setProfile(res.data);
      saveAuthUser(res.data);
    });
  }, []);

  const renderProfile = () => {
    if (edit) {
      return <EditProfile
        profile={profile}
        onOk={() => {
          fetchProfile().then((res) => {
            setProfile(res.data);
            saveAuthUser(res.data);
          });
          setEdit(false);
        }}
      />
    }
    return (
      <List>
        <ListItem icon='user' content={profile.username} />
        <ListItem icon='tint' content={profile.age} />
        <ListItem
          icon='phone'
          content={<a href={`tel:${profile.phone}`}>{profile.phone}</a>}
        />
        <ListItem
          icon='mail'
          content={<a href={`mailto:${profile.email}`}>{profile.email}</a>}
        />
        <ListItem icon='als' content={profile.summary} />
      </List>
    )
  }

  return (
    <div>
      <h2>profile (<a href='#' onClick={() => setEdit(!edit)}>{edit ? 'back' : 'edit'}</a>)</h2>
      {renderProfile()}
    </div>
  );
}

export default Home;
