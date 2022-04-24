import { INITIAL_INPUT_VALUE, INITIAL_RESULT_VALUE } from './shared/consts/initialValues';
import { INITIAL_EDITOR_COLORING_CLASS } from './shared/consts/classNames';
import InvertButton from './components/invertButton/InvertButton';
import { ErrorHandler } from './components/error/ErrorHandler';
import ErrorBoundary from './components/error/ErrorBoundary';
import ErrorSnackbar from './components/error/ErrorSnackbar';
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
  const [isErrorSnackbarDisplayed, setIsErrorSnackbarDisplayed] = React.useState(false);

  const invert = (resultText: string) => {
    setResult(resultText);
    if (inputEditorClass !== '') setInputEditorClass('');
    if (resultEditorClass !== '') setResultEditorClass('');
  };

  const errorHandlerCallback = (message: string) => {
    ErrorHandler.displayMessageOnConsole(message);
    setIsErrorSnackbarDisplayed(true);
  };

  return (
    <ErrorBoundary>
      <ErrorSnackbar display={isErrorSnackbarDisplayed} closeCallback={() => setIsErrorSnackbarDisplayed(false)} />
      <AppLoadDelay errorHandlerCallback={errorHandlerCallback}>
        <Header />
        <Column>
          <Editor text={input} className={inputEditorClass} isEditable updateText={setInput} />
        </Column>
        <InvertButton input={input} inversionCallback={invert} errorHandlerCallback={errorHandlerCallback} />
        <Column>
          <Editor text={result} className={inputEditorClass} isEditable={false} />
        </Column>
      </AppLoadDelay>
    </ErrorBoundary>
  );
}
