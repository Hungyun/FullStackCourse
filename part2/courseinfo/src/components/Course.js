import React from 'react'

const Header = ({ header }) => {
    return (
      <h2>{header}</h2>
    )
}

const Content = (props) => {
    const parts = props.parts
    console.log('In Content: parts is: ', parts);
    return (
      <div>
        {parts.map(part =>
          <Part key={part.id} part={part} />
        )}
      </div>
    )
}

const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }

const Total = (props) => {
    const parts = props.parts
    // let sum = 0
    // for (var i = 0; i < parts.length; i++){
    //   sum += parts[i].exercises
    // }
    const total = parts.reduce((accumulator, currentElementInArray) =>{
      return accumulator + currentElementInArray.exercises
    },0)
  
  
    return(
      <strong>total of {total} exercises</strong>
    ) 
  }

const Course = (props) =>{
    const course = props.course
    console.log('In Course: course is: ',course);
    return(
      <>
      <Header header={course.name}/>
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
      </>
    )
}
  
export default Course