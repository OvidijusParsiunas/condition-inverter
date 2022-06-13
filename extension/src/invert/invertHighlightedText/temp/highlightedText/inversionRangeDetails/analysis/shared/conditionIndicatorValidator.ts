import { LineTokenTraversalUtils } from './lineTokenTraversalUtils';
import { Tokens } from 'shared/inverter/src/shared/types/tokens';

export class ConditionIndicatorValidator {
  private static isLogicalOperator(tokens: Tokens, index: number, searchRightWards: boolean): boolean {
    const currentToken = tokens[index];
    const delta = searchRightWards ? 1 : -1;
    const siblingToken = tokens[index + delta];
    if (currentToken === siblingToken) {
      const rightMostSymbolIndex = Math.max(index, index + delta);
      return tokens[rightMostSymbolIndex + 1] !== '=';
    }
    return false;
  }

  private static isEqualityOperator(tokens: Tokens, index: number): boolean {
    const previousToken = tokens[index - 1];
    if (previousToken === '!' || previousToken === '=') {
      return true;
    }
    if (previousToken === '<' || previousToken === '>') {
      return previousToken !== tokens[index - 2];
    }
    return false;
  }

  // this only needs to be concerned about identifying if a token is at the start of a condition indicator as other ambiguities have been
  // eliminated by the ExpandIfCursorOnPotentialConditionOperator, hence index will not be in a middle of a potential indicator e.g:
  // >>|>=
  // WORK - make json for symbol start and a separate one for keyword
  public static isTokenIndexPartOfConditionIndicator(tokens: Tokens, index: number, checkRightWards = true): boolean {
    const currentToken = tokens[index] as keyof typeof LineTokenTraversalUtils.conditionIndicators;
    switch (currentToken) {
      case '&':
      case '|':
        return ConditionIndicatorValidator.isLogicalOperator(tokens, index, checkRightWards);
      case '<':
      case '>':
        return currentToken !== tokens[index - 1] && currentToken !== tokens[index + 1];
      case '=':
        return ConditionIndicatorValidator.isEqualityOperator(tokens, index);
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
}
