import React, { Component } from 'react'
import Nav from './Nav'
import TeamContainer from './TeamContainer'
import CategoriesContainer from './CategoriesContainer'
import Game from '../Game/Game'
import Sound from 'react-sound';
import songs from '../data/songs'

//import { BrowserRouter as Router, Route, Link} from 'react-router-dom'

class Home extends Component {
  state = {
    movies: [],
    tvShows: [],
    songs: songs,
    celebrities: songs,
    choice:'',
    PLAYING: true
  }



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
  }

  catButtonHandler = (e) => {
    this.setState({ choice: e.target.innerText })
  }

  choseRandom = () => {
    let nonDisplayed = this.state.movies.filter(ele=>{ return ele.displayed === false})
    let randomEle = nonDisplayed[Math.floor(Math.random() * (nonDisplayed.length - 1))]
    //console.log(randomEle)
    randomEle.displayed = true;
    // console.log(this.state.movies.indexOf(randomEle));
    const newMovies = this.state.movies.map(movie => {
      if (movie.id === randomEle.id) {
        return {...movie, displayed: true}
      } else {
        return movie
      }
    })
    //console.log(this.state.movies);
    // debugger
    this.setState({
      movies: newMovies,
      choice: randomEle.title
    })
  }



  render() {
  //  console.log('songs',this.state.tvShows)
    return (
      <div className="Home">
        <h1>CATCH PHRASE</h1>
        <TeamContainer/>
        <CategoriesContainer catButtonHandler={this.catButtonHandler} />
        {this.state.choice !== '' ?
          <Game
            choice={this.state.choice}
            startGame={this.startGame}
            movies={this.state.movies}
            choseRandom={this.choseRandom}/> : null}
      </div>
    );
  }
}

export default Home;
