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
  //  <img src={require("./splash.png")}/>
  render() {
    return (
      <div className="Home">
        <div class="header">

        <h1 id="title">CATCH PHRASE</h1>
        <h3>How To Play:</h3>
        <h6>
          One team starts by pressing the start button where a phrase will pop up. Get your teammate to guess the phrase as quickly as possible. Then hand the buzzer to the person on your right.
          You can make any gesture or say anything except the words displayed.
          If you hold the buzzer when the buzzer goess off your team loses that round.
        </h6>
    
        </div>
        <CategoriesContainer catButtonHandler={this.catButtonHandler} />
        {this.state.choice !== '' ?
          <Game
            choice={this.state.choice}/> : null}
      </div>
    );
  }
}

export default Home;
