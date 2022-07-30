import { AnalyzeHTMLTag } from 'shared/inverter/src/evaluator/conditionAnalyzers/shared/analyzeTokens/analyzeSyntax/analyzeHTMLTag';
import { GetPositionIfSelectionBeforeTagStart } from './shared/getPositionIfSelectionBeforeTagStart';
import { SelectionPositionForHTMLTagShared } from './shared/selectionPositionForHTMLTagShared';
import { MultiLineSearchResult } from '../../../../../shared/types/multiLineSearchResult';
import { BackboneJSASPNETUtil } from '../specialisedSyntax/backboneJSASPNETUtil';
import { LineTokenTraversalUtil } from '../../../shared/lineTokenTraversalUtil';
import { CharacterAnalysisUtil } from '../../../shared/characterAnalysisUtil';
import { IsTextHighlighted } from '../../../shared/isTextHighlighted';
import { Position } from '../../../../../shared/types/position';
import { TextEditor, Range } from 'vscode';

// REF - 1335
export class SelectionEndPositionForHTMLTag {
  private static isSelectedBeforeNonSpaceToken(fullWordRange: Range, editor: TextEditor): boolean {
    if (!IsTextHighlighted.check(editor.selection)) {
      return CharacterAnalysisUtil.isNextSelectionCharacterAnotherChar(editor, fullWordRange.end);
    }
    return false;
  }

  // move cursor to the end of open tag <%| or <%=|
  private static getNewPositionAfterBackBoneASPNETOpenTag(previousTokenDetails: MultiLineSearchResult, percentageIndex: number): Position {
    const delta = previousTokenDetails.fullLineTokens[previousTokenDetails.tokenIndex + percentageIndex] === '=' ? 2 : 1;
    return SelectionPositionForHTMLTagShared.getNewPosition(previousTokenDetails, previousTokenDetails.tokenIndex + delta + percentageIndex);
  }

  // prettier-ignore
  private static getPositionIfSelectionAfterOpenTag(
    fullWordRange: Range, editor: TextEditor, previousTokenDetails: MultiLineSearchResult | null): Position | null {
    if (!previousTokenDetails) return null;
    if (previousTokenDetails.token === '<' && AnalyzeHTMLTag.isTagStartSymbol(previousTokenDetails.fullLineTokens, previousTokenDetails.tokenIndex)) {
      if (BackboneJSASPNETUtil.isOpenTag(previousTokenDetails.fullLineTokens, previousTokenDetails.tokenIndex + 1)) {
        return SelectionEndPositionForHTMLTag.getNewPositionAfterBackBoneASPNETOpenTag(previousTokenDetails, 1);
      }
      // prettier-ignore
      const tokenBeforeOpenTag = LineTokenTraversalUtil.getPreviousTokenOnSameLineOrAbove(editor, previousTokenDetails.line,
        LineTokenTraversalUtil.getTokenStringIndex(previousTokenDetails.fullLineTokens, previousTokenDetails.tokenIndex),
      );
      // change text <| to text |< in order not to invert html
      if (tokenBeforeOpenTag && SelectionPositionForHTMLTagShared.isTokenAfterSelection(tokenBeforeOpenTag, editor.selection.start)) {
        return SelectionPositionForHTMLTagShared.getNewPosition(previousTokenDetails, previousTokenDetails.tokenIndex);
      }
    } else if (BackboneJSASPNETUtil.isOpenTag(previousTokenDetails.fullLineTokens, previousTokenDetails.tokenIndex)) {
      return SelectionEndPositionForHTMLTag.getNewPositionAfterBackBoneASPNETOpenTag(previousTokenDetails, 0);
    } else if (previousTokenDetails.token === '=' && !SelectionEndPositionForHTMLTag.isSelectedBeforeNonSpaceToken(fullWordRange, editor)) {
      if (BackboneJSASPNETUtil.isOpenTag(previousTokenDetails.fullLineTokens, previousTokenDetails.tokenIndex - 1)) {
        return SelectionEndPositionForHTMLTag.getNewPositionAfterBackBoneASPNETOpenTag(previousTokenDetails, -1);
      }
    }
    return null;
  }

  // prettier-ignore
  private static getPositionIfSelectionAfterCloseTag(
      fullWordRange: Range, nextTokenDetails: MultiLineSearchResult | null, previousTokenDetails: MultiLineSearchResult | null): Position | null {
    if (previousTokenDetails?.token === '>') {
      // change >|< to ><| to prevent inversion
      if (nextTokenDetails?.token === '<') {
        return SelectionPositionForHTMLTagShared.getNewPosition(nextTokenDetails, nextTokenDetails.tokenIndex + 1);
      }
      // keep %>| as %>| to prevent inversion (backboneJS/ASPNET)
      if (previousTokenDetails.fullLineTokens[previousTokenDetails.tokenIndex - 1] === '%') {
        return SelectionPositionForHTMLTagShared.getNewPosition(previousTokenDetails, previousTokenDetails.tokenIndex + 1);
      }
      // if previous token is before start selection, stay on current position
      if (!SelectionPositionForHTMLTagShared.isTokenAfterSelection(previousTokenDetails, fullWordRange.start)) {
        return fullWordRange.end;
      }
      // change div>| to div|> when at end of text editor to prevent inversion
      // change div>|asdas to div|>asdas when on element to prevent inversion
      if (!nextTokenDetails ||
          (nextTokenDetails.token !== '<' && AnalyzeHTMLTag.isTagEndSymbol(previousTokenDetails.fullLineTokens, previousTokenDetails.tokenIndex))){
        return SelectionPositionForHTMLTagShared.getNewPosition(previousTokenDetails, previousTokenDetails.tokenIndex);
      }
    }
    return null;
  }

  public static getNewPositionIfOnTag(fullWordRange: Range, editor: TextEditor): Position | null {
    const selectionEnd = fullWordRange.end;
    const nextTokenDetails = LineTokenTraversalUtil.getNextTokenOnSameLineOrBelow(editor, selectionEnd.line, selectionEnd.character);
    const previousTokenDetails = LineTokenTraversalUtil.getPreviousTokenOnSameLineOrAbove(editor, selectionEnd.line, selectionEnd.character);
    return (
      SelectionEndPositionForHTMLTag.getPositionIfSelectionAfterCloseTag(fullWordRange, nextTokenDetails, previousTokenDetails) ||
      SelectionPositionForHTMLTagShared.getPositionIfSelectionBeforeTagEnd(editor, nextTokenDetails, previousTokenDetails, false) ||
      GetPositionIfSelectionBeforeTagStart.get(editor, false, nextTokenDetails, previousTokenDetails) ||
      SelectionEndPositionForHTMLTag.getPositionIfSelectionAfterOpenTag(fullWordRange, editor, previousTokenDetails)
    );
  }
}
