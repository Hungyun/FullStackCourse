import React, { useState } from 'react'

const Button = (props) =>{
  return(
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}



const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)

  const [voteArray, setVote] = useState(Array(anecdotes.length).fill(0))
  const [maxPos, setMaxPos] = useState(0)


  const setRandomSelected = () =>{
    const len = anecdotes.length
    const randNum = Math.floor(Math.random() * len);
    setSelected(randNum)
  }

  const vote = () =>{
    const copy = {...voteArray}
    copy[selected] += 1
    setVote(copy)
    
    let max = 0
    let pos = 0
    for(var i = 0; i < anecdotes.length; i++){
      if(copy[i]>max){
        max = copy[i]
        pos = i
      }
    }
    setMaxPos(pos)
  }
  


  return (
    <>
    <h1>Anecdotes of the day</h1>
    <div>
      {anecdotes[selected]}<br/>
      has {voteArray[selected]} votes<br/>
      <Button onClick={vote} text='vote' />
      <Button onClick={setRandomSelected} text='next anecdote'/>
    </div>
    <h1>Anecdotes with most votes</h1>
    {anecdotes[maxPos]}<br/>
    has {voteArray[maxPos]} votes
    </>
  )
}

export default App