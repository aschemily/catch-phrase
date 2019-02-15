import React, { Component } from 'react';
import '../Game.css';
import beep from './beep.mp3'
import beep2 from './beep2.mp3'
import final from './final.mp3'
import { Modal, Image, Divider, Grid, Segment} from 'semantic-ui-react'
import Sound from 'react-sound';
import songs from '../data/songs'
import random from '../data/random'


class Game extends Component {

  state = {
    movies: [],
    tvShows: [],
    songs: songs,
    celebrities: [],
    random:random,
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
  //audio.loop = true
  return audio.play()
}

/************** BEEBING **************/

  //STARTS AND GOES ON THE SECOND
  // beebing = ()=>{
  // let interval = setInterval(()=>{
  //     this.playAudio(beep2)
  //   },1000)
  // }

  // speedBeep = ()=>{
  //   setInterval(()=>{
  //
  //   })
  // }


//WORKING BELOW
  // beebing = ()=>{
  //   let timer = 1000;
  //   let timer2 = 0;
  //   setInterval(()=>{
  //     timer2 = timer2 + 0
  //     setInterval(()=>{
  //       this.playAudio(beep2)
  //     }, (timer - timer2))
  //   },10000)
  // }


/************** NEXT BUTTON **************/
  choseRandom = () => {
    const array = this.state[`${this.props.choice}`]
    let nonDisplayed = array.filter(ele=> ele.displayed === false)
    let randomEle = nonDisplayed[Math.floor(Math.random() * (nonDisplayed.length - 1))]

    randomEle.displayed = true;
    const newMovies = array.map(phrase => {
      if (phrase.id === randomEle.id) {
        return {...phrase, displayed: true}
      } else {
        return phrase
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
    let speed = 1000

    let interval = setInterval(()=>{
        this.playAudio(beep2)
      },1000)

    /************** Timer Interval **************/
    this.interval = setInterval(()=>{
      this.setState({ timeNumber: --this.state.timeNumber})
      if(this.state.seconds < 1 && this.state.minutes > 0 ){
          clearInterval(interval)

          var interval2 = setInterval(()=>{
              // speed = speed - 200
              this.playAudio(beep2)
            },500)

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
        var interval3 = setInterval(()=>{
            this.playAudio(final)
            clearInterval(interval3)
          },0)
        clearInterval(this.interval2);
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
      <Grid container stackable columns={4} centered>
        <div className="Game ui grid">
          <Grid.Row className="top" centered columns={'equal'} verticalAlign='top'>

             <Grid.Column id="team">
                <Image onClick={this.team1UpScore} src={require("./iconUpBig.png")} avatar/>
                <span>Team 1 Score: {this.state.scoreT1} </span>
                {this.state.scoreT1 > 0 ? <Image  onClick={this.team1DownScore} src={require("./iconDownBig.png")} avatar/> : null}
            </Grid.Column>

            <Grid.Column id="timer">
              <span>{this.state.minutes}:{this.state.seconds}</span>
            </Grid.Column>


            <Grid.Column id="team">
              <Image onClick={this.team2UpScore} src={require("./iconUpBig.png")} avatar/>
              <span>Team 2 Score: {this.state.scoreT2}</span>
              {this.state.scoreT2 > 0 ?<Image onClick={this.team2DownScore} src={require("./iconDownBig.png")} avatar/> : null}
            </Grid.Column>
         </Grid.Row>


       <Grid.Row>
         <Grid.Column>
            <div id="phrase" >
              {this.state.displaying}
             </div>
           </Grid.Column>
        </Grid.Row>

          <Grid.Row>
            <Grid.Column>
                <div id="popUp" >
                  {this.state.startBtn == true ?
                  <button class="massive ui button green" name="start" onClick={this.startTimer}> Start </button> :
                  <button class="massive ui button orange" name="next" onClick={()=>this.choseRandom()}> Next </button>}
                </div>
            </Grid.Column>
          </Grid.Row>
        </div>

      </Grid>

    );
  }
}

export default Game;
