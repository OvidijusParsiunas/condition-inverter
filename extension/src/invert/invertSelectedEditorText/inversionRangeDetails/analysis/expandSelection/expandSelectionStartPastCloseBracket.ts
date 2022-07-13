import { TraversalUtil } from 'shared/inverter/src/shared/functionality/traversalUtil';
import { ConditionIndicatorValidator } from '../shared/conditionIndicatorValidator';
import { Tokens } from 'shared/inverter/src/shared/types/tokens';

export class ShouldExpandSelectionStartPastCloseBracket {
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
    if (fullLineTokens[rightSiblingTokenIndex] === ':') return true;
    return !ShouldExpandSelectionStartPastCloseBracket.isCloseBracketForIndicator(fullLineTokens, index);
  }
}
