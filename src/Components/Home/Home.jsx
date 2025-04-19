import React from 'react'
import { useState, useRef } from 'react'
import "./Home.css"

function Home() {

  const [password,setPassword] = useState("");
  const [numbers,setNumbers] = useState(false);
  const [symbols,setSymbols] = useState(false);
  const [length,setLength] = useState(6);


  const handleNumberChange = (e)=>{
    // console.log(e.target.checked);
    setNumbers(e.target.checked);
  }

  const handleSymbolChange = (e)=>{
    setSymbols(e.target.checked);
  }

  const handleRange = (e)=>{
    console.log(e.target.value);
    setLength(e.target.value);
  }


  const generatePassword = () => {
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if(numbers){
      str+="0123456789";
    }
    if(symbols){
      str+="~!@#$%^&*()";
    }

    let newPassword = "";
    for(let i=0;i<length;i++){
      newPassword += str.charAt(Math.floor(Math.random() * str.length));
    }
    setPassword(newPassword);
  }


  const passwordRef = useRef(null);
  const copyPassword = ()=>{
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,3);
    window.navigator.clipboard.writeText(password);
  }


  return (
    <div className='container h-1/2 w-1/2 rounded-lg bg-white flex flex-col justify-around items-center'>
      <div className="main h-3/5 w-4/5 bg-stone-50 flex flex-col justify-center items-center rounded-lg">
        <div className='h-[30%] w-4/5 mb-5 rounded-md flex flex-row items-center'>
            <input type="text" className='h-full w-3/4 outline-none rounded-l-md pl-3 text-xl' value={password} ref={passwordRef} readOnly/>
            <button className='h-full w-1/4 bg-blue-600 text-white rounded-r-md hover:bg-blue-700' onClick={copyPassword}>Copy</button>
        </div>
        <input type="range" min={6} max={10} onChange={handleRange} value={length}/>
        <div className='h-[15%] w-4/5 flex flex-row justify-between items-center pl-2 pr-2 mt-2'>
            <div className='h-full w-1/4 flex flex-row justify-between items-center'>
                <label htmlFor="number" className='text-md italic  cursor-pointer'>Numbers</label>
                <input type="checkbox" name='number' id='number' className='h-full w-1/4 cursor-pointer' onClick={handleNumberChange}/>
            </div>
            <div className='h-full w-1/4 flex flex-row justify-between items-center pr-2'>
                <label htmlFor="Symbols" className='text-md italic cursor-pointer'>Symbols</label>
                <input type="checkbox" name='Symbols' id='Symbols' className='h-full w-1/4 cursor-pointer' onClick={handleSymbolChange}/>
            </div>
            <div className='h-full w-[28%] flex flex-row justify-between items-center'>
                <label htmlFor="character" className='text-md italic cursor-pointer'>Characters</label>
                <input type="checkbox" name='character' id='character' className='h-full w-1/4 cursor-pointer'/>
            </div>
        </div>
      </div>
      <div className='h-[15%] w-4/5 flex flex-row justify-around items-center'>
        <button className='h-full w-[34%] border-2 bg-blue-600 text-white rounded-md hover:bg-blue-700' onClick={generatePassword}>Generate Password</button>
        <button className='h-full w-[30%] border-2 bg-blue-600 text-white rounded-md hover:bg-blue-700' onClick={()=>{setPassword("")}}>Reset Password</button>
      </div>
    </div>
  )
}

export default Home
