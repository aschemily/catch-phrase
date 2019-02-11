import React, { Component } from 'react';
import '../Game.css';

class Game extends Component {

  state = {
    minutes: '02',
    seconds: '00',
    isOn: false,
    startBtn: true,
  }

  startTimer = ()=> {
    this.props.choseRandom()
    this.setState({ startBtn: false})
    this.interval = setInterval(()=>{
      if(this.state.seconds < 1 && this.state.minutes > 0 ){
        this.setState({
          minutes: parseInt(this.state.minutes) - 1,
          seconds: 59,
        })
      }else if(this.state.seconds > 0 && this.state.minutes >= 0 ){
        this.setState({
          seconds: parseInt(this.state.seconds) - 1
        })
      }else if(this.state.seconds === 0 && this.state.minutes === 0 ){
        this.setState({
          isOn: false,
        })
        clearInterval(this.interval);
      }
    },1000)
  }


  render() {
    //console.log(this.state.movies)
    //console.log('game props',this.props)
    return (
      <div className="Game">
        <h1> COMING FROM GAME </h1>
        <div className="top">
          <div className="topLeft"> topLeft </div>
          <div className="topMiddle">
            <h3 className="timer">{this.state.minutes}:{this.state.seconds}</h3>
          </div>
          <div className="topRight"> topRight </div>
        </div>

        <div className="middle">
          <div className="middleLeft"> midleLeft </div>
          <div className="middleMiddle">
            {this.props.choice}
           </div>
          <div className="middleRight"> midleRight </div>
        </div>

        <div className="bottom">
          <div className="bottomLeft"> Bottom Left </div>
          <div className="bottomMiddle">
            {this.state.startBtn == true ?
            <button onClick={this.startTimer}> Start </button> :
            <button onClick={()=>this.props.choseRandom()}> Next </button>}
          </div>
          <div className="bottomRight"> Bottom Right </div>
        </div>
      </div>
    );
  }
}

export default Game;
