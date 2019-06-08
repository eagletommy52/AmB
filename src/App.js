import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import Main from './Main';
import Matcher from './components/Matcher/Matcher';
import RSVP from './components/RSVP/RSVP';
import Dashboard from './components/Dashboard/Dashboard';
import California from './components/California/California'
class App extends Component {
  render() {
    return (
      <div className='App'>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Main} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/california' component={California} />
            <Route path='/rsvp' component={RSVP} />
            <Route path='/' component={Matcher} />
            <Route path='/whoops'
              render={() => {
                return (
                  <>
                    <h2 className='FourOhFour'>Sorry that path was not found</h2>
                    <p className='FourOhFour'>
                      Please check the address (or your invite!) and try again.
                    </p>
                  </>
                );
              }}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
