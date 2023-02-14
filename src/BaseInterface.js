// BaseInterface.js

import './App.css'
import DisplayOutAsText from './DisplayOutAsText'
import {useRef, useState} from 'react'

function BaseInterface() {
  const inputRef = useRef(null)
  // Change the following line to the name of your .out
  // file and place your .out file in the src directory.
  // For a more complex file structure, you should make an 
  // input folder and place your .out files there.
  const [arrBuf, setArrBuf] = useState()

  const handleClick = () => {
    // open file input box on click.
    inputRef.current.click()
  }

  const handleFileChange = event => {
    const fileObj = event.target.files && event.target.files[0]

    if (!fileObj) return;

    event.target.value = null
  
    const reader = new FileReader()
    reader.onload = (e) => {
      const arrBuf = e.target.result
      setArrBuf(arrBuf)
    }
    reader.readAsArrayBuffer(fileObj)
  }

  const handleDemoClick = event => {
    async function showFile () {
      // Read the output file
      const response = await fetch('./Example1.out')
      await response.arrayBuffer()
        .then((arrBuf)=>{
          setArrBuf(arrBuf)
      })
    }

    showFile()
  }

  return (
    <div className="App">
      <header className="App-header">
        <input 
          style={{display: 'none'}}
          ref={inputRef}
          type="file"
          onChange={handleFileChange}
        />
        <div className='demoTab'>
          <button className='demoTabLink'style={{width: '50%', border: '3px solid gray'}} onClick={handleClick}>Select .out file</button>
          <button className='demoTabLink'style={{width: '50%', border: '3px solid gray'}} onClick={handleDemoClick}>Use demo Example1.out</button>
        </div>
        <h3>.OUT file in text format:</h3>
          {
            arrBuf &&
            <DisplayOutAsText arrBuf={arrBuf} />
          }
      </header>
    </div>
  );
}

export default BaseInterface;
