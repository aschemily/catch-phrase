import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './Home/Nav'
import TeamContainer from './Home/TeamContainer'
import CategoriesContainer from './Home/CategoriesContainer'
import Game from './Game/Game'

class App extends Component {
  state = {
    movies: [],
    choice: ''
  }

  componentDidMount(){
    for(let i=1; i <11; i++){
      fetch(`https://api.themoviedb.org/3/discover/movie?api_key=33bbb4eed7c89e4ae3f7aef4072aa7c2&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${i}`)
      .then(r => r.json())
      .then(r =>{
        const movieTitles = r.results.map(movie =>{

          return {id: movie.id, title: movie.title}
        })
        this.setState({movies:[...this.state.movies,...movieTitles]})
      })
    }
  }

  catButtonHandler = (e) => {
    this.setState({ choice: e.target.innerText })
  }

  render() {
    return (
      <div className="App">

        <Nav/>
        <TeamContainer/>
        <CategoriesContainer catButtonHandler={this.catButtonHandler}/>
        <Game choice={this.state.choice}/>
      </div>
    );
  }
}

export default App;
