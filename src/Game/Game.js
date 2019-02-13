import React, { Component } from 'react';
import '../Game.css';
import beep from './beep.mp3'
import { Modal} from 'semantic-ui-react'

class Game extends Component {

  state = {
    minutes: '00',
    seconds: '30',
    timeNumber: 30,
    isOn: false,
    startBtn: true,
    scoreT1: 0,
    scoreT2: 0
  }

  playAudio = (arg) =>{
    let audio = new Audio(arg)
    return audio.play()
  }

  newTimer = ()=>{
    let timer = 3000;
    let timer2 = 0;
    setInterval(()=>{
      timer2 = timer2 + 100
      setInterval(()=>{
        this.playAudio(beep)
      }, (timer - timer2))
    },1000)
  }

  startTimer = ()=> {
    this.props.choseRandom()
    this.setState({ startBtn: false})
    this.newTimer()
    this.interval = setInterval(()=>{
      this.setState({ timeNumber: --this.state.timeNumber})
    //  console.log(this.state.timeNumber);
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

  team1UpScore = (e) =>{
    this.playAudio(beep)
    this.setState({scoreT1: ++ this.state.scoreT1 })

  }

  team2UpScore = (e) =>{
    this.setState({scoreT2: ++ this.state.scoreT2 })
  }

  team1DownScore = (e) =>{
    this.setState({scoreT1: -- this.state.scoreT1 })
  }

  team2DownScore = (e) =>{

    this.setState({scoreT2: -- this.state.scoreT2 })
  }

  render() {
    //console.log(this.state.movies)
    //console.log('game props',this.props)
    return (
      <div className="Game">
        <h1> COMING FROM GAME </h1>
        <div className="top">
          <div className="topLeft">
            <img onClick={this.team1UpScore} src={require("./iconUp.png")}/>
            Team 1 Score: {this.state.scoreT1}
            {this.state.scoreT1 > 0 ? <img onClick={this.team1DownScore} src={require("./iconDown.png")}/> : null}
          </div>
          <div id="popUp" className="topMiddle">
            <h3 className="timer">{this.state.minutes}:{this.state.seconds}</h3>
          </div>
          <div className="topRight">
          <img onClick={this.team2UpScore} src={require("./iconUp.png")}/>
          Team 2 Score: {this.state.scoreT2}
          {this.state.scoreT2 > 0 ?<img onClick={this.team2DownScore} src={require("./iconDown.png")}/> : null}a
        </div>
        </div>

        <div className="middle">
          <div className="middleLeft"> midleLeft </div>
          <div id="popUp" className="middleMiddle">
            {this.props.choice}
           </div>
          <div className="middleRight"> midleRight </div>
        </div>

        <div className="bottom">
          <div className="bottomLeft"> Bottom Left </div>
          <Modal trigger={
          <div id="popUp" className="bottomMiddle">
            {this.state.startBtn == true ?
            <button onClick={this.startTimer}> Start </button> :
            <button onClick={()=>this.props.choseRandom()}> Next </button>}
          </div>}
          >
        </Modal>
          <div className="bottomRight"> Bottom Right </div>
        </div>
      </div>
    );
  }
}

export default Game;
