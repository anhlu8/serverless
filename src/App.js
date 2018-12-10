import React, { Component } from 'react';
import Header from './components/Header'
import Players from './components/Players'
import { Switch, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div>
          <Switch>
            <Route exact path="/" component={Players} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App;
