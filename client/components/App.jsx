import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import LandingPage from './LandingPage.jsx'
import Profile from './Profile/Profile.jsx'
import Nav from './Nav.jsx'
import SettingsPage from './SettingsPage.jsx'

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
            <Route path="/settings/:username" component={SettingsPage} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;