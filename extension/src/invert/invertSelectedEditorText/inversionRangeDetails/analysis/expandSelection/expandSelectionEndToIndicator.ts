// prettier-ignore
import {
  AnalyzeConditionOutsideStatement
} from 'shared/inverter/src/evaluator/conditionAnalyzers/analyzeConditionOutsideStatement/analyzeConditionOutsideStatement';
import { SelectionPositionForHTMLTagShared } from './htmlTagUtils/newPositionForImmediateTokens/shared/selectionPositionForHTMLTagShared';
import { AnalyzeHTMLTag } from 'shared/inverter/src/evaluator/conditionAnalyzers/shared/analyzeTokens/analyzeSyntax/analyzeHTMLTag';
import { SelectionEndPositionForHTMLTag } from './htmlTagUtils/newPositionForImmediateTokens/selectionEndPositionForHTMLTag';
import { BackboneJSASPNETUtil } from './htmlTagUtils/specialisedSyntax/backboneJSASPNETUtil';
import { TraversalUtil } from 'shared/inverter/src/shared/functionality/traversalUtil';
import { EndPositionDetails } from '../../../shared/types/inversionRangeDetails';
import { STATEMENT_JSON } from 'shared/inverter/src/shared/consts/specialTokens';
import { LineTokenTraversalUtil } from '../shared/lineTokenTraversalUtil';
import { CurlyBracketSyntaxUtil } from '../shared/curlyBracketSyntaxUtil';
import { Token, Tokens } from 'shared/inverter/src/shared/types/tokens';
import { IsEndAfterStopToken } from './isEndAfterStopToken';
import { Range, TextEditor } from 'vscode';

export class ExpandSelectionEndToIndicator {
  private static isStopTokenTagEndSymbol(fullLineTokens: Tokens, index: number): boolean {
    return (
      AnalyzeHTMLTag.isTagEndSymbol(fullLineTokens, index) ||
      TraversalUtil.getSiblingNonSpaceTokenIndex(fullLineTokens, index + 1) === fullLineTokens.length
    );
  }

  private static isNoConditionIndicatorStopToken(fullLineTokens: Tokens, index: number): boolean {
    return (
      fullLineTokens[index] === ';' ||
      BackboneJSASPNETUtil.isCloseTag(fullLineTokens, index) ||
      // if end cursor before string template token sequence
      (fullLineTokens[index] === '$' && fullLineTokens[index + 1] === '{') ||
      CurlyBracketSyntaxUtil.isScopeOpenToken(fullLineTokens, index) ||
      // if end cursor before tag start symbol, do not proceed
      (fullLineTokens[index] === '<' && AnalyzeHTMLTag.isTagStartSymbol(fullLineTokens, index)) ||
      // if greater than at the end of a line, consider it as tag end symbol that should not be expanded
      (fullLineTokens[index] === '>' && ExpandSelectionEndToIndicator.isStopTokenTagEndSymbol(fullLineTokens, index)) ||
      // if end cursor before html attribute equals, do not proceed
      (fullLineTokens[index] === '=' && SelectionPositionForHTMLTagShared.isEqualsForHTMLAttribute(fullLineTokens, index))
    );
  }

  private static generateEndOperatorPadding(conditionIndicatorToken: Token): string {
    // if an indicator is a statement initiator, keep it in original form
    if (STATEMENT_JSON[conditionIndicatorToken as keyof typeof STATEMENT_JSON]) return conditionIndicatorToken as string;
    // need to use ? as it does not cause invertion of expression before a colon: e.g: cat : dog ? cat : dog needs to result in cat : !dog ? cat dog
    return conditionIndicatorToken === '?' ? '?' : '&&';
  }

  private static isStopToken(lineTokens: Tokens, index: number): boolean {
    return (
      STATEMENT_JSON[lineTokens[index] as keyof typeof STATEMENT_JSON] || AnalyzeConditionOutsideStatement.shouldAnalysisStart(lineTokens, index)
    );
  }

  private static getPositionIfLineContainsStopTokenAfterIndex(fullLineTokens: Tokens, line: number, startIndex: number): EndPositionDetails | null {
    for (let i = startIndex; i < fullLineTokens.length; i += 1) {
      if (ExpandSelectionEndToIndicator.isNoConditionIndicatorStopToken(fullLineTokens, i)) {
        return { position: { line, character: LineTokenTraversalUtil.getTokenStringIndex(fullLineTokens, i) } };
        // if end cursor before colon, do not proceed - dog|: cat && dog  -  dog:| cat && dog
        // + 1 is used to included the : or the equals symbol in the text as otherwise python for loops will be inverted
      } else if (fullLineTokens[i] === ':' && fullLineTokens[i + 1] !== '=') {
        return { position: { line, character: LineTokenTraversalUtil.getTokenStringIndex(fullLineTokens, i) + 1 } };
      } else if (ExpandSelectionEndToIndicator.isStopToken(fullLineTokens, i)) {
        return {
          position: { line, character: LineTokenTraversalUtil.getTokenStringIndex(fullLineTokens, i) },
          endOperatorPadding: ExpandSelectionEndToIndicator.generateEndOperatorPadding(fullLineTokens[i]),
        };
      }
    }
    return null;
  }

  // REF - 1334
  private static searchLineAfterIndex(fullLineTokens: Tokens, line: number, startIndex: number): EndPositionDetails {
    if (fullLineTokens[startIndex] === '(') {
      // when end selector before open bracket at the start of line - do not invert
      const nonSpaceIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(fullLineTokens, startIndex - 1, false);
      if (nonSpaceIndex === -1) return { position: { line, character: LineTokenTraversalUtil.getTokenStringIndex(fullLineTokens, startIndex) } };
    }
    const endPositionDetails = ExpandSelectionEndToIndicator.getPositionIfLineContainsStopTokenAfterIndex(fullLineTokens, line, startIndex);
    return endPositionDetails || { position: { line, character: fullLineTokens.join('').length } };
  }

  private static searchRightAndDownwards(editor: TextEditor, line: number, startChar?: number): EndPositionDetails | null {
    startChar ??= 0;
    const lineTokens = LineTokenTraversalUtil.getLineTokensAfterCharNumber(editor, line, startChar);
    const nonSpaceIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(lineTokens, 0);
    if (nonSpaceIndex > -1 && nonSpaceIndex < lineTokens.length) {
      const fullLineTokens = LineTokenTraversalUtil.getFullLineTokens(editor, line);
      const numberOfTokensBeforeStartChar = LineTokenTraversalUtil.getLineTokensBeforeCharNumber(editor, line, startChar).length;
      return ExpandSelectionEndToIndicator.searchLineAfterIndex(fullLineTokens, line, numberOfTokensBeforeStartChar + nonSpaceIndex);
    }
    if (editor.document.lineCount - 1 < line + 1) return null;
    return ExpandSelectionEndToIndicator.searchRightAndDownwards(editor, line + 1);
  }

  public static getNewPositionDetails(editor: TextEditor, fullWordRange: Range): EndPositionDetails {
    const highlightEnd = fullWordRange.end;
    const position = SelectionEndPositionForHTMLTag.getNewPositionIfOnTag(fullWordRange, editor);
    if (position) return { position };
    if (!IsEndAfterStopToken.check(editor, highlightEnd)) {
      const endPositionDetails = ExpandSelectionEndToIndicator.searchRightAndDownwards(editor, highlightEnd.line, highlightEnd.character);
      if (endPositionDetails) return endPositionDetails;
    }
    return { position: highlightEnd };
  }
}
