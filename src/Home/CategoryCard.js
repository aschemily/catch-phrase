import React from 'react';
import { Button } from 'semantic-ui-react'
import { Card, Icon, Image } from 'semantic-ui-react'


const CategoryCard = (props) =>{
  //console.log("coming from CatCard", props.category.img)
  //src={require("./iconUp.png")}
  //<img src={require("props.category.img")}/>
  //  <Button className="ui primary button" onClick={e=>props.catButtonHandler(e)}>{props.category.name}</Button>
//
  return (
    <div id="categoryCard"className="center aligned ui five column grid">
      <div className="column">
    <Card itemsPerRow={10}>
    <Card.Content onClick={e=>props.catButtonHandler(e)} >
      <Card.Header><Image size="mini" src={props.category.img} />{props.category.name.toUpperCase()}</Card.Header>
    </Card.Content>
  </Card>
    </div>
    </div>
)
}

export default CategoryCard
// <Card.Group itemsPerColumn={5}>
//   <Card raised color='red' >
//     <img src={require("./movieIcon.png")}/>
//      {props.category}
//    </Card>
//
//
// </Card.Group>
