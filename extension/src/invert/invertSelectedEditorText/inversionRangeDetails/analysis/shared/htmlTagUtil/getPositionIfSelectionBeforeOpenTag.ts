import { AnalyzeHTMLTag } from 'shared/inverter/src/evaluator/conditionAnalyzers/shared/analyzeTokens/analyzeSyntax/analyzeHTMLTag';
import { MultiLineSearchResult } from '../../../../shared/types/multilineSearchResult';
import { LineTokenTraversalUtil } from '../lineTokenTraversalUtil';
import { Position } from '../../../../shared/types/position';
import { TextEditor } from 'vscode';

export class GetPositionIfSelectionBeforeOpenTag {
  private static getNewPositionCharacter(startSelection: Position, nextTokenDetails: MultiLineSearchResult): number {
    return startSelection.line === nextTokenDetails.line
      ? LineTokenTraversalUtil.getTokenStringIndex(nextTokenDetails.fullLineTokens, nextTokenDetails.tokenIndex)
      : startSelection.character;
  }

  private static getNewPosition(startSelection: Position, nextTokenDetails: MultiLineSearchResult, delta: number): Position {
    return {
      line: startSelection.line,
      character: Math.max(GetPositionIfSelectionBeforeOpenTag.getNewPositionCharacter(startSelection, nextTokenDetails) + delta),
    };
  }

  private static getNewPositionIfStartBeforeOpenTagStartSymbol(editor: TextEditor, nextTokenDetails: MultiLineSearchResult): Position | null {
    const startSelection = editor.selection.start;
    // prettier-ignore
    const previousTokenDetails = LineTokenTraversalUtil.getPreviousTokenOnSameLineOrAbove(
      editor, nextTokenDetails.line, LineTokenTraversalUtil.getTokenStringIndex(nextTokenDetails.fullLineTokens, nextTokenDetails.tokenIndex));
    // do not include < if selection start is not after open tag symbol as < will less than greater than symbol to be inverted
    // may as well include > if selection start is before open tag symbol as >< will not cause less than/greater than symbols to be inverted
    const delta = previousTokenDetails?.fullLineTokens[previousTokenDetails.tokenIndex] === '>' ? -1 : 1;
    return GetPositionIfSelectionBeforeOpenTag.getNewPosition(startSelection, nextTokenDetails, delta);
  }

  private static isOpenTagStartSymbol({ token, fullLineTokens, tokenIndex }: MultiLineSearchResult): boolean {
    return token === '<' && fullLineTokens[tokenIndex + 1] !== '/' && AnalyzeHTMLTag.isTagStartSymbol(fullLineTokens, tokenIndex);
  }

  public static get(editor: TextEditor, selection: Position, isStart: boolean): Position | null {
    const nextTokenDetails = LineTokenTraversalUtil.getNextTokenOnSameLineOrBelow(editor, selection.line, selection.character);
    if (!nextTokenDetails) return null;
    if (GetPositionIfSelectionBeforeOpenTag.isOpenTagStartSymbol(nextTokenDetails)) {
      if (isStart) {
        return GetPositionIfSelectionBeforeOpenTag.getNewPositionIfStartBeforeOpenTagStartSymbol(editor, nextTokenDetails);
      }
      // do not include < for end selection
      return GetPositionIfSelectionBeforeOpenTag.getNewPosition(selection, nextTokenDetails, 0);
    }
    return null;
  }
}
