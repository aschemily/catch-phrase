import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './Home/Nav'
import Home from './Home/Home'
// import TeamContainer from './Home/TeamContainer'
// import CategoriesContainer from './Home/CategoriesContainer'
// import Game from './Game/Game'
//import { BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'

class App extends Component {

  render() {
    return (

      <div className="App">
        <Home/>
        <Nav/>
      </div>

    );
  }
}

export default App;
