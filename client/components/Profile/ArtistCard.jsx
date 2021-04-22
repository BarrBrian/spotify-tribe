import React from 'react';

const ArtistCard = props => {
  
  return (
    <div className="artist-card">
      <div className="artist-card-img-container">
        <img src={props.imageSrc}/>
      </div>
      <a className="arist-card-name" href={props.artistUrl}>{props.artistName}</a>
    </div>
  )
};

export default ArtistCard;