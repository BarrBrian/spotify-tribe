import React from 'react';

const SettingsPage = props => {

  return (
    <div className="settings-body">
      <h1>Account Preferences</h1>
      <h2>Profile Layout</h2>
      <form method="post">
        <h3>Widget One</h3>
        <input type="radio" id="artists" name="widgetOne" value="TopArtists" />
        <label for="artists">This Years Top Artists</label><br />
        <input type="radio" id="songs" name="widgetOne" value="TopRecentSongs" />
        <label for="songs">Recent Top Tracks</label><br />
        <input type="radio" id="none" name="widgetOne" value="nonde" />
        <label for="other">None</label>
        <h3>Widget Two</h3>
        <input type="radio" id="artists" name="widgetTwo" value="TopArtists" />
        <label for="artists">This Years Top Artists</label><br />
        <input type="radio" id="songs" name="widgetTwo" value="TopRecentSongs" />
        <label for="songs">Recent Top Tracks</label><br />
        <input type="radio" id="none" name="widgetTwo" value="none" />
        <label for="other">None</label>
        <h3>Featured Playlist</h3>
        <label for="featuredPlayerUri">Enter Your Playlist URI:  </label>
        <input type="text" id="featuredPlayerUri" name="featuredPlayerUri" />
        <br />
        <br />
        <button>Update Preferences</button>
      </form>
      <br />
      <br />
      <p style={{fontSize: "12px"}}>Made with Love in "Just Barely Deleware"</p>
      <p style={{fontSize: "12px"}}>Powered by Monster + Diet Mountain Dew</p>
    </div>
  )
};

export default SettingsPage;