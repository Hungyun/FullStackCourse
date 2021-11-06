import React from 'react';
import ReactDOM from 'react-dom';
import Course from './components/Course'

// const Header = ({ header }) => {
//   return (
//     <h2>{header}</h2>
//   )
// }

// const Total = (props) => {
//   const parts = props.parts
//   // let sum = 0
//   // for (var i = 0; i < parts.length; i++){
//   //   sum += parts[i].exercises
//   // }
//   const total = parts.reduce((accumulator, currentElementInArray) =>{
//     return accumulator + currentElementInArray.exercises
//   },0)


//   return(
//     <strong>total of {total} exercises</strong>
//   ) 
// }

// const Part = (props) => {
//   return (
//     <p>
//       {props.part.name} {props.part.exercises}
//     </p>    
//   )
// }

// const Content = (props) => {
//   const parts = props.parts
//   console.log('In Content: parts is: ', parts);
//   return (
//     <div>
//       {parts.map(part =>
//         <Part key={part.id} part={part} />
//       )}
//     </div>
//   )
// }

// const Course = (props) =>{
//   const course = props.course
//   console.log('In Course: course is: ',course);
//   return(
//     <>
//     <Header header={course.name}/>
//     <Content parts={course.parts} />
//     <Total parts={course.parts}/>
//     </>
//   )
// }
const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  console.log('app worked');
  return(
    <div>
      <h1>Web development curriculum</h1>
      <Course course={courses[0]} />
      <Course course={courses[1]} />
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))