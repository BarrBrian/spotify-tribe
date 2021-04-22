import React from 'react';
import SearchBar from './SearchBar.jsx';

const Nav = props => {

  return (
    <nav>
      <p className="home-header" style={{fontFamily: 'Helvetica'}}>Spotify Tribe</p>
      <ul>
        <li><a className="navLink" href='/profile/brian-barr'>Profile</a></li>
        <li><a className="navLink" href='/settings/brian-barr'>Settings</a></li>
        <SearchBar />
      </ul>
    </nav>
  )
};

export default Nav;