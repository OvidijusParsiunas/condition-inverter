import { LineTraversalTokenUtils } from './lineTraversalTokenUtils';
import { Tokens } from 'shared/inverter/src/shared/types/tokens';

export class ConditionIndicatorValidator {
  // WORK - make json for symbol start and a separate one for keyword
  public static isIndexOnConditionIndicator(tokens: Tokens, index: number, searchRightWards = true): boolean {
    const currentToken = tokens[index] as keyof typeof LineTraversalTokenUtils.conditionIndicators;
    const siblingToken = searchRightWards ? tokens[index + 1] : tokens[index - 1];
    switch (currentToken) {
      case '&':
      case '|':
        return siblingToken === currentToken;
      case '<':
      case '>':
        return currentToken !== tokens[index - 1] && currentToken !== tokens[index + 1];
      case '=':
        return siblingToken === '=' || siblingToken === '<' || siblingToken === '>' || siblingToken === '!';
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
