import * as vscode from 'vscode';

export type IOLineTestProps = {
  input: string;
  output: string;
}[];

export interface SelectionPositions {
  start: vscode.Position;
  end: vscode.Position;
}

export interface TestProps {
  lines: IOLineTestProps;
  selection: SelectionPositions;
  // post invertion selection positions
  postSelection?: SelectionPositions;
}

export interface TextEditorObj {
  textEditor: vscode.TextEditor | null;
}
