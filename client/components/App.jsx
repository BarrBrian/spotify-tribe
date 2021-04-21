import React from 'react';

class App extends React.Component {
  
  spotifyLogin(){
    fetch('http://localhost:3000/login')
      .then(data => {
        return data.json()
      })
      // .then(data => {
      //   window.open(data);
      // })
  }

  render() {
    return (
      <div>
        <h1>Project S</h1>
        <button onClick={this.spotifyLogin} >Login</button>
      </div>
    )
  }
}

export default App;