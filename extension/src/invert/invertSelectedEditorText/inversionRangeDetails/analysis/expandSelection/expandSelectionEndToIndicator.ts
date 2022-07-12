// prettier-ignore
import {
  AnalyzeConditionOutsideStatement
} from 'shared/inverter/src/evaluator/conditionAnalyzers/analyzeConditionOutsideStatement/analyzeConditionOutsideStatement';
// prettier-ignore
import {
  AnalyzeConditionInsideStatement
} from 'shared/inverter/src/evaluator/conditionAnalyzers/analyzeConditionInsideStatement/analyzeConditionInsideStatement';
import { TraversalUtil } from 'shared/inverter/src/shared/functionality/traversalUtil';
import { EndPositionDetails } from '../../../shared/types/inversionRangeDetails';
import { STATEMENT_JSON } from 'shared/inverter/src/shared/consts/statements';
import { LineTokenTraversalUtil } from '../shared/lineTokenTraversalUtil';
import { CurlyBracketSyntaxUtil } from '../shared/curlyBracketSyntaxUtil';
import { Token, Tokens } from 'shared/inverter/src/shared/types/tokens';
import { IsEndAfterStopToken } from './isStartAfterStopToken';
import { Range, TextEditor } from 'vscode';

export class ExpandSelectionEndToIndicator {
  private static generateEndOperatorPadding(conditionIndicatorToken: Token): string {
    // if an indicator is a statement initiator, keep it in original form
    if (STATEMENT_JSON[conditionIndicatorToken as keyof typeof STATEMENT_JSON]) return conditionIndicatorToken as string;
    // need to use ? as it does not cause invertion of expression before a colon: e.g: cat : dog ? cat : dog needs to result in cat : !dog ? cat dog
    return conditionIndicatorToken === '?' ? '?' : '&&';
  }

  private static isStopToken(lineTokens: Tokens, index: number): boolean {
    return (
      AnalyzeConditionInsideStatement.shouldAnalysisStart(lineTokens, index) ||
      AnalyzeConditionOutsideStatement.shouldAnalysisStart(lineTokens, index)
    );
  }

  private static getPositionIfLineContainsStopTokenAfterIndex(fullLineTokens: Tokens, line: number, startIndex: number): EndPositionDetails | null {
    for (let i = startIndex; i < fullLineTokens.length; i += 1) {
      if (ExpandSelectionEndToIndicator.isStopToken(fullLineTokens, i)) {
        return {
          position: { line, character: LineTokenTraversalUtil.getTokenStringIndex(fullLineTokens, i) },
          endOperatorPadding: ExpandSelectionEndToIndicator.generateEndOperatorPadding(fullLineTokens[i]),
        };
      }
      // stop traversal when encountered ; or { (not a string template) token
      if (fullLineTokens[i] === ';' || CurlyBracketSyntaxUtil.isScopeOpenToken(fullLineTokens, i)) {
        return { position: { line, character: LineTokenTraversalUtil.getTokenStringIndex(fullLineTokens, i) } };
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
    if (!IsEndAfterStopToken.check(editor, highlightEnd)) {
      const endPositionDetails = ExpandSelectionEndToIndicator.searchRightAndDownwards(editor, highlightEnd.line, highlightEnd.character);
      if (endPositionDetails) return endPositionDetails;
    }
    return { position: highlightEnd };
  }
}
