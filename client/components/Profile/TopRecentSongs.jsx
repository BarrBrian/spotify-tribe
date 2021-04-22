import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const TopRecentSongs = props => {

  useEffect(() => {
    fetchTopSongs();
  }, [])

  const { username } = useParams();
  const [topSongs, setTopSongs] = useState([])


  const fetchTopSongs = async () => {
    const spotifyQuery = encodeURIComponent('https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=20');
    const data = await fetch(
      `http://localhost:8080/api/spotify/?user=${username}&q=${spotifyQuery}`
    )

    const responseObj = await data.json();
    const topSongs = responseObj.items;
    setTopSongs(topSongs);
  }

  const songList = []

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return (
      seconds == 60 ?
      (minutes+1) + ":00" :
      minutes + ":" + (seconds < 10 ? "0" : "") + seconds
    );
  }

  const generateSongRows = () => {

    const songLimit = Math.min(12,topSongs.length);
    console.log(topSongs.length);

    for (let i = 0; i < songLimit; i += 1){
  
      const song = topSongs[i]

      const songId = song.id;
      const albumArt = song.album.images[2].url;
      const songName = song.name;
      const albumName = song.album.name;
      const duration = millisToMinutesAndSeconds(song.duration_ms);
      const artistName = song.artists[0].name;

      
      songList.push(
          <tr className={`song-table-row ${songId}`}>
            <td className={`song-table-number ${songId}`}>{i + 1}</td>
            <td className={`small-album-art ${songId}`}><img src={albumArt}/></td>
            <td className={`song-table-name ${songId}`}>{songName}</td>
            <td className={`artist-table-name ${songId}`}>{artistName}</td>
            <td className={`album-table-name ${songId}`}>{albumName}</td>
            <td className={`table-duration ${songId}`}>{duration}</td>
          </tr>)
    }
  }

  generateSongRows();

  return (
    <div className='top-recent-songs-container'>
      <h3>On Repeat This Month</h3>
      <table className="top-recent-songs-list scroll-style">
        <tbody>
        <tr className="song-table-header-row">
          <th>#</th>
          <th>Art</th>
          <th>Title</th>
          <th>Artist</th>
          <th>Album</th>
          <th>Duation</th>
        </tr>
        {songList}
        </tbody>
      </table>
    </div>
  )
};

export default TopRecentSongs;