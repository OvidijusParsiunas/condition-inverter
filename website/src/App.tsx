import { INITIAL_INPUT_VALUE, INITIAL_RESULT_VALUE } from './shared/consts/initialValues';
import { INITIAL_EDITOR_COLORING_CLASS } from './shared/consts/classNames';
import InvertButton from './components/invertButton/InvertButton';
import Column from './components/columns/wrapper/Column';
import Editor from './components/columns/editor/Editor';
import Header from './components/header/Header';
import AppLoadDelay from './AppLoadDelay';
import React from 'react';

export default function App() {
  const [input, setInput] = React.useState(INITIAL_INPUT_VALUE);
  const [result, setResult] = React.useState(INITIAL_RESULT_VALUE);
  const [inputEditorClass, setInputEditorClass] = React.useState(INITIAL_EDITOR_COLORING_CLASS);
  const [resultEditorClass, setResultEditorClass] = React.useState(INITIAL_EDITOR_COLORING_CLASS);

  const invert = (resultText: string) => {
    setResult(resultText);
    if (inputEditorClass !== '') setInputEditorClass('');
    if (resultEditorClass !== '') setResultEditorClass('');
  };

  return (
    <AppLoadDelay>
      <Header />
      <Column>
        <Editor text={input} className={inputEditorClass} isEditable updateText={setInput} />
      </Column>
      <InvertButton input={input} inversionCallback={invert} />
      <Column>
        <Editor text={result} className={inputEditorClass} isEditable={false} />
      </Column>
    </AppLoadDelay>
  );
}
