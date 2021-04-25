import React, { useEffect, useState } from 'react'

const Button=(props)=>{
  
  return(
    <button onClick={props.handle}>{props.name}</button>
  )
}

const Statistics=(props)=>{


  let avg=(props.good + props.neutral + props.bad)/3;
  let positive= props.good/props.all *100;
  return(
      <div>
        {props.all==0 && <p>No feedback given</p>}
        {props.all!=0 &&
         <table>
          <tr> <td>good</td> <td>{props.good}</td> </tr>
          <tr> <td>neutral</td> <td>{props.neutral}</td> </tr>
          <tr> <td>bad</td> <td>{props.bad}</td> </tr>
          <tr> <td>all</td> <td>{props.all}</td> </tr>
          <tr> <td>avg</td> <td>{avg}</td> </tr>
          <tr> <td>positive</td> <td>{positive? positive+"%":0}</td> </tr>
        </table>
        }
      </div>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll]=useState(0);

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handle={()=>{setGood(good+1); setAll(all+1)}}  name='good' />
      <Button handle={()=>{setNeutral(neutral+1); setAll(all+1)}} name='neutral' />
      <Button handle={()=>{setBad(bad+1); setAll(all+1)}} name='bad' />

      <Statistics good={good} neutral={neutral} bad={bad} all={all} />   
    </div>
  )
}

export default App