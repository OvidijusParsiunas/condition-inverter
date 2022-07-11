// prettier-ignore
import {
  AnalyzeConditionOutsideStatement
} from 'shared/inverter/src/evaluator/conditionAnalyzers/analyzeConditionOutsideStatement/analyzeConditionOutsideStatement';
// prettier-ignore
import {
  AnalyzeConditionInsideStatement
} from 'shared/inverter/src/evaluator/conditionAnalyzers/analyzeConditionInsideStatement/analyzeConditionInsideStatement';
import { EndPositionDetails } from '../../../shared/types/inversionRangeDetails';
import { TraversalUtil } from 'shared/inverter/src/shared/functionality/traversalUtil';
import { STATEMENT_JSON } from 'shared/inverter/src/shared/consts/statements';
import { LineTokenTraversalUtils } from '../shared/lineTokenTraversalUtils';
import { Token, Tokens } from 'shared/inverter/src/shared/types/tokens';
import { ShouldEndSelectionExpand } from './shouldEndSelectionExpand';
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

  // when end selector before condition group on a line - do not invert
  // prettier-ignore
  private static isStartOfLineOpenBracket(
      editor: TextEditor, lineTokens: Tokens, line: number, startChar: number, startIndex: number): EndPositionDetails | null {
    const openBracketChar = startChar + LineTokenTraversalUtils.getTokenStringIndex(lineTokens, startIndex);
    const tokensBeforeChar = LineTokenTraversalUtils.getLineTokensBeforeCharNumber(editor, line, openBracketChar);
    const nonSpaceIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokensBeforeChar, tokensBeforeChar.length - 1, false);
    if (nonSpaceIndex === -1) return { position: { line, character: openBracketChar } };
    return null;
  }

  // REF - 1334
  // prettier-ignore
  private static searchLineFromIndex(
      editor: TextEditor, lineTokens: Tokens, line: number, startChar: number, startIndex: number): EndPositionDetails {
    if (lineTokens[startIndex] === '(') {
      const startPosition = ExpandSelectionEndToIndicator.isStartOfLineOpenBracket(editor, lineTokens, line, startChar, startIndex);
      if (startPosition) return startPosition;
    }
    for (let i = startIndex; i < lineTokens.length; i += 1) {
      if (ExpandSelectionEndToIndicator.isStopToken(lineTokens, i)) {
        return {
          position: { line, character: startChar + LineTokenTraversalUtils.getTokenStringIndex(lineTokens, i) },
          endOperatorPadding: ExpandSelectionEndToIndicator.generateEndOperatorPadding(lineTokens[i]),
        };
      }
      // stop traversal when encountered ; or { token
      if (lineTokens[i] === ';' || lineTokens[i] === '{') {
        return { position: { line, character: startChar + LineTokenTraversalUtils.getTokenStringIndex(lineTokens, i) } };
      }
    }
    return { position: { line, character: startChar + lineTokens.join('').length } };
  }

  private static searchRightAndDownwards(editor: TextEditor, line: number, startChar?: number): EndPositionDetails | null {
    startChar ??= 0;
    const lineTokens = LineTokenTraversalUtils.getLineTokensAfterCharNumber(editor, line, startChar);
    const nonSpaceIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(lineTokens, 0);
    if (nonSpaceIndex > -1 && nonSpaceIndex < lineTokens.length) {
      return ExpandSelectionEndToIndicator.searchLineFromIndex(editor, lineTokens, line, startChar, nonSpaceIndex);
    }
    if (editor.document.lineCount - 1 < line + 1) return null;
    return ExpandSelectionEndToIndicator.searchRightAndDownwards(editor, line + 1);
  }

  public static getNewPositionDetails(editor: TextEditor, fullWordRange: Range): EndPositionDetails {
    const highlightEnd = fullWordRange.end;
    if (!ShouldEndSelectionExpand.check(editor, highlightEnd)) {
      const endPositionDetails = ExpandSelectionEndToIndicator.searchRightAndDownwards(editor, highlightEnd.line, highlightEnd.character);
      if (endPositionDetails) return endPositionDetails;
    }
    return { position: highlightEnd };
  }
}