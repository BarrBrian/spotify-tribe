import React from 'react';
import { useParams } from 'react-router-dom';

const ProfilePhoto = props => {

  const { username } = useParams();

  return (
    <div className="pfp-container">
      <img className="profile-photo" src='https://i.scdn.co/image/ab6775700000ee8529fbf5b11081702540ebdddb' />
    </div>
  )
};

export default ProfilePhoto;