// prettier-ignore
import {
  AnalyzeConditionOutsideStatement
} from 'shared/inverter/src/evaluator/conditionAnalyzers/analyzeConditionOutsideStatement/analyzeConditionOutsideStatement';
// prettier-ignore
import {
  AnalyzeConditionInsideStatement
} from 'shared/inverter/src/evaluator/conditionAnalyzers/analyzeConditionInsideStatement/analyzeConditionInsideStatement';
import { EndPositionDetails, StartPositionDetails } from '../../../../../../../shared/types/inversionRangeDetails';
import { SPACE_JSON, STATEMENT_JSON } from 'shared/inverter/src/shared/consts/statements';
import { ConditionIndicatorValidator } from '../shared/conditionIndicatorValidator';
import { ConditionIndicatorPresence } from '../shared/conditionIndicatorPresence';
import { LineTokenTraversalUtils } from '../shared/lineTokenTraversalUtils';
import { Token, Tokens } from 'shared/inverter/src/shared/types/tokens';
import { Position } from '../../../../../../../shared/types/position';
import { RangeCreator } from '../../../../../../shared/rangeCreator';
import { Range, TextEditor } from 'vscode';

export class ConditionIndicatorAfterEnd {
  private static generateEndOperatorPadding(conditionIndicatorPresent: boolean, conditionIndicatorToken: Token): string {
    if (conditionIndicatorPresent || conditionIndicatorToken === ';') return '';
    // if an indicator is a statement initiator, keep it in original form
    if (STATEMENT_JSON[conditionIndicatorToken as keyof typeof STATEMENT_JSON]) return conditionIndicatorToken as string;
    // need to use ? as it does not cause invertion of expression before a colon: e.g: cat : dog ? cat : dog needs to result in cat : !dog ? cat dog
    return conditionIndicatorToken === '?' ? '?' : '&&';
  }

  private static isConditionIndicator(lineTokens: Tokens, index: number): boolean {
    return (
      AnalyzeConditionInsideStatement.shouldAnalysisStart(lineTokens, index) ||
      AnalyzeConditionOutsideStatement.shouldAnalysisStart(lineTokens, index) ||
      lineTokens[index] === ';'
    );
  }

  // prettier-ignore
  private static searchLineFromIndex(
      conditionIndicatorPresent: boolean, lineTokens: Tokens, line: number, startChar: number, startIndex: number): EndPositionDetails {
    for (let i = startIndex; i < lineTokens.length; i += 1) {
      if (ConditionIndicatorAfterEnd.isConditionIndicator(lineTokens, i)) {
        return {
          position: { line, character: startChar + LineTokenTraversalUtils.getTokenStringIndex(lineTokens, i) },
          endOperatorPadding: ConditionIndicatorAfterEnd.generateEndOperatorPadding(conditionIndicatorPresent, lineTokens[i]),
        };
      }
    }
    return { position: { line, character: startChar + lineTokens.join('').length } };
  }

  // prettier-ignore
  private static searchRightAndDownwards(
      editor: TextEditor, conditionIndicatorPresent: boolean, line: number, startChar?: number): EndPositionDetails | null {
    startChar ??= 0;
    const lineTokens = LineTokenTraversalUtils.getLineTokensAfterCharNumber(editor, line, startChar);
    for (let i = 0; i < lineTokens.length; i += 1) {
      if (!SPACE_JSON[lineTokens[i] as string]) {
        return ConditionIndicatorAfterEnd.searchLineFromIndex(conditionIndicatorPresent, lineTokens, line, startChar, i);
      }
    }
    if (editor.document.lineCount - 1 < line + 1) return null;
    return ConditionIndicatorAfterEnd.searchRightAndDownwards(editor, conditionIndicatorPresent, line + 1);
  }

  private static isConditionIndicatorPresent(editor: TextEditor, highlightEnd: Position, startPositionDetails: StartPositionDetails): boolean {
    if (!startPositionDetails.startOperatorPadding) {
      return ConditionIndicatorPresence.isInRange(editor, RangeCreator.create(startPositionDetails.position, highlightEnd));
    }
    return true;
  }

  private static getNonSpaceCharacterLeftAndUpwards(editor: TextEditor, line: number, endChar?: number): Token | null {
    endChar ??= editor.document.lineAt(line).range.end.character;
    const lineTokens = LineTokenTraversalUtils.getLineTokensBeforeCharNumber(editor, line, endChar);
    for (let i = lineTokens.length - 1; i >= 0; i -= 1) {
      if (!SPACE_JSON[lineTokens[i] as string]) {
        return lineTokens[i];
      }
    }
    if (line - 1 < 0) return null;
    return ConditionIndicatorAfterEnd.getNonSpaceCharacterLeftAndUpwards(editor, line - 1);
  }

  private static isAfterStatementToken(editor: TextEditor, line: number, lineTokens: Tokens): boolean {
    const siblingTokenResult = ConditionIndicatorAfterEnd.getNonSpaceCharacterLeftAndUpwards(editor, line, lineTokens.join('').length);
    // WORK - what about the else word in else if
    return STATEMENT_JSON[siblingTokenResult as keyof typeof STATEMENT_JSON];
  }

  private static isConditionIndicator2(editor: TextEditor, line: number, lineTokens: Tokens): boolean {
    const isAfterStatementToken = ConditionIndicatorAfterEnd.isAfterStatementToken(editor, line, lineTokens);
    if (isAfterStatementToken) return true;
    return ConditionIndicatorValidator.isTokenIndexPartOfConditionIndicator(lineTokens, lineTokens.length - 1, false);
  }

  private static isEndAfterConditionIndicator(editor: TextEditor, line: number, endChar?: number): boolean {
    endChar ??= editor.document.lineAt(line).range.end.character;
    const lineTokens = LineTokenTraversalUtils.getLineTokensBeforeCharNumber(editor, line, endChar);
    for (let i = lineTokens.length - 1; i >= 0; i -= 1) {
      if (!SPACE_JSON[lineTokens[i] as string]) {
        if (lineTokens[i] === '(') {
          // WORK - should not be a problem for statements with no brackets (check)
          // it is ok that this does not work for for loops for (let i = 0;| dog > cat
          return ConditionIndicatorAfterEnd.isConditionIndicator2(editor, line, lineTokens.slice(0, i - 1));
        }
        return ConditionIndicatorValidator.isTokenIndexPartOfConditionIndicator(lineTokens, i, false);
      }
    }
    if (line - 1 < 0) return false;
    return ConditionIndicatorAfterEnd.isEndAfterConditionIndicator(editor, line - 1);
  }

  private static isEndOnOrAfterConditionIndicator(editor: TextEditor, highlightEnd: Position): boolean {
    const charAfterEnd = editor.document.getText(
      RangeCreator.create(highlightEnd, { line: highlightEnd.line, character: highlightEnd.character + 1 }),
    );
    if (Object.keys(SPACE_JSON).indexOf(charAfterEnd) === -1 && charAfterEnd !== '') {
      const lineTokens = LineTokenTraversalUtils.getLineTokensBeforeCharNumber(editor, highlightEnd.line, highlightEnd.character);
      return ConditionIndicatorAfterEnd.isConditionIndicator2(editor, highlightEnd.line, lineTokens);
    }
    return ConditionIndicatorAfterEnd.isEndAfterConditionIndicator(editor, highlightEnd.line, highlightEnd.character);
  }

  public static getEndPositionDetails(editor: TextEditor, fullWordRange: Range, startPositionDetails: StartPositionDetails): EndPositionDetails {
    const highlightEnd = fullWordRange.end;
    if (!ConditionIndicatorAfterEnd.isEndOnOrAfterConditionIndicator(editor, highlightEnd)) {
      const endPositionDetails = ConditionIndicatorAfterEnd.searchRightAndDownwards(
        editor,
        ConditionIndicatorAfterEnd.isConditionIndicatorPresent(editor, highlightEnd, startPositionDetails),
        highlightEnd.line,
        highlightEnd.character,
      );
      if (endPositionDetails) return endPositionDetails;
    }
    return { position: highlightEnd };
  }
}
