import React from 'react';

class LandingPage extends React.Component {

  render() {
    return (
      <div className="landing-page">
        <button className="login-button" onClick={() => window.open('http://localhost:3000/login', '_self')}>Login with Spotify</button>
      </div>
    )
  }
}

export default LandingPage;