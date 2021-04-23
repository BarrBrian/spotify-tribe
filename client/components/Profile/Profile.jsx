import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ProfileHeader from './ProfileHeader.jsx';
import ProfileButtons from './ProfileButtons.jsx';
import TopArtists from './TopArtists.jsx';
import FeaturedPlaylist from './FeaturedPlaylist.jsx';
import TopRecentSongs from './TopRecentSongs.jsx'

const Profile = props => {

  const { username } = useParams();
  useEffect(() => {
    fetchProfile();
  }, [])

  const [layout, setLayout] = useState({})

  const fetchProfile = async () => {
    const data = await fetch('http://localhost:3000/settings/get/brian-barr')
    const responseObj = await data.json()
    setLayout(responseObj)
  }

  console.log(layout);

  const components = [];

  function selectComponent(widget){
    switch(widget){
      case "TopRecentSongs":
        return <TopRecentSongs />
      case "TopArtists":
        return <TopArtists />
      default:
        <div>Nothing to See Here</div>
    }
  }

  if (Object.keys(layout).length > 0){
    components.push(selectComponent(layout.profile_layout[0].widget_name))
    components.push(selectComponent(layout.profile_layout[1].widget_name))
    if(layout.featured_playlist.active){
      components.push(<FeaturedPlaylist uri={ layout.featured_playlist.uri }/>)
    }
  }

  
  
  return (
    <div className="profile-page">
      <ProfileHeader />
      {components}
    </div>
  )
};

export default Profile;