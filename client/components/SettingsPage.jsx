import React from 'react';

const SettingsPage = props => {

  //personal
    //bio
    //twitter
  //layout
    //selection 1
    //selection 2
  
  //logout
  //delete account 

  return (
    <div className="settings-body">
      <h1>Settings Jank</h1>
      <h2>Profile Layout</h2>
      <form method="post">
        <h3>Widget One</h3>
        <input type="radio" id="artists" name="widgetOne" value="artists" />
        <label for="artists">This Years Top Artists</label><br />
        <input type="radio" id="songs" name="widgetOne" value="songs" />
        <label for="songs">Recent Top Tracks</label><br />
        <input type="radio" id="none" name="widgetOne" value="none" />
        <label for="other">None</label>
        <h3>Widget Two</h3>
        <input type="radio" id="artists" name="widgetTwo" value="artists" />
        <label for="artists">This Years Top Artists</label><br />
        <input type="radio" id="songs" name="widgetTwo" value="songs" />
        <label for="songs">Recent Top Tracks</label><br />
        <input type="radio" id="none" name="widgetTwo" value="none" />
        <label for="other">None</label>
        <h3>Featured Playlist</h3>
        <label for="featuredPlayerUri">Enter Your Playlist URI:  </label>
        <input type="text" id="featuredPlayerUri" name="featuredPlayerUri" />
        <br />
        <button>Save</button>
      </form>
    </div>
  )
};

export default SettingsPage;