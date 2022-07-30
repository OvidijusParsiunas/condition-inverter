import { SPACE_JSON } from 'shared/inverter/src/shared/consts/specialTokens';
import { RangeCreator } from '../../../shared/functionality/rangeCreator';
import { TextEditor, Position } from 'vscode';

export class CharacterAnalysisUtil {
  public static isNextSelectionCharacterAnotherChar(editor: TextEditor, selection: Position): boolean {
    const nextChar = editor.document.getText(RangeCreator.create(selection, { line: selection.line, character: selection.character + 1 }));
    return Object.keys(SPACE_JSON).indexOf(nextChar) === -1 && nextChar !== '';
  }
}
