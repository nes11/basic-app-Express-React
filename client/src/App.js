import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HelloWorld from './HelloWorld';
import CatChaseMouse from './RenderProps';
import {ChangingSquare, ChangingText} from './RenderProps2'

function App() {
  return (
    <Router>
      <Route exact path='/'>
        <HelloWorld/>
      </Route>
      <Route exact path='/cat'>
        <CatChaseMouse/>
      </Route>
      <Route exact path='/colour-changer'>
          <ChangingSquare/>
          <ChangingText/>
      </Route>
    </Router>
  );
}

export default App;
