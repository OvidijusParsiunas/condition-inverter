import { Selection } from 'vscode';

export class IsTextHighlighted {
  public static check(selection: Selection): boolean {
    const { start, end } = selection;
    return start.line !== end.line || start.character !== end.character;
  }
}
