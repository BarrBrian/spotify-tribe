import React from 'react';

const ArtistCard = props => {

  // const artist = props.artistObj;
  console.log('hello');
  console.log(props.artistName);

  // // const artistUrl = artist.external_urls.spotify;
  // // const imageSrc = artist.images[1].url;
  // const artistName = artist.name;


  return (
    <div className="artist-card">
      <div className="artist-card-img-container">
        <img src="https://i.scdn.co/image/4dc7080ef509c36203a131a0eab8dd5e4800d7c2"/>
      </div>
      <div className="arist-card-name">Above &amp; Beyond</div>
    </div>
  )
};

export default ArtistCard;