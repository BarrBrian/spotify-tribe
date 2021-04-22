import React from 'react';
import { useParams } from 'react-router-dom';

const ProfileButtons = props => {


  return (
    <div className="profile-buttons">
      <button className="follow-button">Follow</button>
      <button className="message-button">Message</button>
    </div>
  )
};

export default ProfileButtons;