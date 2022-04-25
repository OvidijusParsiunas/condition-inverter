import { javascript } from '@codemirror/lang-javascript';
import CodeMirror from '@uiw/react-codemirror';
import React from 'react';
import './editor.css';

interface Props {
  text: string;
  className: string;
  isEditable: boolean;
  updateText?: (text: string) => void;
}

export default function Editor(props: Props) {
  const { text, className, isEditable, updateText } = props;
  const [isDirty, setIsDirty] = React.useState(false);

  const handleInputChange = (inputText: string) => {
    setIsDirty(true);
    updateText?.(inputText);
  };

  const getClassName = () => (isDirty ? '' : className);

  const customCss: React.CSSProperties = {
    border: '1px solid silver',
    borderRadius: '10px',
  };

  return (
    <div className="editor-container">
      <CodeMirror
        value={text}
        extensions={[javascript({ jsx: true })]}
        onChange={(value) => handleInputChange(value)}
        style={customCss}
        className={getClassName()}
        editable={isEditable}
      />
    </div>
  );
}

Editor.defaultProps = {
  updateText: () => {},
};
