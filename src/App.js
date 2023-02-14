import './App.css'
import DisplayOutAsText from './DisplayOutAsText'
import {useRef, useState, useEffect} from 'react'

function App() {
  const inputRef = useRef(null)
  // Change the following line to the name of your .out
  // file and place your .out file in the src directory.
  // For a more complex file structure, you should make an 
  // input folder and place your .out files there.
  const [outFile, setOutFile] = useState('./Example1.out')
  const [arrBuf, setArrBuf] = useState()

  // Read in the .out file and process the results.
  /*useEffect(()=>{fetch(outFile)
    .then((r) => r.arrayBuffer())
    .then(ab => { 
      setArrBuf(ab)
    })
  }, [])*/

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
      //console.log(arrBuf)
      setArrBuf(arrBuf)
    }
    reader.readAsArrayBuffer(fileObj)
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
        <button onClick={handleClick}>Select .out file</button>
        {
          arrBuf &&
          <DisplayOutAsText arrBuf={arrBuf} />
        }
      </header>
    </div>
  );
}

export default App;
