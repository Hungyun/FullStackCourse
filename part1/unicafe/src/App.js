import React, { useState } from 'react'


const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  if ((good + neutral + bad) === 0){
    return (
      <>
      <p>No feedback given</p>
      </>)
  }else{
    return(
      <div>
        {/* <StatisticLine text='good' value={good}/>
        <StatisticLine text='neutral' value={neutral}/>
        <StatisticLine text='bad' value={bad}/>
        <StatisticLine text='all' value={good + neutral + bad}/>
        <StatisticLine text='average' value={(good - bad) / (good + neutral + bad)}/>
        <StatisticLine text='positive' value={good / (good + neutral + bad) * 100} percentage='%'/> */}
        <DisplayTable good={good} neutral={neutral} bad={bad}/>
      </div>
    
    )
  }
}

const Button = (props) =>{
  return(
    <button onClick={props.handleOnClick}>
      {props.text}
    </button>
  )
}
const StatisticLine = (props) =>{
  return(
    <>
    {props.text} {props.value} {props.percentage}<br/>
    </>
  )
}
const Header = () => (<h1>give feedback</h1>)

const Display = () => (<h2>statistics</h2>)

const DisplayTable = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  return(
    <table>
      <tr>
        <td>good</td>
        <td>{good}</td>
      </tr>
      <tr>
        <td>neutral</td>
        <td>{neutral}</td>
      </tr>
      <tr>
        <td>bad</td>
        <td>{bad}</td>
      </tr>
      <tr>
        <td>all</td>
        <td>{all}</td>
      </tr>
      <tr>
        <td>average</td>
        <td>{(good - bad) / all}</td>
      </tr>
      <tr>
        <td>positive</td>
        <td>{(good / all) * 100} %</td>
      </tr>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  
  return (
    <div>
      <Header />
      <Button handleOnClick={()=> setGood(good + 1)} text='good'/>
      <Button handleOnClick={()=> setNeutral(neutral + 1)} text='neutral'/>
      <Button handleOnClick={()=> setBad(bad + 1)} text='bad'/>
      <Display />
      <Statistics good={good} neutral = {neutral} bad={bad} />
    </div>
  )
}

export default App