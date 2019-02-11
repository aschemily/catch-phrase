import React from 'react';
import CategoryCard from './CategoryCard'


const CategoriesContainer = (props) =>{
  const categories = [
    'Movies',
    'Songs',
    'Celebrities'
  ]

  return (
    categories.map((category,i)=>{
      return <CategoryCard catButtonHandler={props.catButtonHandler} key={i} category={category} />
    })
  )
}

export default CategoriesContainer
