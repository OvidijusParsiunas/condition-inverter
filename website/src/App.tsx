import { INITIAL_INPUT_VALUE, INITIAL_RESULT_VALUE } from './shared/consts/initialValues';
import { INITIAL_EDITOR_COLORING_CLASS } from './shared/consts/classNames';
import InvertButton from './components/invertButton/InvertButton';
import Column from './components/columns/wrapper/Column';
import HeaderLogos from './components/links/HeaderLogos';
import Editor from './components/columns/editor/Editor';
import React from 'react';
import './App.css';

export default function App() {
  const [input, setInput] = React.useState(INITIAL_INPUT_VALUE);
  const [result, setResult] = React.useState(INITIAL_RESULT_VALUE);
  const [inputEditorClass, setInputEditorClass] = React.useState(INITIAL_EDITOR_COLORING_CLASS);
  const [resultEditorClass, setResultEditorClass] = React.useState(INITIAL_EDITOR_COLORING_CLASS);

  const invert = (result: string) => {
    setResult(result);
    if (inputEditorClass !== '') setInputEditorClass('');
    if (resultEditorClass !== '') setResultEditorClass('');
  };

  return (
    <div>
      <HeaderLogos></HeaderLogos>
      <div id="title">If Inverter</div>
      <Column>
        <Editor text={input} className={inputEditorClass} isEditable={true} updateText={setInput}></Editor>
      </Column>
      <InvertButton input={input} inversionCallback={invert}></InvertButton>
      <Column>
        <Editor text={result} className={inputEditorClass} isEditable={false}></Editor>
      </Column>
    </div>
  );
}
