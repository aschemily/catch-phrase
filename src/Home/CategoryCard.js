import React from 'react';

const CategoryCard = (props) =>{
  //console.log("coming from CatCard", props)

  return (
    <button name={props.category} onClick={e=>props.catButtonHandler(e)}>{props.category}</button>

  )
}

export default CategoryCard
