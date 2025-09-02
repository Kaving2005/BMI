import { useState } from 'react'

import './App.css'

function App() {
  const[height, setHeight]=useState("");
  const[weight, setWeight]=useState("");
  const[bmi, setBmi]=useState(null);
  const[bmistatus, setStatus]=useState("");
  const[errmsg, setErrmsg]=useState("");
  const calculatebmi=()=>{
    const isvalidheight=/^\d+$/.test(height);//regular exprestion
    const isvalidweight=/^\d+$/.test(weight);//regular exprestion
    if(isvalidheight && isvalidweight){
      const heightmeter=height/100;
      const bmivalue=weight/(heightmeter*heightmeter);
      setBmi(bmivalue.toFixed(2));
      if (bmivalue<18.5){
        setStatus("Under Weight");
      }else if(bmivalue>=18.5 && bmivalue<24.9){
        setStatus("Normal Weight");
      }else if(bmivalue>=25 && bmivalue<29.9){
        setStatus("Over Weight");
      }else{
        setStatus("Obese");
      }
      setErrmsg("")
    }else{
      setBmi(null);
      setStatus("");
      setErrmsg("Please enter Valid numeric value for height and weight.")
    }
  }
  const clearall=()=>{
    setHeight("");
    setWeight("");
    setBmi(null);
    setStatus("");
  }
  return (
    <>
     <div className='bmi-calculator'>
      <div className="box"></div>
      <div className="data">
        <h1>BMI Calculator</h1>
        {errmsg && <p className='error'>{errmsg}</p>}
        <div className="input-container">
          <label htmlFor='height'>Height (cm):</label>
          <input type="text" id="height" value={height} onChange={(e)=>setHeight(e.target.value)}/>
        </div>
        <div className="input-container">
          <label htmlFor='weight'>Weight (kg):</label>
          <input type="text" id="weight" value={weight} onChange={(e)=>setWeight(e.target.value)}/>
        </div>
        <button onClick={calculatebmi}>Calculate BMI</button>
        <button onClick={clearall}>Clear</button>
       {bmi!==null && ( <div className="result">
          <p>Your BMI is:{bmi}</p>
          <p>State:{bmistatus}</p>
        </div>)}
      </div>
     </div>
    </>
  )
}

export default App
