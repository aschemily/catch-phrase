import React from 'react'

const Timer =(props)=> {

  console.log('timer props',props)

      return (
       <div>
        <h1 style={{ fontSize: 20}}> TIMER {props.time}</h1>
       </div>
     );
   }


 export default Timer
