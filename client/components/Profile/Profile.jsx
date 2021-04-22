import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ProfileHeader from './ProfileHeader.jsx';
import ProfileButtons from './ProfileButtons.jsx';
import TopArtists from './TopArtists.jsx';
import FeaturedPlaylist from './FeaturedPlaylist.jsx';
import TopRecentSongs from './TopRecentSongs.jsx'

const Profile = props => {

  // const { username } = useParams();
  // useEffect(() => {
  //   fetchProfile();
  // }, [])

  // const [layout, setLayout] = useState({})

  // const fetchProfile = async () => {
  //   const data = await fetch('http://localhost:3000/settings/brian-barr')
  // }


  
  
  return (
    <div className="profile-page">
      <ProfileHeader />
      <TopArtists />
      <TopRecentSongs />
      <FeaturedPlaylist />
    </div>
  )
};

export default Profile;