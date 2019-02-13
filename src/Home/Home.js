import React, { Component } from 'react'
import Nav from './Nav'
import TeamContainer from './TeamContainer'
import CategoriesContainer from './CategoriesContainer'
import Game from '../Game/Game'

class Home extends Component {
  state = {
    choice:'',
    PLAYING: true
  }

/************** HANDLER CATEGORIES BUTTONS **************/
catButtonHandler = (e) => {
  e.target.name ?
    this.setState({ choice: e.target.name })
    : alert("please click the image")
}

  render() {
    return (
      <div className="Home">
        <h1 id="title">CATCH PHRASE</h1>
        <CategoriesContainer catButtonHandler={this.catButtonHandler} />
        {this.state.choice !== '' ?
          <Game
            choice={this.state.choice}/> : null}
      </div>
    );
  }
}

export default Home;
