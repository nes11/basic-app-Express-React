import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './NavBar';
import StarWars from './star-wars-api';
import CatChaseMouse from './RenderProps';
import {ChangingSquare, ChangingText} from './RenderProps2'

const App = () => {
  return (
    <Router >
      <Route path='/'>
        <NavBar/>
      </Route>
      <Route exact path='/star-wars'>
        <StarWars/>
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
