import { TraversalUtil } from 'shared/inverter/src/shared/functionality/traversalUtil';
import { ConditionIndicatorValidator } from '../shared/conditionIndicatorValidator';
import { Token, Tokens } from 'shared/inverter/src/shared/types/tokens';

export class ShouldExpandSelectionStartPastCloseBracket {
  private static isPropertyAccessOperator(token: Token): boolean {
    return token === '.' || token === '[';
  }

  private static isRightSiblingIndicatorForStopToken(fullLineTokens: Tokens, rightSiblingTokenIndex: number): boolean {
    if (fullLineTokens[rightSiblingTokenIndex] === ')') return false;
    const isStopToken =
      ConditionIndicatorValidator.isTokenIndexPartOfConditionIndicator(fullLineTokens, rightSiblingTokenIndex) ||
      !ShouldExpandSelectionStartPastCloseBracket.isPropertyAccessOperator(fullLineTokens[rightSiblingTokenIndex]);
    // traverse further when ternary operator - (dog)| ?
    if (isStopToken && fullLineTokens[rightSiblingTokenIndex] === '?') return false;
    return isStopToken;
  }

  private static isCloseBracketForIndicator(fullLineTokens: Tokens, index: number): boolean {
    // only checks the current line the start selection is on as the strategy of the app is not to traverse any further after potential
    // condition has been identified
    const openBracketIndex = TraversalUtil.getIndexOfOpenBracket(fullLineTokens, index, 1);
    const leftSiblingTokenIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(fullLineTokens, openBracketIndex - 1, false);
    return ConditionIndicatorValidator.isTokenIndexPartOfConditionIndicator(fullLineTokens, leftSiblingTokenIndex);
  }

  public static check(fullLineTokens: Tokens, index: number): boolean {
    // only checks the current line the start selection is on as the strategy of the app is not to traverse any further after potential
    // condition has been identified
    // traverse further when python if statement - if (dog)|:  =  if (!dog)|:    or    if not(dog)|:  =  if (dog)|:
    const rightSiblingTokenIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(fullLineTokens, index + 1);
    if (fullLineTokens[rightSiblingTokenIndex] === ':') return false;
    const isCloseBracketForIndicator = ShouldExpandSelectionStartPastCloseBracket.isCloseBracketForIndicator(fullLineTokens, index);
    if (!isCloseBracketForIndicator) {
      return ShouldExpandSelectionStartPastCloseBracket.isRightSiblingIndicatorForStopToken(fullLineTokens, rightSiblingTokenIndex);
    }
    return true;
  }
}
