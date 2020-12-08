import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Draw from './components/Draw';

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Draw />
        </Route>
        <Route exact path="/choice" />
      </Switch>
    </div>
  );
} 

export default App;