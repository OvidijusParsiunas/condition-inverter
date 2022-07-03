// prettier-ignore
import {
  AnalyzeConditionOutsideStatement
} from 'shared/inverter/src/evaluator/conditionAnalyzers/analyzeConditionOutsideStatement/analyzeConditionOutsideStatement';
// prettier-ignore
import {
  AnalyzeConditionInsideStatement
} from 'shared/inverter/src/evaluator/conditionAnalyzers/analyzeConditionInsideStatement/analyzeConditionInsideStatement';
import { EndPositionDetails } from '../../../../../../../shared/types/inversionRangeDetails';
import { SPACE_JSON, STATEMENT_JSON } from 'shared/inverter/src/shared/consts/statements';
import { IsEndOnOrAfterConditionIndicator } from './isEndOnOrAfterConditionIndicator';
import { LineTokenTraversalUtils } from '../shared/lineTokenTraversalUtils';
import { Token, Tokens } from 'shared/inverter/src/shared/types/tokens';
import { Range, TextEditor } from 'vscode';

export class ExpandSelectionEndToIndicator {
  private static generateEndOperatorPadding(conditionIndicatorToken: Token): string {
    // WORK - check what is the use of this
    if (conditionIndicatorToken === ';') return '';
    // if an indicator is a statement initiator, keep it in original form
    if (STATEMENT_JSON[conditionIndicatorToken as keyof typeof STATEMENT_JSON]) return conditionIndicatorToken as string;
    // need to use ? as it does not cause invertion of expression before a colon: e.g: cat : dog ? cat : dog needs to result in cat : !dog ? cat dog
    return conditionIndicatorToken === '?' ? '?' : '&&';
  }

  private static isStopToken(lineTokens: Tokens, index: number): boolean {
    return (
      AnalyzeConditionInsideStatement.shouldAnalysisStart(lineTokens, index) ||
      AnalyzeConditionOutsideStatement.shouldAnalysisStart(lineTokens, index) ||
      lineTokens[index] === ';'
    );
  }

  // REF - 1334
  private static searchLineFromIndex(lineTokens: Tokens, line: number, startChar: number, startIndex: number): EndPositionDetails {
    for (let i = startIndex; i < lineTokens.length; i += 1) {
      if (ExpandSelectionEndToIndicator.isStopToken(lineTokens, i)) {
        return {
          position: { line, character: startChar + LineTokenTraversalUtils.getTokenStringIndex(lineTokens, i) },
          endOperatorPadding: ExpandSelectionEndToIndicator.generateEndOperatorPadding(lineTokens[i]),
        };
      }
    }
    return { position: { line, character: startChar + lineTokens.join('').length } };
  }

  private static searchRightAndDownwards(editor: TextEditor, line: number, startChar?: number): EndPositionDetails | null {
    startChar ??= 0;
    const lineTokens = LineTokenTraversalUtils.getLineTokensAfterCharNumber(editor, line, startChar);
    for (let i = 0; i < lineTokens.length; i += 1) {
      if (!SPACE_JSON[lineTokens[i] as string]) {
        return ExpandSelectionEndToIndicator.searchLineFromIndex(lineTokens, line, startChar, i);
      }
    }
    if (editor.document.lineCount - 1 < line + 1) return null;
    return ExpandSelectionEndToIndicator.searchRightAndDownwards(editor, line + 1);
  }

  public static getNewPositionDetails(editor: TextEditor, fullWordRange: Range): EndPositionDetails {
    const highlightEnd = fullWordRange.end;
    if (!IsEndOnOrAfterConditionIndicator.check(editor, highlightEnd)) {
      const endPositionDetails = ExpandSelectionEndToIndicator.searchRightAndDownwards(editor, highlightEnd.line, highlightEnd.character);
      if (endPositionDetails) return endPositionDetails;
    }
    return { position: highlightEnd };
  }
}
