import { InvertConditions } from 'inverter/invert';
import React from 'react';
import './App.css';

function App() {
  const [code, setCode] = React.useState('if (dog -   !cat && dog -  !  cat  ) { console.log(2) }');
  const [result, setResult] = React.useState('');

  const handleInputChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const inputText = event.currentTarget.value;
    setCode(inputText);
  };

  const invert = () => {
    const result = InvertConditions.runInvert(code);
    setResult(result);
  };

  return (
    <div className="App">
      <div style={{ backgroundColor: 'red', height: '100vh', width: '50%', float: 'left' }}>
        <textarea value={code} onChange={(e) => handleInputChange(e)} style={{ marginTop: '10vh', height: '80vh', width: '30vw' }}></textarea>
      </div>
      <div style={{ position: 'absolute', display: 'flex', justifyContent: 'center', top: '50%', left: '48%' }}>
        <button onClick={invert}>INVERT</button>
      </div>
      <div style={{ backgroundColor: 'green', height: '100vh', width: '50%', float: 'left' }}>
        <textarea value={result} onChange={() => {}} style={{ marginTop: '10vh', height: '80vh', width: '30vw' }}></textarea>
      </div>
    </div>
  );
}

export default App;
