import { javascript } from '@codemirror/lang-javascript';
import { InvertConditions } from 'inverter/invert';
import CodeMirror from '@uiw/react-codemirror';
import React from 'react';
import './App.css';

function App() {
  const [code, setCode] = React.useState('if (dog - !cat && dog - !cat) {\n  console.log(2)\n}');
  const [result, setResult] = React.useState('if (!(dog - !cat) || !(dog - !cat)) {\n  console.log(2)\n}');
  const [inputEditorClass, setInputEditorClass] = React.useState('code-mirror');
  const [resultEditorClass, setResultEditorClass] = React.useState('code-mirror');

  const handleInputChange = (inputText: string) => {
    if (inputEditorClass !== '') setInputEditorClass('');
    console.log(inputText);
    setCode(inputText);
  };

  const invert = () => {
    const result = InvertConditions.runInvert(code);
    setResult(result);
    if (inputEditorClass !== '') setInputEditorClass('');
    if (resultEditorClass !== '') setResultEditorClass('');
  };

  return (
    <div className="App">
      <div style={{ height: '100vh', width: '50%', float: 'left' }}>
        <div style={{ marginTop: '10vh', marginLeft: '10vw', width: '30vw' }}>
          <CodeMirror
            value={code}
            height="80vh"
            extensions={[javascript({ jsx: true })]}
            onChange={(value) => handleInputChange(value)}
            style={{
              border: '1px solid silver',
            }}
            className={inputEditorClass}
          />
        </div>
      </div>
      <div style={{ position: 'absolute', display: 'flex', justifyContent: 'center', top: '50%', left: '48%' }}>
        <button onClick={invert}>INVERT</button>
      </div>
      <div style={{ height: '100vh', width: '50%', float: 'left' }}>
        <div style={{ marginTop: '10vh', marginLeft: '10vw', width: '30vw' }}>
          <CodeMirror
            value={result}
            height="80vh"
            editable={false}
            extensions={[javascript({ jsx: true })]}
            style={{
              border: '1px solid silver',
            }}
            className={resultEditorClass}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
