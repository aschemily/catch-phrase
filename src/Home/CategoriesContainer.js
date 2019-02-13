import React from 'react';
import CategoryCard from './CategoryCard'
import movieIcon from './movieIcon.png'
import songIcon from './songIcon.png'
import starIcon from './starIcon.png'
import randomIcon from './randomIcon.png'
import tvshowIcon from './tvshowIcon.png'


const CategoriesContainer = (props) =>{
  const categories = [
    {name: 'movies', img: movieIcon},
    {name: 'songs', img: songIcon},
    {name: 'celebrities', img: starIcon},
    {name:'random', img: randomIcon},
    {name:'tvShows', img: tvshowIcon}
  ]

  return (
    categories.map((category,i)=>{
      return <CategoryCard
        catButtonHandler={props.catButtonHandler}
        key={i}
        category={category}
        />
    })
  )
}

export default CategoriesContainer
