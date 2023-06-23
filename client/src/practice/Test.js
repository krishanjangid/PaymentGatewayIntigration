import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function MyButton() {
  return (
    <button
      onClick={() => {
        alert('hello')
      }}
    >
      Click Me
    </button>
  )
}

export default function App() {
  const [count, setCount] = useState(0)
  const [firstName, setFirstName] = useState('')
  const [secondName, setSecondName] = useState('')
  const [file, setFile] = useState(null)
  const [gender, setGender] = useState('Male')
  console.log(file?.name)
  console.log(gender);
  return (
    <>
      <div className="card">
        <p >{count}</p>

        <button onClick={() => { setCount(count => count>0?count=count-1:count=0)}} >-</button>&nbsp;&nbsp;
        <button onClick={() => { setCount(count => count=count+1)}} >+</button>
        <br/>
        <p>{firstName}  {secondName}</p>
        <input type='text' placeholder='First name' onChange={(e) => setFirstName(e.target.value)} /> 
        <br/>
        <input type='text' placeholder='Second name' onChange={(e) => setSecondName(e.target.value)} /> 
        
        <input type='file' onChange={(e) => setFile(e.target.files[0])} />
        <br/>
        <p>{gender}</p>
        <br/>
        <input type='radio' label="Male" checked={gender === 'Male'} value="Male" onClick={() => setGender('Male')}/> Male
        <input type='radio' label="Female" checked={gender === 'Female'} value="Female"  onClick={() => setGender('Female')}/> Female
    
        </div>

        <div className="card" style={{display:'flex', justifyContent:'space-between'}}>
          
          {gender=='Female'? <section style={{height:'50px', width:'50px', backgroundColor:'blue'}}>B</section>:
          <><section style={{height:'50px', width:'50px', backgroundColor:'red'}}>A</section><section style={{height:'50px', width:'50px', backgroundColor:'blue'}}>B</section></>}
          
        </div>
    </>
  )
}


