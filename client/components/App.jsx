import React from 'react';

class App extends React.Component {

  render() {
    return (
      <div>
        <h1>Project S</h1>
        <button onClick={() => window.open('http://localhost:3000/login', '_self')}>Login</button>
      </div>
    )
  }
}

export default App;