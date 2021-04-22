import React from 'react';
import { useParams } from 'react-router-dom';

import ProfilePhoto from './ProfilePhoto.jsx'
import ProfileButtons from './ProfileButtons.jsx'

const ProfileHeader = props => {

  let { username } = useParams();
  username = decodeURIComponent(username)

  return (
    <div className="profile-header">
      <ProfilePhoto />
      <h3>{username}</h3>
      <div className="profile-bio"> Music. Books. Mountains. Technology. Dancing. </div>
      <ProfileButtons />
    </div>
  )
};

export default ProfileHeader;
