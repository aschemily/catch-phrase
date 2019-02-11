import React, { Component } from 'react'
import Nav from './Nav'
import TeamContainer from './TeamContainer'
import CategoriesContainer from './CategoriesContainer'
import Game from '../Game/Game'
//import { BrowserRouter as Router, Route, Link} from 'react-router-dom'

class Home extends Component {
  state = {
    movies: [],
    choice:''
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
  }

  catButtonHandler = (e) => {
    this.setState({ choice: e.target.innerText })
  }

  choseRandom = () => {
    let nonDisplayed = this.state.movies.filter(ele=>{ return ele.displayed === false})
    let randomEle = this.state.movies[Math.floor(Math.random() * this.state.movies.length)]

    this.setState({ choice: randomEle.title})
  }

  startGame = (e) =>{
    console.log('clicking e',e)
  }

  render() {
    return (
      <div className="Home">
        <h1>COMING FROM HOMEPAGE</h1>
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
