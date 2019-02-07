import React, { Component } from 'react';
import '../Game.css';
class Game extends Component {


  render() {
    //console.log(this.state.movies)
    return (
      <div className="Game">
        <div className="top"> Top
        </div>

        <div className="middle">
          <div className="midleLeft"> midleLeft </div>
          <div className="midleMidle"> {this.props.choice} </div>
          <div className="midleRight"> midleRight </div>
        </div>

        <div className="bottom"> bottom
        <button> Start </button>
        </div>
      </div>
    );
  }
}

export default Game;
