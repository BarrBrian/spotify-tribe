import React from 'react';
import { useParams } from 'react-router-dom';

import ProfileHeader from './ProfileHeader.jsx';
import ProfileButtons from './ProfileButtons.jsx';
import TopArtists from './TopArtists.jsx';
import FeaturedPlaylist from './FeaturedPlaylist.jsx';
import SearchBar from './SearchBar.jsx';

const Profile = props => {

  const { username } = useParams();
  
  return (
    <div className="profile-page">
      <ProfileHeader />
      {/* <SearchBar /> */}
      <TopArtists />
      <FeaturedPlaylist />
    </div>
  )
};

export default Profile;