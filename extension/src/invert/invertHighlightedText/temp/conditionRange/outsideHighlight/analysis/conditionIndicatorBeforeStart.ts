import { Position } from '../../../../../../shared/types/invertHighlightedText/invertHighlightedText';
import { TraversalUtil } from 'shared/inverter/src/shared/functionality/traversalUtil';
import { STATEMENT_JSON } from 'shared/inverter/src/shared/consts/statements';
import { TokensJSON } from 'shared/inverter/src/shared/types/tokensJSON';
import { RangeCreator } from '../../../../../shared/rangeCreator';
import { Tokens } from 'shared/inverter/src/shared/types/tokens';
import { Tokenizer } from 'shared/tokenizer/tokenizer';
import { TextEditor } from 'vscode';

type Result = { position: Position; statementLength: number } | null;

export class ConditionIndicatorBeforeStart {
  private static readonly spaceTokens = { [' ']: true, ['\n']: true, ['\r']: true };
  // prettier-ignore
  private static readonly conditionStartIndicators = {
    ['&']: true, ['|']: true, ['and']: true, ['or']: true, ['<']: true, ['>']: true, ['=']: true, ...STATEMENT_JSON };

  private static getTokenIndexAsString(tokens: Tokens, index: number): number {
    return tokens.slice(0, index).join('').length;
  }

  private static isConditionStart(index: number, tokens: Tokens): boolean {
    const token = tokens[index] as keyof typeof ConditionIndicatorBeforeStart.conditionStartIndicators;
    switch (token) {
      case '&':
      case '|':
        return tokens[index - 1] === token;
      case '<':
      case '>':
        return tokens[index - 1] !== token && tokens[index + 1] !== token;
      case '=':
        return tokens[index - 1] === '=' || tokens[index - 1] === '<' || tokens[index - 1] === '>' || tokens[index - 1] === '!';
      case 'and':
      case 'or':
      case 'if':
      case 'elif':
      case 'for':
      case 'while':
        return true;
      default:
        return false;
    }
  }

  private static findConditionStartOnLine(line: number, lineTokens: Tokens, tokenIndex: number, allTokens: Tokens): Result {
    const tokens = lineTokens.slice(0, tokenIndex);
    const result = TraversalUtil.findFirstTokenFromSelection(tokens, 0, ConditionIndicatorBeforeStart.conditionStartIndicators as TokensJSON, false);
    if (result) {
      if (ConditionIndicatorBeforeStart.isConditionStart(result.index, allTokens)) {
        return {
          position: { line, character: ConditionIndicatorBeforeStart.getTokenIndexAsString(lineTokens, result.index) },
          statementLength: (result.token as string).length,
        };
      }
      return ConditionIndicatorBeforeStart.findConditionStartOnLine(line, tokens, result.index, allTokens);
    }
    return null;
  }

  private static getLineTokens(editor: TextEditor, line: number, endChar: number): Tokens {
    const stringBeforeSelectionStart = editor.document.getText(RangeCreator.create({ line: line, character: 0 }, { line: line, character: endChar }));
    return Tokenizer.tokenize(stringBeforeSelectionStart);
  }

  private static traverseLeftAndUpwards(editor: TextEditor, line: number, endChar?: number): Result {
    endChar ??= editor.document.lineAt(line).range.end.character;
    const lineTokens = ConditionIndicatorBeforeStart.getLineTokens(editor, line, endChar);
    for (let i = lineTokens.length - 1; i >= 0; i -= 1) {
      const token = lineTokens[i];
      if (!ConditionIndicatorBeforeStart.spaceTokens[token as keyof typeof ConditionIndicatorBeforeStart.spaceTokens]) {
        return ConditionIndicatorBeforeStart.findConditionStartOnLine(line, lineTokens, i + 1, lineTokens);
      }
    }
    return ConditionIndicatorBeforeStart.traverseLeftAndUpwards(editor, line - 1);
  }

  // WORK - test for when searching upwards and nothing found
  // WORK - use AnalyzeConditionOutsideStatement for downwards analysis
  // selectionStartChar can vary depending on selection position on a word as it will be its start if on word
  public static search(editor: TextEditor, selectionStartChar: number): Result {
    return ConditionIndicatorBeforeStart.traverseLeftAndUpwards(editor, editor.selection.start.line, selectionStartChar);
  }
}

// SEARCH STRATEGY:
// Search leftwards and upwards until non space token is identified
// Then proceed to search condition start indicator within the same line starting from the non space token
// This is NAIVE however it is the only current feasable workaround found to not have to traverse the entire
// codebase to search for a start of a statement. It covers most of inversion cases but the expectation is
// that the condition start indicator will have to be on the same line as the highlight start
// ACCEPTED DRAWBACKS:
// If the highlighted text is outside of a condition and there is one to the left of it, the condition
// on the left will be inverted
