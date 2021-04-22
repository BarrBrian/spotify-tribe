import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ArtistCard from './ArtistCard.jsx';

const TopArtists = props => {

  useEffect(() => {
    fetchArtists();
  }, [])

  const { username } = useParams();
  const [artists, setArtists] = useState([])


  const fetchArtists = async () => {
    const spotifyQuery = encodeURIComponent('https://api.spotify.com/v1/me/top/artists');
    const data = await fetch(
      `http://localhost:8080/api/spotify/?user=${username}&q=${spotifyQuery}`
    )

    const responseObj = await data.json();
    const topArtists = responseObj.items;
    setArtists(topArtists);
  }

  const artistList = []

  const generateArtistList = () => {

    const artistLimit = Math.min(10,artists.length);;

    for (let i = 0; i < artistLimit; i += 1){
  
      const artist = artists[i]
      
      artistList.push(
        <li>
          <ArtistCard 
            key={i}
            artistUrl={artist.external_urls.spotify}
            imageSrc={artist.images[1].url}
            artistName={artist.name}
          />
        </li>)
    }
  }

 generateArtistList();

  return (
    <div className='top-artists-container'>
      <h3>My Top Artists (6-months)</h3>
      <ul className="top-artist-list scroll-style">
        {artistList}
      </ul>
    </div>
  )
};

export default TopArtists;