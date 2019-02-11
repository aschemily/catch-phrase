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
        <h2>TIMER</h2>
        <h3>{this.state.time}</h3>
        <p>{this.state.minutes}:{this.state.seconds}</p>
        <div className="top"> Top
        </div>

        <div className="middle">
          <div className="middleLeft"> midleLeft </div>
          <div className="middleMiddle">
            {this.props.choice}
           </div>
          <div className="midldeRight"> midleRight </div>
        </div>

        <div className="bottom">
        {this.state.startBtn == true ?
          <button onClick={this.startTimer}> Start </button> :
          <button onClick={()=>this.props.choseRandom()}> Next </button>}
        </div>
      </div>
    );
  }
}

export default Game;
