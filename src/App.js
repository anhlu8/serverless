import React, { Component } from 'react';
import Header from "./components/Header";
import Player from "./components/Player";
import Habitat from "./components/Habitat";
import Alliance from "./components/Alliance";
import { Switch, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div>
          <Switch>
            <Route exact path="/" component={Player} />
            <Route exact path="/habitat" component={Habitat} />
            <Route exact path="/alliance" component={Alliance} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App;
