import React from 'react';

class LandingPage extends React.Component {

  render() {
    return (
      <div>
        <h1 className="home-header" style={{fontFamily: 'sans-serif'}}>Spotify Tribe</h1>
        <button className="login-button" onClick={() => window.open('http://localhost:3000/login', '_self')}>Login</button>
      </div>
    )
  }
}

export default LandingPage;