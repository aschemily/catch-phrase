import React from 'react';
import CategoryCard from './CategoryCard'


const CategoriesContainer = (props) =>{
  const categories = [
    'movies',
    'tvShows',
    'songs',
    'celebrities',
    'random'

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
