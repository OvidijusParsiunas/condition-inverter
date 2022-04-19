import InvertButton from './components/invertButton/InvertButton';
import Editor from './components/editor/Editor';
import React from 'react';
import './App.css';

export default function App() {
  const initialClassName = 'code-mirror';
  const [input, setInput] = React.useState('if (dog - !cat && dog - !cat) {\n  console.log(2)\n}');
  const [result, setResult] = React.useState('if (!(dog - !cat) || !(dog - !cat)) {\n  console.log(2)\n}');
  const [inputEditorClass, setInputEditorClass] = React.useState(initialClassName);
  const [resultEditorClass, setResultEditorClass] = React.useState(initialClassName);

  const invert = (result: string) => {
    setResult(result);
    if (inputEditorClass !== '') setInputEditorClass('');
    if (resultEditorClass !== '') setResultEditorClass('');
  };

  return (
    <div className="App">
      <div className="column">
        <Editor text={input} className={inputEditorClass} isEditable={true} updateText={setInput}></Editor>
      </div>
      <InvertButton input={input} inversionCallback={invert}></InvertButton>
      <div className="column">
        <Editor text={result} className={inputEditorClass} isEditable={false}></Editor>
      </div>
    </div>
  );
}
