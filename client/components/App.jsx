import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import LandingPage from './LandingPage.jsx'
import Profile from './Profile.jsx'
import Nav from './Nav.jsx'

class App extends React.Component {

  render() {
    return (
      <Router>
        <div className="app">
          <Nav />
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/profile/:username" component={Profile} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;