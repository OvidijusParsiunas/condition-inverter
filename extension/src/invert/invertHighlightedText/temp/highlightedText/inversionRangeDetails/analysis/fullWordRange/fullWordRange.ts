import { ExpandIfCursorOnPotentialConditionOperator } from './expandIfCursorOnPotentialConditionOperator';
import { Position } from '../../../../../../../shared/types/position';
import { RangeCreator } from '../../../../../../shared/rangeCreator';
import { IsTextHighlighted } from '../shared/isTextHighlighted';
import { Tokenizer } from 'shared/tokenizer/tokenizer';
import { Range, TextEditor } from 'vscode';

interface SubstringAroundPosition {
  substringRange: Range;
  substring: string;
}

export class FullWordRange {
  // this is used as part of an optimisation approach to reduce the amount of tokenization and token traversal to determine if cursor
  // is on a potential condition operator
  private static readonly conditionDelta = 20;

  private static getIndexForSelectionEnd(lineString: string, selectionEndChar: number, isHighlighted: boolean): number {
    const tokens = Tokenizer.tokenize(lineString);
    let currentStringIndex = 0;
    for (let i = 0; i < tokens.length; i += 1) {
      const token = tokens[i] as string;
      currentStringIndex += token.length;
      if (currentStringIndex > selectionEndChar) {
        const expansion = ExpandIfCursorOnPotentialConditionOperator.getExpansionIfAfterEnd(tokens, i, isHighlighted);
        const totalExpansion = currentStringIndex + expansion;
        return currentStringIndex - token.length < selectionEndChar ? totalExpansion : totalExpansion - token.length;
      }
    }
    return selectionEndChar;
  }

  private static getIndexForSelectionStart(lineString: string, selectionChar: number, isHighlighted: boolean): number {
    const tokens = Tokenizer.tokenize(lineString);
    let currentStringIndex = tokens.join('').length;
    for (let i = tokens.length - 1; i >= 0; i -= 1) {
      const token = tokens[i] as string;
      currentStringIndex -= token.length;
      if (currentStringIndex < selectionChar) {
        const expansion = ExpandIfCursorOnPotentialConditionOperator.getExpansionIfBeforeStart(tokens, i, isHighlighted);
        return currentStringIndex + token.length > selectionChar ? currentStringIndex - expansion : currentStringIndex + token.length - expansion;
      }
    }
    return selectionChar;
  }

  private static getSubstringAroundPosition(editor: TextEditor, selection: Position, relativeCharNumber: number): SubstringAroundPosition {
    // extracts text 20 (conditionDelta) chars before and after selection
    const startPosition = { line: selection.line, character: Math.max(relativeCharNumber - FullWordRange.conditionDelta, 0) };
    const endPosition = {
      line: selection.line,
      character: Math.min(selection.character + FullWordRange.conditionDelta, editor.document.lineAt(selection.line).range.end.character),
    };
    const substringRange = RangeCreator.create(startPosition, endPosition);
    const substring = editor.document.getText(substringRange);
    return { substringRange, substring };
  }

  private static getPositionOfWordOrSymbol(editor: TextEditor, selectedPosition: Position, isHighlighted: boolean, isStart: boolean): Position {
    const { substring, substringRange } = FullWordRange.getSubstringAroundPosition(editor, selectedPosition, selectedPosition.character);
    const substringStartChar = substringRange.start.character;
    const substringStartRelativeToSelectionChar = selectedPosition.character - substringStartChar;
    const fullWordOrComparisonSymbolChar = isStart
      ? FullWordRange.getIndexForSelectionStart(substring, substringStartRelativeToSelectionChar, isHighlighted)
      : FullWordRange.getIndexForSelectionEnd(substring, substringStartRelativeToSelectionChar, isHighlighted);
    return { line: selectedPosition.line, character: substringStartChar + fullWordOrComparisonSymbolChar };
  }

  // the STRATEGY is to expand over the symbol when selection with no highlight is beside or on a condition indicator - e.g. |< or &|&
  // however expansion for highlight occurs only when selection is on an indicator - e.g. will not expand for |< but will for &|&
  public static extract(editor: TextEditor): Range {
    const isHighlighted = IsTextHighlighted.check(editor.selection);
    const startSelectionPosition = FullWordRange.getPositionOfWordOrSymbol(editor, editor.selection.start, isHighlighted, true);
    // WORK - IF false, check if end
    // WORK - check ternary operator too
    const endSelectionPosition = FullWordRange.getPositionOfWordOrSymbol(editor, editor.selection.end, isHighlighted, false);
    return RangeCreator.create(startSelectionPosition, endSelectionPosition);
  }
}
