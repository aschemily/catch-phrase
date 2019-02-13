import React, { Component } from 'react';
import '../Game.css';
import beep from './beep.mp3'
import { Modal} from 'semantic-ui-react'
import Sound from 'react-sound';
import songs from '../data/songs'


class Game extends Component {

  state = {
    movies: [],
    tvShows: [],
    songs: songs,
    celebrities: [],
    minutes: '02',
    seconds: '00',
    timeNumber: 30,
    isOn: false,
    startBtn: true,
    scoreT1: 0,
    scoreT2: 0,
    displaying: ''
  }

/************** FETCHING MOVIES/SHOWS/celebrities **************/
  componentDidMount(){
    for(let i=1; i <11; i++){
      fetch(`https://api.themoviedb.org/3/discover/movie?api_key=33bbb4eed7c89e4ae3f7aef4072aa7c2&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${i}`)
      .then(r => r.json())
      .then(r =>{
        const movieTitles = r.results.map(movie =>{

          return {id: movie.id, title: movie.title, displayed: false}
        })
        this.setState({movies:[...this.state.movies,...movieTitles]})
      })
    }

    fetch(`http://api.tvmaze.com/shows`)
    .then(r => r.json())
    .then(r =>{
      const tvShowTitles = r.map(tvShow =>{
        return {id: tvShow.id, title: tvShow.name, displayed: false}
      })
      this.setState({tvShows:[...this.state.tvShows,...tvShowTitles]})
    })

    let artists = songs.map(song=>{
      const { id, artist: title, displayed}=song
      return { id, title, displayed }
    })
    this.setState({ celebrities: artists})
  }


/* END FETCHING MOVIES/SHOWS */

/************** BEEBING **************/
playAudio = (arg) =>{
  let audio = new Audio(arg)
  return audio.play()
}

/************** BEEBING **************/
  beebing = ()=>{
    let timer = 3000;
    let timer2 = 0;
    setInterval(()=>{
      timer2 = timer2 + 100
      setInterval(()=>{
        this.playAudio(beep)
      }, (timer - timer2))
    },1000)
  }

/************** NEXT BUTTON **************/
  choseRandom = () => {
    const array = this.state[`${this.props.choice}`]
    let nonDisplayed = array.filter(ele=> ele.displayed === false)
    let randomEle = nonDisplayed[Math.floor(Math.random() * (nonDisplayed.length - 1))]
    randomEle.displayed = true;
    const newMovies = array.map(movie => {
      if (movie.id === randomEle.id) {
        return {...movie, displayed: true}
      } else {
        return movie
      }
    })
    this.setState({
    [`${this.props.choice}`]: newMovies,
      displaying: randomEle.title
    })
  }

/************** START BUTTON **************/
  startTimer = ()=> {
    this.choseRandom()
    this.setState({ startBtn: false})
    this.beebing()
    /************** Timer Interval **************/
    this.interval = setInterval(()=>{
      this.setState({ timeNumber: --this.state.timeNumber})
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


/************** Arrows up and down **************/
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
    return (
      <div className="Game">
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
            {this.state.displaying}
           </div>
          
          <div className="middleRight"> midleRight </div>
        </div>

        <div className="bottom">
          <div className="bottomLeft"> Bottom Left </div>
          <Modal trigger={
          <div id="popUp" className="bottomMiddle">
            {this.state.startBtn == true ?
            <button name="start" onClick={this.startTimer}> Start </button> :
            <button name="next" onClick={()=>this.choseRandom()}> Next </button>}
          </div>} >
        </Modal>     

          <div className="bottomRight"> Bottom Right </div>
        </div>
      </div>
    );
  }
}

export default Game;
