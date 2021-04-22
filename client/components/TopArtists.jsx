import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ArtistCard from './ArtistCard.jsx';

const TopArtists = props => {

  useEffect(() => {
    fetchArtists();
  }, [])

  const [artists, setArtists] = useState([])

  const { username } = useParams();

  const fetchArtists = async () => {
    const spotifyQuery = encodeURIComponent('https://api.spotify.com/v1/me/top/artists');
    const data = await fetch(
      `http://localhost:8080/api/spotify/?user=${username}&q=${spotifyQuery}`
    )

    const responseObj = await data.json();
    const topArtists = responseObj.items;
    setArtists(topArtists);
  }

  const artistLimit = 6;
  const artistList = [];

  // const fewerArtists = artists.slice(0,artistLimit);

  // console.log(fewerArtists);
  

  // for (let i = 0; i < artistLimit; i += 1){

  //   const artist = artists[i]
  //   console.log(artist);

  //   // // const artistUrl = artist.external_urls.spotify;
  // // // const imageSrc = artist.images[1].url;
  // // const artistName = artist.name;
  //   artistList.push(
  //     <li>
  //       {/* <ArtistCard 
  //         key={i}
  //         // artistUrl={artist.external_urls.spotify}
  //         // imageSrc={artist.images[1].url}
  //         // artistName={artist.name}
  //       /> */}
  //     </li>)
  // }

  return (
    <div className='top-artists-container'>
      <h3>My Top Artists</h3>
      <ul className="top-artist-list">
        {artists.map(artist => {
          console.log('yo');
          <ArtistCard 
            // artistUrl={artist.external_urls.spotify}
            // imageSrc={artist.images[1].url}
            artistName={artist.name}
          />
        })}
      </ul>
    </div>
  )
};

export default TopArtists;