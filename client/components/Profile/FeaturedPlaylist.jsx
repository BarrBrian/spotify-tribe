import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const FeaturedPlaylist = props => {

  const reg = /playlist[:\/](.*)/

  const uri = props.uri.match(reg)[1];

  console.log(uri);
  
  const playlistUri = uri || '2abUF7iBSFlamCt6iTXbCZ'

  return (
    <div className="featured-playlist">
      <h3>Featured Playlist</h3>
      <iframe src={`https://open.spotify.com/embed/playlist/${playlistUri}`} 
              width="100%" height="100%" 
              frameBorder="0"
              allow="encrypted-media">
      </iframe>
    </div>
  )
};

export default FeaturedPlaylist;