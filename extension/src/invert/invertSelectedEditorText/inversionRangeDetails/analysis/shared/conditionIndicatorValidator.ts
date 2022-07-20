// prettier-ignore
import {
  AnalyzeConditionOutsideStatement
} from 'shared/inverter/src/evaluator/conditionAnalyzers/analyzeConditionOutsideStatement/analyzeConditionOutsideStatement';
import { LineTokenTraversalUtil } from './lineTokenTraversalUtil';
import { Tokens } from 'shared/inverter/src/shared/types/tokens';

export class ConditionIndicatorValidator {
  private static readonly lineConditionIndicators = { ['!']: true, ...LineTokenTraversalUtil.conditionIndicators };

  public static isLogicalOperator(tokens: Tokens, index: number, checkRightWards: boolean): boolean {
    const currentToken = tokens[index];
    const delta = checkRightWards ? 1 : -1;
    const siblingToken = tokens[index + delta];
    if (currentToken === siblingToken) {
      const rightMostSymbolIndex = Math.max(index, index + delta);
      return tokens[rightMostSymbolIndex + 1] !== '=';
    }
    return false;
  }

  private static isDoesNotEqualOpearator(tokens: Tokens, index: number): boolean {
    return tokens[index + 1] === '=';
  }

  private static isEqualityOperator(tokens: Tokens, index: number): boolean {
    const previousToken = tokens[index - 1];
    if (previousToken === '!' || previousToken === '=') {
      return true;
    }
    if (previousToken === '<' || previousToken === '>') {
      return previousToken !== tokens[index - 2];
    }
    const nextToken = tokens[index + 1];
    if (nextToken === '=') return true;
    return false;
  }

  private static isGreaterThanOrLessThanOperator(tokens: Tokens, index: number): boolean {
    return tokens[index] !== tokens[index - 1] && tokens[index] !== tokens[index + 1];
  }

  private static readonly isTokenPartOfConditionIndicator: {
    [key in keyof typeof ConditionIndicatorValidator.lineConditionIndicators]: (tokens: Tokens, index: number, checkRightWards: boolean) => boolean;
  } = {
    ['&']: ConditionIndicatorValidator.isLogicalOperator,
    ['|']: ConditionIndicatorValidator.isLogicalOperator,
    ['<']: ConditionIndicatorValidator.isGreaterThanOrLessThanOperator,
    ['>']: ConditionIndicatorValidator.isGreaterThanOrLessThanOperator,
    ['=']: ConditionIndicatorValidator.isEqualityOperator,
    ['!']: ConditionIndicatorValidator.isDoesNotEqualOpearator,
    ['?']: AnalyzeConditionOutsideStatement.isTernaryOperatorToken,
    ['and']: (): boolean => true,
    ['or']: (): boolean => true,
    ['if']: (): boolean => true,
    ['elif']: (): boolean => true,
    ['elseif']: (): boolean => true,
    ['elsif']: (): boolean => true,
    ['unless']: (): boolean => true,
    ['for']: (): boolean => true,
    ['while']: (): boolean => true,
  };

  // this only needs to be concerned about identifying if a token is at the start of a condition indicator as other ambiguities have been
  // eliminated by the ExpandIfCursorOnPotentialConditionOperator, hence index will not be in a middle of a potential indicator e.g:
  // >>|>=
  public static isTokenIndexPartOfConditionIndicator(tokens: Tokens, index: number, checkRightWards = true): boolean {
    const currentToken = tokens[index] as keyof typeof LineTokenTraversalUtil.conditionIndicators;
    return Boolean(ConditionIndicatorValidator.isTokenPartOfConditionIndicator[currentToken]?.(tokens, index, checkRightWards));
  }
}
