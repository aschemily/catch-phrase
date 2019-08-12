import React from 'react';
import { Button } from 'semantic-ui-react'
import { Card, Icon, Image } from 'semantic-ui-react'


const CategoryCard = (props) =>{

  return (
    <div  name={props.category.name}  id="categoryCard"className="center aligned ui five column grid">
      <div name={props.category.name} className="column">
    <Card name={props.category.name} itemsPerRow={10} onClick={e=>props.catButtonHandler(e)}>
    <Card.Content  name={props.category.name} >
      <Card.Header name={props.category.name}>
        <Image name={props.category.name} size="mini" src={props.category.img} />
        <Card.Content>{props.category.name}</Card.Content>
      </Card.Header>
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
